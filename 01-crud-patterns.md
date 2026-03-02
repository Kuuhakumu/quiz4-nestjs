# **S1 — CRUD API Basics: Routes, Meaning, and Flow**

### Overview

This session explains CRUD in the most practical way for quiz exams.

We focus on:

- what each route means
- how to read method + path
- how controller methods map to routes
- why `PUT` and `PATCH` are different

We focus on understanding first, not memorizing blindly.

**Out of scope**

- Advanced decorators and pipes
- Authentication and guards

---

## Mental Model First (Very Important)

Think of an API as a **menu of actions** for one resource.

If your resource is `items`, your API must answer:

- How to see all items?
- How to see one item?
- How to create one item?
- How to update one item?
- How to delete one item?

CRUD is just these 5 ideas:

- **C**reate
- **R**ead
- **U**pdate
- **D**elete

---

## How to Read a Route (This is usually where confusion starts)

Each endpoint has 2 parts:

1. **Method** (GET, POST, PUT, PATCH, DELETE)
2. **Path** (`/items`, `/items/:id`)

Example:

- `GET /items/:id`
  - `GET` = read data
  - `/items/:id` = one specific row by id

`:id` means a variable value from URL.

So if request is `/items/15`, then `id = 15`.

---

## CRUD Route Table (Core Contract)

| Method | Path | Meaning |
|---|---|---|
| GET | /items | read all rows |
| GET | /items/:id | read one row |
| POST | /items | create one row |
| PUT | /items/:id | replace one row |
| PATCH | /items/:id | partially update one row |
| DELETE | /items/:id | delete one row |

### Human-language translation

- `GET /items` → "show me all items"
- `GET /items/3` → "show me item with id 3"
- `POST /items` → "create new item from body"
- `PUT /items/3` → "replace item 3 with new snapshot"
- `PATCH /items/3` → "change only some fields in item 3"
- `DELETE /items/3` → "remove item 3"

---

## Controller Skeleton (Route Mapping Layer)

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
  patch(@Param('id') id: string, @Body() body: { name?: string; description?: string }) {
    return this.itemsService.patch(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(Number(id));
  }
}
```

### Code explanation

- `@Controller('items')` sets base path.
- `@Get()`, `@Post()`, etc. map HTTP method + path.
- `@Param('id')` reads `id` from URL.
- `Number(id)` converts URL text to number.
- Controller forwards work to service.

If this feels repetitive, that is normal. CRUD controllers are intentionally repetitive.

---

## Service Method Contract (Keep names stable)

- `findAll()`
- `findOne(id: number)`
- `create(dto)`
- `update(id, dto)`
- `patch(id, dto)`
- `remove(id)`

These names help you map controller methods quickly during exams.

---

## PUT vs PATCH (Most Scored Topic)

### PUT = replace

You are sending a new full snapshot of the row.

```ts
data[index] = { id, ...body };
```

### PATCH = merge

You are changing only sent fields.

```ts
data[index] = { ...data[index], ...body, id };
```

### Quick before/after

Existing row:

```json
{ "id": 10, "name": "Math", "credit": 3, "instructor": "Lee" }
```

PATCH body:

```json
{ "credit": 2 }
```

After PATCH:

```json
{ "id": 10, "name": "Math", "credit": 2, "instructor": "Lee" }
```

---

## Fast Exam Checklist

1. Route method and path correct?
2. `:id` parsed and validated?
3. `PUT` replace and `PATCH` merge are different?
4. Missing row returns 404?
5. Invalid id/invalid input returns 400?

---

## Key Takeaways

- Route = method + path.
- CRUD is a fixed contract you can memorize once.
- Controller maps requests; service does logic.
- `PUT` and `PATCH` must not behave the same.
- Understanding route meaning is more important than memorizing syntax.