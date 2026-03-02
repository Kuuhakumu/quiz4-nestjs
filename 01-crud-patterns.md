# 01 — CRUD API Patterns

Use this file as your route contract during quiz.

## Route Table

| Method | Path | Purpose |
|---|---|---|
| GET | /items | list all |
| GET | /items/:id | get one by id |
| POST | /items | create new |
| PUT | /items/:id | replace full object |
| PATCH | /items/:id | update partial fields |
| DELETE | /items/:id | remove by id |

## Controller Skeleton

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

Why this shape works:

- Controller does routing only.
- id is parsed once from string to number.
- Service method names stay consistent with CRUD actions.

## Service Method Contract

- findAll()
- findOne(id: number)
- create(dto)
- update(id, dto) for PUT
- patch(id, dto) for PATCH
- remove(id)

## PUT vs PATCH (Most Important Rule)

- PUT: full replacement semantics.
- PATCH: partial merge semantics.

### Before/After Example

Existing item:

```json
{ "id": 10, "name": "Math", "credit": 3, "instructor": "Lee" }
```

PUT body:

```json
{ "name": "Advanced Math", "credit": 4, "instructor": "Kim" }
```

PUT result (replace):

```json
{ "id": 10, "name": "Advanced Math", "credit": 4, "instructor": "Kim" }
```

PATCH body:

```json
{ "credit": 2 }
```

PATCH result (merge):

```json
{ "id": 10, "name": "Math", "credit": 2, "instructor": "Lee" }
```

## Prompt-Check Rule for PUT

Some quizzes require strict full-field PUT, some do not.

- If prompt says full update or all required fields: validate all required fields in PUT.
- If prompt is silent: still implement replace semantics, and follow instructor examples.

## Common Scoring Points

- Correct route + method mapping
- Correct id parse and validation
- Correct PUT/PATCH behavior difference
- Correct 400/404 exceptions