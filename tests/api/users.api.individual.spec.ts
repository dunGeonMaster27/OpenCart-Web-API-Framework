import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

async function createUser(apiHelper: any) {
    let userData = {
        name: "Test",
        email: `test${Date.now()}@kling-bernhard.test`,
        gender: "male",
        status: "active"
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER)

    expect(response.status).toBe(201);
    return response.body;
}


// Test 1: Create a User Test + Verify - AAA (Arrange, act, assert)
test('Create user test', async ({ apiHelper }) => {
    let userResponse = await createUser(apiHelper);

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('Test');
})


// Test 2: Update a User Test + Verify - AAA (Arrange, act, assert)
test('Update user test', async ({ apiHelper }) => {
    let userResponse = await createUser(apiHelper);

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('Test');

    let updatedUserData = {
        name: "New Test",
        status: "inactive"
    }

    let putResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`, updatedUserData, AUTH_HEADER);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.name).toBe(updatedUserData.name);
    expect(putResponse.body.status).toBe(updatedUserData.status);

    let getResponse1 = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse1.status).toBe(200);
    expect(getResponse1.body.name).toBe(updatedUserData.name);
})


// Test 3: Delete a User Test + Verify - AAA (Arrange, act, assert)
test('Delete user test', async ({ apiHelper }) => {
    let userResponse = await createUser(apiHelper);

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('Test');

    let deleteResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(deleteResponse.status).toBe(204);

    let getResponse1 = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse1.status).toBe(404);
    expect(getResponse1.body.message).toBe('Resource not found');
})