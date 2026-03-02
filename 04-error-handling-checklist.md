# 04 — Error Handling Checklist

Use this page to choose exception type quickly and correctly.

## Exception Matrix

| Situation | Exception | Status |
|---|---|---|
| Required field missing | BadRequestException | 400 |
| id is not numeric (example: abc) | BadRequestException | 400 |
| id format is valid but record not found | NotFoundException | 404 |
| DELETE target does not exist | NotFoundException | 404 |

## Fast Rule

- Request value/shape is invalid → 400
- Target resource does not exist → 404

## Copy-Use Snippets

```ts
import { BadRequestException, NotFoundException } from '@nestjs/common';
```

```ts
if (!body.name) {
  throw new BadRequestException('name is required');
}
```

```ts
if (Number.isNaN(id)) {
  throw new BadRequestException('id must be a number');
}
```

```ts
const index = data.findIndex((x) => x.id === id);
if (index === -1) {
  throw new NotFoundException('Item not found');
}
```

## Endpoint-Level Expectations

- GET /:id
  - 400 for invalid id format
  - 404 when id not found
- POST
  - 400 when required fields missing
- PUT /:id
  - 400 for invalid id format
  - 400 when required fields missing (if prompt requires strict fields)
  - 404 when id not found
- PATCH /:id
  - 400 for invalid id format
  - 404 when id not found
- DELETE /:id
  - 400 for invalid id format
  - 404 when id not found

## PUT Prompt Check (Strict vs Flexible)

Use this decision:

- Prompt says full update or all required fields → validate all required fields in PUT.
- Prompt says partial update only for PATCH and does not force PUT fields → keep replace behavior and follow instructor examples.

## Last-Minute Status Code Test

Test with 2 requests before submit:

1. GET /items/abc should return 400.
2. GET /items/999999 should return 404.