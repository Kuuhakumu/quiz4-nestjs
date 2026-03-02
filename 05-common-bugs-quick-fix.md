# 05 — Common Bugs Quick Fix

Use this file when output is wrong and you need fast recovery.

## Symptom → Cause → Fix

### 1) GET /items/:id always fails

- Cause: id stayed string
- Fix:

```ts
const numericId = Number(id);
if (Number.isNaN(numericId)) throw new BadRequestException('id must be a number');
```

### 2) PUT behaves like PATCH

- Cause: PUT used merge logic
- Fix:

```ts
data[index] = { id, ...body };
```

### 3) PATCH removes old fields

- Cause: PATCH used replacement logic
- Fix:

```ts
data[index] = { ...data[index], ...body, id };
```

### 4) PATCH changed id accidentally

- Cause: body.id overrides path id
- Fix: always place id at end of merged object

```ts
data[index] = { ...data[index], ...body, id };
```

### 5) New data not saved after request

- Cause: missing await on write
- Fix:

```ts
await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
```

### 6) App crashes on first run

- Cause: missing fallback for file not found
- Fix: create [] in catch branch and return empty array.

### 7) DELETE returns success but row still exists

- Cause: filtered/spliced result was not written back
- Fix:

```ts
const next = data.filter((x) => x.id !== id);
await writeData(next);
```

### 8) Wrong status code returned

- Cause: mixed 400 and 404 logic
- Fix:
  - invalid id format → 400
  - valid id but not found → 404

## 20-Second Debug Checklist

1. Is id parsed with Number and validated?
2. Is exception type correct for this failure?
3. PUT replace and PATCH merge implemented correctly?
4. Are all write operations awaited?
5. Is data written after every mutation?
6. Is id from path preserved during updates?