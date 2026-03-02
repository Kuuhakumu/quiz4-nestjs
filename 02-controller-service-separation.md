# 02 — Controller vs Service Separation

Keep this split clean to reduce bugs and improve quiz readability.

## Golden Rule

- Controller handles HTTP shape.
- Service handles data logic and rules.

If this boundary is clear, debugging becomes faster and method behavior is easier to test.

## What Belongs in Controller

- Route decorators: @Get, @Post, @Put, @Patch, @Delete
- Request extraction: @Param, @Body, @Query
- Small conversion like Number(id)
- Calling service methods and returning result

Controller should stay short and predictable.

## What Belongs in Service

- Read/write JSON or database calls
- Business validation (required fields, duplicate checks)
- Search/update/delete logic
- Throwing BadRequestException and NotFoundException

Service is where behavior lives.

## Good Pattern Example

```ts
// controller
@Get(':id')
findOne(@Param('id') id: string) {
  return this.itemsService.findOne(Number(id));
}
```

```ts
// service
async findOne(id: number) {
  if (Number.isNaN(id)) throw new BadRequestException('id must be a number');
  const data = await this.readData();
  const found = data.find((item) => item.id === id);
  if (!found) throw new NotFoundException('Item not found');
  return found;
}
```

## Anti-Pattern and Rewrite

Bad (logic inside controller):

```ts
@Get(':id')
async findOne(@Param('id') id: string) {
  const data = JSON.parse(await fs.readFile('items.json', 'utf-8'));
  return data.find((x) => x.id === Number(id));
}
```

Better (controller delegates to service):

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return this.itemsService.findOne(Number(id));
}
```

Why better:

- Controller remains focused on HTTP mapping.
- Service is reusable from multiple endpoints.
- Error handling becomes consistent.

## Fast Self-Check Before Submit

1. Is each controller method mostly one service call?
2. Are data checks and throws inside service?
3. Is file/database logic absent from controller?