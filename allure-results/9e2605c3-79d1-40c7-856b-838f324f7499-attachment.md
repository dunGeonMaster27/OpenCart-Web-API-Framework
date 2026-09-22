# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.api.practice.spec.ts >> DELETE api test
- Location: tests/api/users.api.practice.spec.ts:90:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 204
Received: 404
```

# Test source

```ts
  1  | import { test, expect, APIResponse } from '@playwright/test';
  2  | 
  3  | 
  4  | let AUTH_TOKEN = {
  5  |     Authorization: 'Bearer 0905cf8884016c9d367af2c696897216b8067324bc082672e25e4977f70ce353'
  6  | }
  7  | 
  8  | test('GET api test', async ({request}) => {
  9  |     let response: APIResponse =  await request.get('https://gorest.co.in/public/v2/users', {
  10 |         headers: AUTH_TOKEN
  11 |     })
  12 | 
  13 |     console.log(await response.json());
  14 |     expect(response.status()).toBe(200);
  15 |     expect(response.statusText()).toBe('OK');
  16 | 
  17 | })
  18 | 
  19 | 
  20 | test('POST api test', async ({ request }) => {
  21 | 
  22 |     // User JS Object
  23 |     let userData = {
  24 |         name: "Test",
  25 |         email: "test@kling-bernhard.test",
  26 |         gender: "male",
  27 |         status: "active"
  28 |     }
  29 | 
  30 |     // JS Object ---> JSON (Serialization)
  31 |     // JSON.stringify
  32 | 
  33 |     let response: APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
  34 |         headers: AUTH_TOKEN,
  35 |         data: userData
  36 |     })
  37 | 
  38 |     console.log(await response.json());
  39 |     expect(response.status()).toBe(201);
  40 | 
  41 | })
  42 | 
  43 | 
  44 | test('GET api test with ID', async ({ request }) => {
  45 |     let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users/8616244', {
  46 |         headers: AUTH_TOKEN
  47 |     })
  48 | 
  49 |     console.log(await response.json());
  50 |     expect(response.status()).toBe(200);
  51 | 
  52 | })
  53 | 
  54 | 
  55 | test('PUT api test', async ({ request }) => {
  56 | 
  57 |     let userData = {
  58 |         name: "Test",
  59 |         email: "test@kling-bernhard.test",
  60 |         gender: "female",
  61 |         status: "inactive"
  62 |     }
  63 | 
  64 |     let response: APIResponse = await request.put('https://gorest.co.in/public/v2/users/8616244', {
  65 |         headers: AUTH_TOKEN,
  66 |         data: userData
  67 |     })
  68 | 
  69 |     console.log(await response.json());
  70 |     expect(response.status()).toBe(200);
  71 | })
  72 | 
  73 | 
  74 | test('PATCH api test', async ({ request }) => {
  75 | 
  76 |     let userData = {
  77 |         email: "test@kling-bernhard.tests",
  78 |     }
  79 | 
  80 |     let response: APIResponse = await request.put('https://gorest.co.in/public/v2/users/8616244', {
  81 |         headers: AUTH_TOKEN,
  82 |         data: userData
  83 |     })
  84 | 
  85 |     console.log(await response.json());
  86 |     expect(response.status()).toBe(200);
  87 | })
  88 | 
  89 | 
  90 | test('DELETE api test', async ({ request }) => {
  91 | 
  92 |     let response: APIResponse = await request.delete('https://gorest.co.in/public/v2/users/8616320', {
  93 |         headers: AUTH_TOKEN
  94 |     })
  95 | 
> 96 |     expect(response.status()).toBe(204);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  97 | })
```