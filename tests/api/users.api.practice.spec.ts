import { test, expect, APIResponse } from '@playwright/test';


let AUTH_TOKEN = {
    Authorization: 'Bearer 0905cf8884016c9d367af2c696897216b8067324bc082672e25e4977f70ce353'
}

test('GET api test', async ({request}) => {
    let response: APIResponse =  await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    })

    console.log(await response.json());
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

})


test('POST api test', async ({ request }) => {

    // User JS Object
    let userData = {
        name: "Test",
        email: "test@kling-bernhard.test",
        gender: "male",
        status: "active"
    }

    // JS Object ---> JSON (Serialization)
    // JSON.stringify

    let response: APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    })

    console.log(await response.json());
    expect(response.status()).toBe(201);

})


test('GET api test with ID', async ({ request }) => {
    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users/8616244', {
        headers: AUTH_TOKEN
    })

    console.log(await response.json());
    expect(response.status()).toBe(200);

})


test('PUT api test', async ({ request }) => {

    let userData = {
        name: "Test",
        email: "test@kling-bernhard.test",
        gender: "female",
        status: "inactive"
    }

    let response: APIResponse = await request.put('https://gorest.co.in/public/v2/users/8616244', {
        headers: AUTH_TOKEN,
        data: userData
    })

    console.log(await response.json());
    expect(response.status()).toBe(200);
})


test('PATCH api test', async ({ request }) => {

    let userData = {
        email: "test@kling-bernhard.tests",
    }

    let response: APIResponse = await request.put('https://gorest.co.in/public/v2/users/8616244', {
        headers: AUTH_TOKEN,
        data: userData
    })

    console.log(await response.json());
    expect(response.status()).toBe(200);
})


test('DELETE api test', async ({ request }) => {

    let response: APIResponse = await request.delete('https://gorest.co.in/public/v2/users/8616320', {
        headers: AUTH_TOKEN
    })

    expect(response.status()).toBe(204);
})