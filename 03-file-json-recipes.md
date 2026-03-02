# 03 — Read & Write JSON Recipes

Use this file when the quiz requires local JSON storage (no database).

## Standard Data Flow

1. Read file text
2. Parse JSON text to array/object
3. Apply your CRUD change
4. Convert data back to JSON string
5. Write to file

If one step is skipped, behavior often looks correct in memory but fails in final output.

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

### Code Explanation

- join(process.cwd(), 'items.json') keeps file path stable from project root.
- readFile(..., 'utf-8') returns a string so JSON.parse can parse it.
- catch branch creates an empty file for first run and returns empty array.
- JSON.stringify(data, null, 2) creates readable JSON formatting.
- await on write is required so request does not finish before save completes.

## ID Generation

```ts
const nextId = data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1;
```

Why it works:

- If data has rows, next id is max id + 1.
- If data is empty, first id is 1.

## PUT and PATCH with JSON Data

```ts
// PUT: replace object using request snapshot
data[index] = { id, ...body };

// PATCH: merge only provided fields
data[index] = { ...data[index], ...body, id };
```

Important:

- Keep id from path as source of truth.
- Do not allow PATCH body to change id.

## Invalid JSON Decision (Quiz-Safe)

If read fails, different classes may expect different behavior:

- Beginner quiz mode: create [] and continue.
- Strict correctness mode: throw error for malformed JSON.

Follow your instructor pattern. If unsure, use course examples from previous tasks.

## Edge Cases to Handle

- File missing on first run
- id is not a number
- id does not exist
- required fields missing in POST/PUT
- missing await on write operation

## Quick Verify Steps

1. Create one row
2. Restart app
3. GET all should still include that row
4. Update and delete one row
5. Confirm file content actually changed