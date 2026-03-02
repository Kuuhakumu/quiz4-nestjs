# 08 — One-Page Cheat Sheet

## Controller vs Service
- **Controller:** HTTP mapping only (`@Get/@Post/...`), extract `@Param/@Body`, small parse (`Number(id)`), call service.
- **Service:** validation, CRUD logic, JSON/DB access, exception throwing.
- **Golden rule:** thin controller, logic-heavy service.

## JSON flow
1. Read file text
2. Parse JSON
3. Apply CRUD change
4. Stringify JSON
5. Write file (**always `await`**)

- First run (file missing): create `[]` and continue.
- Keep `readData()` / `writeData()` helpers for consistency.

## PUT vs PATCH
- **PUT:** full replacement of target object (route `id` stays authoritative).
- **PATCH:** partial merge of provided fields only.
- **Never allow body `id` to override path `id`.**

## 400 vs 404
- **400 Bad Request:** input shape/value is invalid (e.g., `id` is `abc`, required field missing).
- **404 Not Found:** input format is valid, but target resource does not exist.
- Quick memory: **invalid request = 400**, **missing resource = 404**.

## Endpoint checklist
- **GET /items** → list all
- **GET /items/:id** → `400` invalid id, `404` not found
- **POST /items** → `400` missing required fields
- **PUT /items/:id** → replace object, `400` invalid id/required fields, `404` not found
- **PATCH /items/:id** → merge fields, `400` invalid id, `404` not found
- **DELETE /items/:id** → `400` invalid id, `404` not found

## Adaptation checklist
- Rename `items` to prompt resource (`students/courses/products/...`).
- Update required fields in `POST` and `PUT`.
- Confirm id strategy (number vs string) and parsing logic.
- Update storage target (`items.json` or repository symbol).
- Re-check PUT replace vs PATCH merge after edits.
- Smoke test: invalid id (`400`) + missing id (`404`) before submit.