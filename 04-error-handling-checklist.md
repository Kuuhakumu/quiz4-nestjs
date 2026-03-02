# **S4 — Error Handling Checklist (400 vs 404)**

### Overview

Use this page to pick the correct exception fast during quizzes.

---

## Quick Rule

- Invalid request input or format -> 400 Bad Request
- Valid request shape but missing target data -> 404 Not Found

---

## Exception Matrix

| Situation | Exception | Status |
|---|---|---|
| Required field missing | BadRequestException | 400 |
| id is not numeric (abc) | BadRequestException | 400 |
| id format valid but row not found | NotFoundException | 404 |
| DELETE target does not exist | NotFoundException | 404 |

---

## Copy Snippets

```ts
import { BadRequestException, NotFoundException } from '@nestjs/common';
```

```ts
if (Number.isNaN(id)) {
  throw new BadRequestException('id must be a number');
}
```

```ts
if (!body.name) {
  throw new BadRequestException('name is required');
}
```

```ts
const index = data.findIndex((x) => x.id === id);
if (index === -1) {
  throw new NotFoundException('Item not found');
}
```

---

## Endpoint Expectations

- GET /:id -> 400 invalid id, 404 missing id
- POST -> 400 for missing required fields
- PUT /:id -> 400 invalid id, 400 missing required fields (if strict prompt), 404 missing id
- PATCH /:id -> 400 invalid id, 404 missing id
- DELETE /:id -> 400 invalid id, 404 missing id

---

## Last 30-Second Test

1. GET /items/abc -> 400
2. GET /items/999999 -> 404

---

## Key Takeaways

- 400 means invalid request shape/value.
- 404 means request was valid but row does not exist.
- Keep this rule consistent across all endpoints.