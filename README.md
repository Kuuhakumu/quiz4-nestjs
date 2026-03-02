# NestJS Quiz 4 Study Pack (No-AI Friendly)

This folder is designed for quiz situations where you cannot use AI, but you can use your own notes, internet docs, and local resources.

Core topics:

- HTTP methods: GET, POST, PUT, PATCH, DELETE
- Controller vs Service separation
- JSON file storage flow (read → parse → change → stringify → write)
- Error handling with 400 and 404

## 2-Minute Quiz Navigation

If you get stuck, open files in this order:

1. Route shape wrong → [01-crud-patterns.md](01-crud-patterns.md)
2. Logic location confusing → [02-controller-service-separation.md](02-controller-service-separation.md)
3. JSON read/write problems → [03-file-json-recipes.md](03-file-json-recipes.md)
4. Wrong status code → [04-error-handling-checklist.md](04-error-handling-checklist.md)
5. Endpoint behavior weird → [05-common-bugs-quick-fix.md](05-common-bugs-quick-fix.md)
6. Need full reference solution → [06-mock-quiz-and-solutions.md](06-mock-quiz-and-solutions.md)
7. Need fast copy-and-adapt template → [07-adaptable-snippets.md](07-adaptable-snippets.md)

## Study Paths

- 15 minutes: [00-roadmap.md](00-roadmap.md) + [01-crud-patterns.md](01-crud-patterns.md)
- 30 minutes: add [02-controller-service-separation.md](02-controller-service-separation.md) + [04-error-handling-checklist.md](04-error-handling-checklist.md)
- 60 minutes: finish all docs and do [06-mock-quiz-and-solutions.md](06-mock-quiz-and-solutions.md)

## File Map

1. [00-roadmap.md](00-roadmap.md) — what to do in 15/30/60 minutes
2. [01-crud-patterns.md](01-crud-patterns.md) — route and method patterns
3. [02-controller-service-separation.md](02-controller-service-separation.md) — clean architecture split
4. [03-file-json-recipes.md](03-file-json-recipes.md) — JSON persistence patterns
5. [04-error-handling-checklist.md](04-error-handling-checklist.md) — 400 vs 404 decisions
6. [05-common-bugs-quick-fix.md](05-common-bugs-quick-fix.md) — symptom to fix lookup
7. [06-mock-quiz-and-solutions.md](06-mock-quiz-and-solutions.md) — timed practice + reference service
8. [07-adaptable-snippets.md](07-adaptable-snippets.md) — adaptable templates + tweak matrix
9. [08-one-page-cheat-sheet.md](08-one-page-cheat-sheet.md) — compact quiz-time checklist
10. [.vscode/nestjs-quiz.code-snippets](.vscode/nestjs-quiz.code-snippets) — VS Code snippet triggers (nq-*)

## How to Use Local Snippets Fast

1. Open a TypeScript file in VS Code.
2. Type a prefix like `nq-controller-crud` or `nq-service-json`.
3. Press Enter/Tab to insert.
4. Edit placeholders before running:
   - resource name (`items` → `students`)
   - required fields (`name` → `title`, `credit`)
   - file name (`items.json` → `courses.json`)

## Exam-Day Rules (High Value)

1. Keep controller thin, keep logic in service.
2. Parse and validate id early.
3. Use PUT for replace, PATCH for merge.
4. Throw 400 for invalid input, 404 for missing resource.
5. Always await file/database writes.

## Official References

- Controllers: https://docs.nestjs.com/controllers
- Providers/Services: https://docs.nestjs.com/providers
- Exception handling: https://docs.nestjs.com/exception-filters
- Validation: https://docs.nestjs.com/techniques/validation
- Node fs/promises: https://nodejs.org/api/fs.html#promises-api
- JSON.parse: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
- JSON.stringify: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify