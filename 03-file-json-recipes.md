# **S3 — JSON File Recipes: Read, Update, Save Safely**

### Overview

This session gives a practical CRUD recipe when storage is a local JSON file.

Core rule:
read -> parse -> mutate -> stringify -> write

---

## Mental Model

Treat JSON updates like a fixed pipeline:

1. load current file text
2. convert text to JS data
3. change data in memory
4. convert back to JSON text
5. save to file

If you skip the final write step, data is not really saved.

---

## Reusable Helper Pattern

```ts
import { promises as fs } from 'fs';
import { join } from 'path';

type Item = { id: number; name: string; year?: number; major?: string };
const filePath = join(process.cwd(), 'items.json');

async function readData(): Promise<Item[]> {
  try {
    const text = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(text) as Item[];
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
    return [];
  }
}

async function writeData(data: Item[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
```

### Why each part matters

- readData: always returns array shape
- catch branch: handles first-run missing file
- writeData: persists state, not just memory changes
- await write: prevents silent save failures

---

## ID Generation Pattern

```ts
const nextId = data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1;
```

- existing rows -> max + 1
- empty array -> 1

---

## PUT vs PATCH in JSON Data

```ts
// PUT: replace object
data[index] = { id, ...body };

// PATCH: merge provided fields
data[index] = { ...data[index], ...body, id };
```

Keep route id authoritative.

---

## Error Rules You Must Keep

```ts
if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
if (index === -1) throw new NotFoundException('Item not found');
```

- invalid input -> 400
- missing id -> 404

---

## Key Takeaways

- Use one fixed JSON pipeline every time.
- Always await write operations.
- PUT and PATCH must not behave the same.
- Keep status code logic consistent.