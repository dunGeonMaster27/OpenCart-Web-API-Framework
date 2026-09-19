//schema : type of response data
//ajv - node lib for the schema validation
//npm install ajv


import Ajv from 'ajv';
import { test, expect } from '../../src/fixtures/apifixtures';
import fs from 'fs';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

let ajv = new Ajv();

let userSchema = JSON.parse(fs.readFileSync('./src/schema/userschema.json', 'utf-8'));


let userArraySchema = {
    "type": "array",
    "items": userSchema
}


test('Get user Schema Test', async ({ apiHelper }) => {
    let userData = {
        name: "Test",
        email: `test${Date.now()}@kling-bernhard.test`,
        gender: "male",
        status: "active"
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);

    console.log(await response.body);
    expect(response.status).toBe(201);
    let userId = response.body.id;
    console.log('Created User ID:', userId);

    let getResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getResponse.body);

    if (!isSchemaValid) {
        console.log('SCHEMA ERRORS:', validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

})



test('Get all users api Schema Test', async ({ apiHelper }) => {
    let getResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    let validate = ajv.compile(userArraySchema);
    let isSchemaValid = validate(getResponse.body);

    if (!isSchemaValid) {
        console.log('SCHEMA ERRORS:', validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
})