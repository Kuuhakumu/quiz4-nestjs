# **S0 — Study Roadmap (When You Feel Lost)**

### Overview

This session is your reset plan when you feel confused.

Main goals:

- know what to study first
- avoid high-score mistakes
- finish one working CRUD resource in quiz style

---

## Mental Model

Do not study everything at once.
Study in layers:

1. route shape
2. controller/service split
3. JSON data flow
4. status code logic (400 vs 404)

If one layer is weak, fix only that layer first.

---

## 15 Minutes (Emergency Mode)

Read only:

1. [08-one-page-cheat-sheet.md](08-one-page-cheat-sheet.md)
2. [09-backend-fundamentals-http-rest-postman-nestjs.md](09-backend-fundamentals-http-rest-postman-nestjs.md)
3. [01-crud-patterns.md](01-crud-patterns.md)
4. [04-error-handling-checklist.md](04-error-handling-checklist.md)

Must-know rules:

- PUT replaces, PATCH merges
- invalid input -> 400
- missing resource -> 404

---

## 30 Minutes (Pass Mode)

Read in order:

1. [09-backend-fundamentals-http-rest-postman-nestjs.md](09-backend-fundamentals-http-rest-postman-nestjs.md)
2. [10-uml-interface-design-composition.md](10-uml-interface-design-composition.md)
3. [01-crud-patterns.md](01-crud-patterns.md)
4. [02-controller-service-separation.md](02-controller-service-separation.md)
5. [03-file-json-recipes.md](03-file-json-recipes.md)
6. [04-error-handling-checklist.md](04-error-handling-checklist.md)

Then build one mini resource:

- students
- fields: id, name, year, major
- all 6 CRUD routes

---

## 60 Minutes (Confident Mode)

1. Read all S files once.
2. Do [06-mock-quiz-and-solutions.md](06-mock-quiz-and-solutions.md) timed.
3. Verify:
   - routes callable
   - PUT/PATCH correct
   - 400/404 correct
   - writes persisted

---

## When Coding During Quiz

Open in this order when stuck:

1. [09-backend-fundamentals-http-rest-postman-nestjs.md](09-backend-fundamentals-http-rest-postman-nestjs.md)
2. [10-uml-interface-design-composition.md](10-uml-interface-design-composition.md)
3. [01-crud-patterns.md](01-crud-patterns.md)
4. [03-file-json-recipes.md](03-file-json-recipes.md)
5. [04-error-handling-checklist.md](04-error-handling-checklist.md)
6. [05-common-bugs-quick-fix.md](05-common-bugs-quick-fix.md)
7. [07-adaptable-snippets.md](07-adaptable-snippets.md)

---

## Key Takeaways

- Learn layers, not random snippets.
- Protocol and API design mistakes happen before CRUD code mistakes.
- UML and interface design reduce structural mistakes before coding.
- Route and status-code mistakes lose marks fastest.
- One clean resource pattern can be reused everywhere.