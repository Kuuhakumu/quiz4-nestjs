# **S8 — NestJS CRUD Basics: Mental Model & Core Rules**

### Overview

This session explains **NestJS CRUD fundamentals** with a strong focus on the **mental model** and the core building blocks you need in quiz exams:

- routes (GET, POST, PUT, PATCH, DELETE)
- controller vs service responsibility
- JSON data flow (read → parse → mutate → write)
- error handling (400 vs 404)
- PUT vs PATCH behavior

We focus on *how these parts work together*, not advanced architecture.

**Out of scope**

- Advanced validation decorators
- Authentication/authorization
- Database optimization patterns

---

## CRUD API Model (Deep Concept)

Think of your API as a **resource manager**.

For each resource (students, courses, products), your system must answer:

- How to list items?
- How to get one item?
- How to create one?
- How to update one?
- How to delete one?

Instead of asking:

> “What random code should I write now?”

Ask:

> “Which endpoint responsibility am I implementing?”

That mindset keeps your code organized and easy to debug.

---

## Controller — HTTP Mapping Layer

A **controller** maps HTTP requests to service calls.

It should do only small tasks:

- route mapping (`@Get`, `@Post`, ...)
- extract params/body (`@Param`, `@Body`)
- tiny conversion like `Number(id)`

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return this.itemsService.findOne(Number(id));
}
```

At this point:

- no business logic should be here
- no file read/write should be here

---

## Service — Logic + Data Layer

A **service** owns behavior and rules:

- validation
- find/update/delete logic
- JSON file operations (or repository calls)
- throwing exceptions

```ts
async findOne(id: number) {
  if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
  const data = await this.readData();
  const found = data.find((item) => item.id === id);
  if (!found) throw new NotFoundException('Item not found');
  return found;
}
```

Mental model:

- controller asks
- service decides

---

## JSON Data Flow (Core Engine)

For JSON-file quizzes, always follow this exact lifecycle:

1. `readFile`
2. `JSON.parse`
3. mutate data
4. `JSON.stringify`
5. `writeFile`

If you skip step 5, your API may look correct but data is not actually saved.

---

## PUT vs PATCH (Critical)

### PUT = replace snapshot

```ts
data[index] = { id, ...body };
```

Use when you want full replacement semantics.

### PATCH = merge partial fields

```ts
data[index] = { ...data[index], ...body, id };
```

Use when only provided fields should change.

Key rule:

- Keep `id` from route as source of truth.
- Never let body `id` override it.

---

## 400 vs 404 (Status Logic)

### 400 Bad Request

Use when request input is invalid:

- id is not numeric (`abc`)
- required field missing

### 404 Not Found

Use when request shape is valid but target does not exist:

- id parsed correctly
- no matching row found

Quick memory:

- invalid request → 400
- missing resource → 404

---

## Endpoint Checklist (Exam Use)

- `GET /items` → list all
- `GET /items/:id` → 400 invalid id, 404 missing id
- `POST /items` → validate required fields
- `PUT /items/:id` → replace behavior + required checks if prompt says strict
- `PATCH /items/:id` → merge behavior
- `DELETE /items/:id` → remove or 404

After every mutation:

- ensure write/persist happens
- ensure `await` is used

---

## Adaptation Checklist (Before Submit)

1. Rename resource everywhere (`items` → `students/courses/...`).
2. Replace required field checks to match prompt.
3. Confirm id type strategy (number or string).
4. Re-check PUT vs PATCH behavior difference.
5. Test 2 requests before submit:
   - invalid id (expect 400)
   - missing id (expect 404)

---

## Backend Protocol/API/Tooling Mini Summary

- Client-server contract: client knows API shape, not backend internals.
- HTTP method = intent, URL = resource (`/users`, `/users/:id`).
- Use noun + plural naming; avoid verb-style URLs like `/getUser`.
- Keep response structure consistent (success/data and error/code/message).
- Check status code families fast: 2xx success, 4xx client error, 5xx server error.
- Postman base flow: method -> URL -> headers -> body -> send -> verify status/body/time.
- NestJS mindset: framework controls flow (IoC), controllers map HTTP, services decide logic.
- Full chapter reference: [09-backend-fundamentals-http-rest-postman-nestjs.md](09-backend-fundamentals-http-rest-postman-nestjs.md)

---

## Key Takeaways

- Keep controller thin, service responsible.
- Follow fixed JSON lifecycle for persistence.
- PUT and PATCH must behave differently.
- 400 and 404 are not interchangeable.
- Clear mental model beats memorizing random snippets.