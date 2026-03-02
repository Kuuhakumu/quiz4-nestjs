# **S9 — Backend Fundamentals: Protocol -> API Design -> Tooling**

### Overview

This session gives you a practical backend foundation before coding NestJS CRUD.

Goals:

- understand client-server communication
- understand HTTP request/response model
- design REST APIs with clean resource URLs
- return consistent JSON responses
- test APIs with Postman
- understand why NestJS is a framework (not just a library)

---

## Backend Responsibilities

Backend is responsible for:

- receiving requests from clients (web/mobile)
- running business logic
- reading/writing data sources
- sending responses back

Key rule:

- client should not know backend internals
- client should only know API contract

---

## HTTP Fundamentals

HTTP (HyperText Transfer Protocol) is the communication protocol between client and server.

Core characteristics:

- stateless by default
- request -> response cycle
- runs on top of TCP/IP

### Request Structure

```http
METHOD /path HTTP/1.1
Headers
Body
```

Example:

```http
POST /users HTTP/1.1
Content-Type: application/json

{ "name": "Alice" }
```

### Response Structure

- status code
- headers
- body

---

## HTTP Methods and Intent

Method shows request intent.

| Method | Purpose |
|---|---|
| GET | Retrieve data |
| POST | Create data |
| PUT | Replace data |
| PATCH | Update partial data |
| DELETE | Remove data |

Quick warning:

- do not use `GET` to create data

---

## URL and REST Resource Design

A URL identifies where a resource is accessed.

REST focuses on resources, not action verbs.

Good:

- `/users`
- `/users/1`
- `/products/5`

Bad:

- `/getUser`
- `/createUser`
- `/user GET/POST`

Naming convention:

- use nouns
- use plural names

Examples:

- `/users`
- `/orders`
- `/products`

---

## REST + CRUD Mapping

CRUD = Create, Read, Update, Delete.

| Action | Method |
|---|---|
| Create | POST |
| Read | GET |
| Update | PUT / PATCH |
| Delete | DELETE |

Minimal REST principles for quiz-safe design:

- use HTTP method correctly
- URL represents resource
- keep APIs stateless
- return JSON responses

---

## Status Codes You Must Use Correctly

Families:

- 2xx = success
- 3xx = redirection
- 4xx = client error
- 5xx = server error

Common codes:

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

## API Versioning

Version your API in URL when needed:

- `/api/v1/users`

Rule:

- avoid hard-coding business logic around only one version assumption

---

## JSON Response Standard

Consistent response shape helps:

- frontend integration
- predictable error handling
- faster debugging
- safer backend refactors

### Success Response

```json
{
  "success": true,
  "data": { "id": 1, "name": "Alice" }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found"
  }
}
```

Rule:

- avoid returning floating plain-string errors

---

## JSON Serialization Basics

JSON is the common data format between backend and client.

Example:

```json
{"id":1,"name":"Alice","isActive":true}
```

Flow:

- serialization: object -> JSON
- deserialization: JSON -> object

Backend does this continuously in real APIs.

---

## Postman Basics (Exam-Safe)

Why Postman:

- test API without frontend

Basic flow:

1. select HTTP method
2. enter URL
3. set headers
4. add body (if needed)
5. click Send

POST JSON example body:

```json
{ "name": "Alice", "email": "alice@mail.com" }
```

Required header for JSON body:

- `Content-Type: application/json`

Check these in response:

- status code
- response body
- response time

Common mistakes:

- using GET for create
- using verb-style URLs
- ignoring status codes
- returning unstructured errors

---

## NestJS: Framework vs Library

### Framework

A framework provides:

- predefined architecture
- conventions and lifecycle
- controlled execution flow

Mental model:

- framework calls your code

### Library

A library provides reusable tools/functions.

Mental model:

- your code calls the library

### Core Difference (IoC)

Inversion of Control (IoC):

- library: `YourCode -> Library`
- framework: `Framework -> YourCode`

Why it matters in NestJS:

- you define controllers/services/providers
- NestJS runtime decides when to instantiate and call them

This aligns with S2:

- controller handles HTTP mapping
- service handles business decisions

---

## References

- What is a URL: https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL
- HTTP status codes (MDN): https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- HTTP status codes (Wikipedia): https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
- JSON:API format ideas: https://jsonapi.org/
- DummyJSON docs: https://dummyjson.com/docs/
- Studio Ghibli API: https://ghibliapi.vercel.app/
- NestJS docs: https://docs.nestjs.com/

---

## Key Takeaways

- Backend owns logic/data and exposes API contracts.
- HTTP method expresses intent; URL expresses resource.
- REST design should be noun-based, plural, and stateless.
- Status codes and response structure must be consistent.
- Postman helps verify API behavior quickly.
- NestJS is framework-driven (IoC), not utility-only library usage.
