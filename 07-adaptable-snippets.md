# **S7 — Adaptable Snippets (Copy, Tweak, Submit)**

### Overview

Use these templates when resource names or fields change.

---

## Required Edits Before Run

1. Rename resource everywhere (items -> students/courses/products)
2. Update required-field validation
3. Update file name or repository name
4. Keep PUT replace and PATCH merge different
5. Recheck 400 vs 404 behavior

---

## Controller Template

```ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';

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
  create(@Body() body: { name?: string; description?: string }) {
    return this.itemsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name?: string; description?: string }) {
    return this.itemsService.update(Number(id), body);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: Partial<{ name?: string; description?: string }>) {
    return this.itemsService.patch(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(Number(id));
  }
}
```

---

## Critical Behavior Blocks

PUT replace:

```ts
data[index] = { id, ...body };
```

PATCH merge:

```ts
data[index] = { ...data[index], ...body, id };
```

Error guard:

```ts
if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
if (!found) throw new NotFoundException('Item not found');
```

---

## Adaptation Matrix

| Prompt says | Change |
|---|---|
| required field is title | validate title instead of name |
| required fields are title + credit | validate both in POST and PUT |
| id is string | remove Number parse and compare as string |
| PATCH empty body must fail | add 400 check for empty body |

---

## Final 1-Minute Check

- all names renamed
- required fields match prompt
- PUT/PATCH intentionally different
- invalid id = 400
- missing id = 404

---

## Key Takeaways

- Snippets are starting points, not final answers.
- Adapt fields and validation every time.
- Keep behavior rules consistent while renaming resources.