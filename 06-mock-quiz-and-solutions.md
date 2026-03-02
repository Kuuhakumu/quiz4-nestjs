# **S6 — Mock Quiz + Reference Solution**

### Overview

Practice timed CRUD with JSON storage and compare against a clean service pattern.

---

## Mock Quiz A (60 min)

Build students API with:

- id: number
- name: string (required)
- year: number (optional)
- major: string (optional)

Endpoints:

- GET /students
- GET /students/:id
- POST /students
- PUT /students/:id
- PATCH /students/:id
- DELETE /students/:id

Rules:

- POST and PUT require name
- invalid id -> 400
- missing id -> 404
- persist in students.json

---

## Scoring (100)

- CRUD routes correct: 25
- Controller/service split: 20
- JSON read/write flow: 20
- PUT vs PATCH behavior: 15
- 400/404 correctness: 20

---

## 10-Minute Checkpoints

- 10: routes compile
- 20: read/write helpers done
- 30: GET/POST work
- 40: PUT/PATCH correct
- 50: DELETE + error handling done
- 60: final review

---

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

  private async writeData(data: Student[]) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll() {
    return this.readData();
  }

  async findOne(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const found = data.find((x) => x.id === id);
    if (!found) throw new NotFoundException('Student not found');
    return found;
  }

  async create(body: Omit<Student, 'id'>) {
    if (!body.name) throw new BadRequestException('name is required');
    const data = await this.readData();
    const nextId = data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1;
    const created: Student = { id: nextId, ...body };
    data.push(created);
    await this.writeData(data);
    return created;
  }

  async update(id: number, body: Omit<Student, 'id'>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    if (!body.name) throw new BadRequestException('name is required');
    const data = await this.readData();
    const index = data.findIndex((x) => x.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    data[index] = { id, ...body };
    await this.writeData(data);
    return data[index];
  }

  async patch(id: number, body: Partial<Omit<Student, 'id'>>) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const index = data.findIndex((x) => x.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    data[index] = { ...data[index], ...body, id };
    await this.writeData(data);
    return data[index];
  }

  async remove(id: number) {
    if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
    const data = await this.readData();
    const index = data.findIndex((x) => x.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    const [deleted] = data.splice(index, 1);
    await this.writeData(data);
    return deleted;
  }
}
```

---

## Final Submission Checklist

- 6 routes exist and respond
- Controller thin, service owns logic
- PUT replace, PATCH merge
- 400 and 404 are correct
- data persists after restart

---

## Key Takeaways

- Build in phases, not all at once.
- Validate id and required fields early.
- Compare your output with this reference when stuck.