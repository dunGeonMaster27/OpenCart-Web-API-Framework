import { test, expect } from '../../src/fixtures/apifixtures';

let OAUTH_CONFIG = {
    tokenURL: 'https://accounts.spotify.com/api/token',
    grantType: process.env.GRANT_TYPE!,
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!
}

let accessToken: string;

test.beforeEach('POST - generate access token', async ({ request }) => {
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    })

    expect(response.status()).toBe(200);

    let jsonResponse = await response.json();
    accessToken = jsonResponse.access_token;
})


test('Get Album test', async ({request}) => {
    let baseURL = 'https://api.spotify.com';
    let endpointURL = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';

    let response = await request.get(`${baseURL}${endpointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    expect(response.status()).toBe(200);
    expect((await response.json()).images.length).toBe(3);
})

