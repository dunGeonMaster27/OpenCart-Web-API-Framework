import { test, expect } from '../../src/fixtures/apifixtures';

let tokenID: string;

test.beforeEach('POST - generate the token', async ({ request }) => {
    let data = {
        "username": "admin",
        "password": "password123"
    };

    let response = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: { 'Content-Type': 'application/json' },
        data: data
    })

    expect(response.status()).toBe(200);

    let jsonResponse = await response.json();
    tokenID = jsonResponse.token;
})


test('Update Booking test', async ({ request }) => {
    let data = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    };

    let response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: { 'Content-Type': 'application/json' },
        data: data
    })

    expect(response.status()).toBe(200);
    expect((await response.json()).booking.totalprice).toBe(data.totalprice);

    let bookingid = (await response.json()).bookingid;
    
    let putData = {
        "firstname": "Saket",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Lunch"
    };

    let putResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${tokenID}`
         },
        data: putData
    })

    expect(putResponse.status()).toBe(200);
    expect((await putResponse.json()).firstname).toBe(putData.firstname);
    expect((await putResponse.json()).additionalneeds).toBe(putData.additionalneeds);

    let deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${tokenID}`
        },
        data: putData
    })

    expect(deleteResponse.status()).toBe(201);

    let getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`)

    expect(getResponse.status()).toBe(404);
})

