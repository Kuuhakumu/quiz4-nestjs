# **S10 — UML + Interface Design + Composition**

### Overview

This session gives you a compact design toolkit before writing TypeScript/NestJS code.

Goals:

- read and draw UML class diagrams
- distinguish class vs interface clearly
- design with interface-first thinking
- prefer composition when it improves flexibility
- choose maintainable OOP structure

**Out of scope**

- full domain-driven design patterns
- advanced UML diagram types beyond class diagram

---

## UML in One Minute

UML (Unified Modeling Language) is a visual blueprint for system design.

Use it to discuss structure before coding.

- UML is not runtime code
- UML helps align devs and stakeholders

---

## Class Diagram Core Shape

```text
+----------------------+
|      ClassName       |
+----------------------+
| -attribute: type     |
| +attribute: type     |
+----------------------+
| +method(): type      |
| -method(): type      |
+----------------------+
```

Access symbols:

| Symbol | Meaning |
|---|---|
| `+` | public |
| `-` | private |
| `#` | protected |

Mini mapping:

```ts
class Account {
  private balance = 0;

  deposit(n: number): void {
    this.balance += n;
  }

  getBalance(): number {
    return this.balance;
  }
}
```

---

## UML Relationships (Exam-Focused)

- Inheritance (`is-a`): `Dog -> Animal`
- Association (uses): `Teacher -- Student`
- Composition (`has-a`, strong ownership): `Car ◆-- Engine`
- Aggregation (`has-a`, weak/shared ownership): `Team ◇-- Player`

Quick rule:

- composition implies lifecycle coupling
- aggregation allows independent lifecycle

---

## Multiplicity Cheat Table

Multiplicity is written at association ends and indicates allowed count.

| Multiplicity | Meaning | Typical TS Shape |
|---|---|---|
| `1` | exactly one | `prop: T` |
| `0..1` | optional single | `prop?: T` |
| `0..*` | zero or many | `prop: T[]` |
| `1..*` | one or many | `prop: T[]` + non-empty rule |
| `n..m` | bounded range | `prop: T[]` + min/max rule |

Example:

- `Company 1 --- * Employee`
- one company has many employees
- each employee belongs to one company

---

## Class vs Interface

### Interface

Interface defines capability contract (what must exist), not shared implementation.

```ts
interface PaymentMethod {
  pay(amount: number): void;
}
```

### Class

Class can hold state and implementation details.

```ts
class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log('Paid by credit card:', amount);
  }
}
```

### Abstract Class (quick contrast)

- can contain shared state and method implementations
- good when multiple subclasses reuse behavior

Design shortcut:

- interface-first for capability contracts
- abstract class for shared behavior/state

---

## Interface-First Design Workflow

1. define required capability as interface
2. code business object against interface type
3. inject concrete implementation later

```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}
```

Benefit:

- low coupling
- easier swapping/testing of implementations

---

## Composition over Inheritance

Prefer composition when behavior can vary by dependency.

```ts
interface PaymentMethod {
  pay(amount: number): void;
}

class Order {
  constructor(private payment: PaymentMethod) {}

  checkout(amount: number): void {
    this.payment.pay(amount);
  }
}
```

Why this is flexible:

- `Order` depends on contract, not concrete class
- payment strategy can change without editing `Order`

---

## Common Design Mistakes

- using inheritance only to reuse tiny code
- hard-coding concrete dependencies in domain classes
- forgetting multiplicity business rules (`1..*` but allowing empty array)
- mixing design contract and implementation concerns too early

---

## Quiz-Safe Checklist

- Is each class responsibility clear?
- Are capabilities modeled as interfaces where useful?
- Is composition used for replaceable behavior?
- Do multiplicity constraints match business rules?
- Can key parts be replaced without rewriting core logic?

---

## Supplemental Resources

- UML class diagram tutorial: https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-class-diagram-tutorial/
- UML class diagrams (short): https://www.youtube.com/watch?v=6XrL5jXmTwM
- UML (Thai detail): https://www.youtube.com/watch?v=GrLUISkiekI
- UML (Thai): https://www.youtube.com/watch?v=uPm4Zur0A4A
- Workshop/Lab — OOP Design with Interface & Composition: https://www.notion.so/Workshop-Lab-OOP-Design-with-Interface-Composition-bda1e8a0942883e891d481e0f465b7a4?pvs=21

---

## Key Takeaways

- UML clarifies structure before coding.
- Interface-first design keeps contracts stable.
- Composition usually gives better flexibility than inheritance.
- Multiplicity must be enforced by business rules in code.
- Good design reduces rewrite cost when requirements change.
