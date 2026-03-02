# **S2 — Controller-Service Separation: Keep Responsibilities Clear**

### Overview

This session explains how to split work between controller and service in a clean, exam-safe way.

Goals:

- controller stays thin (HTTP in/out)
- service contains business logic and data rules
- exceptions are consistent (400 for bad input, 404 for missing data)

---

## Mental Model

Think of flow as:

Request -> Controller (map request) -> Service (do logic) -> Response

- Controller is traffic control.
- Service is decision maker.

If controller becomes too smart, bugs and duplication increase.

---

## What Controller Should Do

- route decorators
- read params/body/query
- small parse like Number(id)
- call service and return result

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return this.itemsService.findOne(Number(id));
}
```

Controller should be short and predictable.

---

## What Service Should Do

- validation
- CRUD logic
- JSON/database read-write
- throw exceptions

```ts
async findOne(id: number) {
  if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
  const data = await this.readData();
  const found = data.find((item) => item.id === id);
  if (!found) throw new NotFoundException('Item not found');
  return found;
}
```

Service decides behavior.

---

## PUT vs PATCH Logic Belongs in Service

- PUT = replace snapshot
- PATCH = merge partial

```ts
// PUT
data[index] = { id, ...body };

// PATCH
data[index] = { ...data[index], ...body, id };
```

---

## Anti-Pattern (Avoid)

Bad example: file read in controller.

```ts
@Get(':id')
async findOne(@Param('id') id: string) {
  const data = JSON.parse(await fs.readFile('items.json', 'utf-8'));
  return data.find((x) => x.id === Number(id));
}
```

Why bad:

- controller becomes hard to maintain
- validation can become inconsistent

---

## Key Takeaways

- Controller thin, service logic.
- Validation and exceptions belong in service.
- Keep PUT and PATCH behavior different.
- This split improves both debugging and quiz readability.