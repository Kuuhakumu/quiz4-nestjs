# 07 — Adaptable Snippets (Copy + Tweak Fast)

Use this file when prompt changes resource name or fields.

Important warning: do not submit snippets unchanged. Always adapt required fields, route names, and file/repository names.

## Minimum Edits Before Run

1. Rename items to your resource (students/courses/products).
2. Update required fields in POST and PUT checks.
3. Update file path or repository symbol.
4. Confirm PUT replace and PATCH merge behavior.
5. Confirm 400/404 behavior for your prompt.

---

## 1) Controller Template

```ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';

type CreateItemBody = { name?: string; description?: string; status?: string };
type UpdateItemBody = { name?: string; description?: string; status?: string };

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateItemBody) {
    return this.itemsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateItemBody) {
    return this.itemsService.update(Number(id), body);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: Partial<UpdateItemBody>) {
    return this.itemsService.patch(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(Number(id));
  }
}
```

### Code explanation

- Decorators map HTTP methods and routes.
- Param id arrives as string, so Number(id) conversion is needed for numeric ids.
- Controller delegates all behavior to service.

### What to tweak

- Controller path: items → students/courses
- Service class and filename names
- Body fields for your prompt
- id type strategy (number or string)

---

## 2) Service Template — JSON File Variant

```ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

type Item = {
  id: number;
  name: string;
  description?: string;
  status?: string;
};

@Injectable()
export class ItemsService {
  private readonly filePath = join(process.cwd(), 'items.json');

  private async readData(): Promise<Item[]> {
    try {
      const text = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(text) as Item[];
    } catch {
      await fs.writeFile(this.filePath, '[]', 'utf-8');
      return [];
    }
  }

  private async writeData(data: Item[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll() {
    return this.readData();
  }

  async findOne(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const found = data.find((item) => item.id === id);
    if (!found) throw new NotFoundException('Item not found');
    return found;
  }

  async create(body: Omit<Item, 'id'>) {
    if (!body.name) throw new BadRequestException('name is required');
    const data = await this.readData();
    const nextId = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    const created: Item = { id: nextId, ...body };
    data.push(created);
    await this.writeData(data);
    return created;
  }

  async update(id: number, body: Omit<Item, 'id'>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    if (!body.name) throw new BadRequestException('name is required');
    const data = await this.readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Item not found');

    data[index] = { id, ...body };
    await this.writeData(data);
    return data[index];
  }

  async patch(id: number, body: Partial<Omit<Item, 'id'>>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Item not found');

    data[index] = { ...data[index], ...body, id };
    await this.writeData(data);
    return data[index];
  }

  async remove(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Item not found');

    const [deleted] = data.splice(index, 1);
    await this.writeData(data);
    return deleted;
  }
}
```

### Code explanation

- readData/writeData centralize storage logic.
- findOne/create/update/patch/remove all enforce the same id and not-found rules.
- update uses replace semantics.
- patch uses merge semantics and keeps route id authoritative.

### Adaptation matrix

| Prompt pattern | What to change |
|---|---|
| Required field is title | change name checks to title |
| Required fields are title + credit | validate both in POST and PUT |
| id is string | remove Number parse and compare as string |
| PATCH empty body should fail | add empty-body 400 check |

---

## 3) Service Template — DB/Repository Variant

Use when your task uses ORM/repository instead of local JSON.

```ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

type Item = {
  id: number;
  name: string;
  description?: string;
  status?: string;
};

type ItemRepository = {
  findMany(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  create(data: Omit<Item, 'id'>): Promise<Item>;
  update(id: number, data: Omit<Item, 'id'>): Promise<Item | null>;
  patch(id: number, data: Partial<Omit<Item, 'id'>>): Promise<Item | null>;
  remove(id: number): Promise<Item | null>;
};

@Injectable()
export class ItemsService {
  constructor(private readonly repo: ItemRepository) {}

  async findAll() {
    return this.repo.findMany();
  }

  async findOne(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException('Item not found');
    return found;
  }

  async create(body: Omit<Item, 'id'>) {
    if (!body.name) throw new BadRequestException('name is required');
    return this.repo.create(body);
  }

  async update(id: number, body: Omit<Item, 'id'>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    if (!body.name) throw new BadRequestException('name is required');
    const updated = await this.repo.update(id, body);
    if (!updated) throw new NotFoundException('Item not found');
    return updated;
  }

  async patch(id: number, body: Partial<Omit<Item, 'id'>>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const patched = await this.repo.patch(id, body);
    if (!patched) throw new NotFoundException('Item not found');
    return patched;
  }

  async remove(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const deleted = await this.repo.remove(id);
    if (!deleted) throw new NotFoundException('Item not found');
    return deleted;
  }
}
```

### What to tweak

- Replace ItemRepository with actual ORM methods.
- Keep method contracts same as controller usage.
- Keep same 400/404 logic as JSON variant.

---

## 4) Critical Behavior Blocks

### PUT replace block

```ts
data[index] = {
  id,
  name: body.name,
  description: body.description,
  status: body.status,
};
```

### PATCH merge block

```ts
data[index] = {
  ...data[index],
  ...body,
  id,
};
```

### 400 and 404 guard block

```ts
if (Number.isNaN(id)) {
  throw new BadRequestException('id must be a number');
}

if (!foundOrUpdatedOrDeleted) {
  throw new NotFoundException('Item not found');
}
```

---

## 5) Final Pre-Submit Checklist

1. Resource names are fully renamed.
2. Required field checks match prompt wording.
3. PUT behavior and PATCH behavior are intentionally different.
4. Invalid id gives 400.
5. Missing id gives 404.
6. Persisted data is visible after restart.