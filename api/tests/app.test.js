import supertest from "supertest";
import app from "../app.js";
import { cleanDB } from "./cleanDB.js";


beforeEach(() => {
    cleanDB();
});


it('GET / --> Empty Array', async () => {
    await supertest(app).get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect('{"users":[]}');
});

it('GET / --> Array With One User', async () => {
    const user = {
        name: 'Debian',
        age: '23',
        city: 'São Gonçalo',
        state: 'RJ',
        country: 'Brazil'
    };
    const response = supertest(app)
    // Create resource object
    await response
        .post('/')
        .send(user)
        .expect(201);

    // Check if resource exists
    await response.get('/?name=Debian')
        .expect(200)
        .expect(user);
});
