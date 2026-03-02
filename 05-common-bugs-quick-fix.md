# **S5 — Common Bugs Quick Fix**

### Overview

Use symptom -> cause -> fix when behavior is wrong and time is short.

---

## 1) GET /:id always fails

- Cause: id stayed string
- Fix:

```ts
const numericId = Number(id);
if (Number.isNaN(numericId)) throw new BadRequestException('id must be a number');
```

## 2) PUT behaves like PATCH

- Cause: merge logic used in PUT
- Fix:

```ts
data[index] = { id, ...body };
```

## 3) PATCH deletes old fields

- Cause: replace logic used in PATCH
- Fix:

```ts
data[index] = { ...data[index], ...body, id };
```

## 4) PATCH changed id

- Cause: body.id overrode route id
- Fix: keep id last in merge object

```ts
data[index] = { ...data[index], ...body, id };
```

## 5) Data not saved

- Cause: missing await on write
- Fix:

```ts
await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
```

## 6) DELETE says success but row remains

- Cause: mutation not persisted
- Fix:

```ts
const next = data.filter((x) => x.id !== id);
await writeData(next);
```

---

## 20-Second Debug Checklist

1. id parsed and validated?
2. Correct exception type (400 vs 404)?
3. PUT replace and PATCH merge are different?
4. Every write awaited?
5. Route id preserved during updates?

---

## Key Takeaways

- Most quiz bugs are small consistency mistakes.
- Check id parsing, status codes, and write persistence first.
- Keep this page open while debugging under time pressure.