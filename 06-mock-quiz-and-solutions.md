# 06 — Mock Quiz and Reference Solutions

Use this file to practice under time and compare your implementation quickly.

## Mock Quiz A (60 minutes)

### Prompt

Build students API with JSON file storage.

Fields:

- id: number
- name: string (required)
- year: number (optional)
- major: string (optional)

Required endpoints:

- GET /students
- GET /students/:id
- POST /students
- PUT /students/:id
- PATCH /students/:id
- DELETE /students/:id

Rules:

- POST and PUT require name
- id not found returns 404
- invalid id returns 400
- data must persist to students.json

## Mock Quiz B (45 minutes)

### Prompt

Build courses API with fields:

- id: number
- title: string (required)
- credit: number (required)
- instructor: string (optional)

Use same route and status-code behavior as Mock A.

## Scoring Rubric (100)

- Correct CRUD routes and methods: 25
- Correct controller/service separation: 20
- Correct JSON read/write flow: 20
- Correct PUT vs PATCH behavior: 15
- Correct error handling (400/404): 20

## 10-Minute Checkpoints (Use While Practicing)

- Minute 10: controller routes compile
- Minute 20: service helpers read/write JSON
- Minute 30: GET/POST working
- Minute 40: PUT/PATCH behavior correct
- Minute 50: DELETE + 400/404 confirmed
- Minute 60: submission checklist complete

## Reference Service Skeleton

```ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

type Student = { id: number; name: string; year?: number; major?: string };

@Injectable()
export class StudentsService {
  private readonly filePath = join(process.cwd(), 'students.json');

  private async readData(): Promise<Student[]> {
    try {
      const text = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(text) as Student[];
    } catch {
      await fs.writeFile(this.filePath, '[]', 'utf-8');
      return [];
    }
  }

  private async writeData(data: Student[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll() {
    return this.readData();
  }

  async findOne(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const found = data.find((s) => s.id === id);
    if (!found) throw new NotFoundException('Student not found');
    return found;
  }

  async create(body: Omit<Student, 'id'>) {
    if (!body.name) throw new BadRequestException('name is required');
    const data = await this.readData();
    const nextId = data.length ? Math.max(...data.map((s) => s.id)) + 1 : 1;
    const created: Student = { id: nextId, ...body };
    data.push(created);
    await this.writeData(data);
    return created;
  }

  async update(id: number, body: Omit<Student, 'id'>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    if (!body.name) throw new BadRequestException('name is required');
    const data = await this.readData();
    const index = data.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    data[index] = { id, ...body };
    await this.writeData(data);
    return data[index];
  }

  async patch(id: number, body: Partial<Omit<Student, 'id'>>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const index = data.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    data[index] = { ...data[index], ...body, id };
    await this.writeData(data);
    return data[index];
  }

  async remove(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const index = data.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    const [deleted] = data.splice(index, 1);
    await this.writeData(data);
    return deleted;
  }
}
```

## Reference Code Explanation (Method by Method)

- filePath: points to students.json in project root.
- readData:
  - reads file text
  - parses JSON
  - on first-run failure, creates [] and returns empty list
- writeData: writes updated list back to file.
- findAll: returns current full list.
- findOne:
  - validates numeric id (400 on invalid)
  - searches by id (404 if missing)
- create:
  - validates required field name
  - computes next id
  - pushes new object and persists
- update (PUT): replaces row snapshot at index.
- patch (PATCH): merges partial body and keeps id from route.
- remove: deletes row using splice, persists, returns deleted row.

## Sample Request/Result Checks

1. GET /students/abc → 400
2. GET /students/9999 (not existing) → 404
3. POST /students with {} → 400
4. PATCH /students/1 with {"major":"CS"} keeps other fields unchanged

## Submission Checklist

- All 6 routes exist and respond
- Controller is thin, service has logic
- PUT replaces, PATCH merges
- POST/PUT required-field checks are correct
- 400 and 404 behavior is correct
- Data persists after restart