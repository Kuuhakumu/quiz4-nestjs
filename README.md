# NestJS Quiz 4 Study Pack (Beginner S-Style)

Quick notes for no-AI quiz conditions: concise, practical, and easy to scan.

## What This Pack Covers

- CRUD route patterns
- Controller vs service separation
- JSON read/parse/mutate/write flow
- 400 vs 404 error logic
- PUT replace vs PATCH merge

## Fast Navigation

1. Route confusion -> [01-crud-patterns.md](01-crud-patterns.md)
2. Layer confusion -> [02-controller-service-separation.md](02-controller-service-separation.md)
3. JSON persistence issues -> [03-file-json-recipes.md](03-file-json-recipes.md)
4. Status code issues -> [04-error-handling-checklist.md](04-error-handling-checklist.md)
5. Bug fixing under pressure -> [05-common-bugs-quick-fix.md](05-common-bugs-quick-fix.md)
6. Timed practice + answer key -> [06-mock-quiz-and-solutions.md](06-mock-quiz-and-solutions.md)
7. Copy-and-tweak templates -> [07-adaptable-snippets.md](07-adaptable-snippets.md)
8. Last-minute summary -> [08-one-page-cheat-sheet.md](08-one-page-cheat-sheet.md)

## Study Path (S0 -> S8)

1. [00-roadmap.md](00-roadmap.md) — S0 roadmap
2. [01-crud-patterns.md](01-crud-patterns.md) — S1 CRUD basics
3. [02-controller-service-separation.md](02-controller-service-separation.md) — S2 layer split
4. [03-file-json-recipes.md](03-file-json-recipes.md) — S3 JSON flow
5. [04-error-handling-checklist.md](04-error-handling-checklist.md) — S4 error decisions
6. [05-common-bugs-quick-fix.md](05-common-bugs-quick-fix.md) — S5 bug fixes
7. [06-mock-quiz-and-solutions.md](06-mock-quiz-and-solutions.md) — S6 timed practice
8. [07-adaptable-snippets.md](07-adaptable-snippets.md) — S7 adaptable templates
9. [08-one-page-cheat-sheet.md](08-one-page-cheat-sheet.md) — S8 final review
10. [.vscode/nestjs-quiz.code-snippets](.vscode/nestjs-quiz.code-snippets) — local snippet triggers

## Exam Rules to Remember

1. Keep controllers thin.
2. Keep logic and validation in service.
3. Parse and validate id early.
4. Use PUT for replace, PATCH for merge.
5. Use 400 for invalid input, 404 for missing resource.
6. Always await persistence writes.

## Official References

- NestJS Controllers: https://docs.nestjs.com/controllers
- NestJS Providers: https://docs.nestjs.com/providers
- NestJS Exceptions: https://docs.nestjs.com/exception-filters
- NestJS Validation: https://docs.nestjs.com/techniques/validation
- Node fs/promises: https://nodejs.org/api/fs.html#promises-api