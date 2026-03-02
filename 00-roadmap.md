# 00 — Roadmap (15 / 30 / 60 Minutes)

Use this page to decide what to do based on remaining time.

## 15 Minutes (Survival Mode)

Goal: avoid major scoring mistakes.

Memorize these 4 blocks:

1. CRUD routes
   - GET /items
   - GET /items/:id
   - POST /items
   - PUT /items/:id
   - PATCH /items/:id
   - DELETE /items/:id
2. Split of responsibility
   - Controller = HTTP mapping
   - Service = logic + data operations
3. Data flow
   - read → parse → mutate → stringify → write
4. Error rule
   - invalid input shape/value → 400
   - resource id not found → 404

### 2-Minute Recall Drill

Ask yourself quickly:

- If id is abc, what status? (400)
- If id is 5 but record 5 does not exist, what status? (404)
- Which method replaces full object? (PUT)
- Which method merges partial fields? (PATCH)

## 30 Minutes (Pass Mode)

Read in this order:

1. [01-crud-patterns.md](01-crud-patterns.md)
2. [02-controller-service-separation.md](02-controller-service-separation.md)
3. [04-error-handling-checklist.md](04-error-handling-checklist.md)

Then do one mini build:

- resource: students
- fields: id, name, year, major
- endpoints: all 6 CRUD routes
- storage: students.json

## 60 Minutes (Confident Mode)

1. Read all files once.
2. Do a timed mock in [06-mock-quiz-and-solutions.md](06-mock-quiz-and-solutions.md).
3. Verify this checklist:
   - routes are callable
   - PUT behavior is correct
   - PATCH behavior is correct
   - 400/404 behavior is correct
   - writes are persisted

## No-AI Quiz Workflow (Open Resources)

When coding during exam:

1. Open [01-crud-patterns.md](01-crud-patterns.md) and scaffold routes first.
2. Open [03-file-json-recipes.md](03-file-json-recipes.md) and wire helpers.
3. Open [04-error-handling-checklist.md](04-error-handling-checklist.md) and verify statuses.
4. If behavior is wrong, open [05-common-bugs-quick-fix.md](05-common-bugs-quick-fix.md).
5. For fast templating, use [07-adaptable-snippets.md](07-adaptable-snippets.md) and local snippet prefixes in [.vscode/nestjs-quiz.code-snippets](.vscode/nestjs-quiz.code-snippets).