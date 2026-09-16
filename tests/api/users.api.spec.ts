import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

let userId: number;

test.describe.serial('e2e rest api crud test', () => {
    test('GET api test', async ({ apiHelper }) => {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER)

        console.log(await response.body);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })


    test('POST api test', async ({ apiHelper }) => {
        let userData = {
            name: "Test",
            email: `test${Date.now()}@kling-bernhard.test`,
            gender: "male",
            status: "active"
        }

        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER)

        console.log(await response.body);
        expect(response.status).toBe(201);
        userId = response.body.id;
    })


    test('GET api test with ID', async ({ apiHelper }) => {
        let response = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER)

        console.log(await response.body);
        expect(response.status).toBe(200);

    })


    test('PUT api test', async ({ apiHelper }) => {
        let userData = {
            name: "Test",
            email: `test${Date.now()}@kling-bernhard.test`,
            gender: "female",
            status: "inactive"
        }

        let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER)

        console.log(await response.body);
        expect(response.status).toBe(200);
    })


    test('DELETE api test', async ({ apiHelper }) => {
        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER)

        expect(response.status).toBe(204);
    })
})

