import supertest from "supertest";
import app from "../app.js";

import { cleanDB } from "./cleanDB.js";


beforeEach(() => {
    cleanDB();
});

afterAll(() => {
    cleanDB();
});

it('GET / --> Empty Array', async () => {
    await supertest(app).get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect('{"users":[]}');
});

it('POST / --> JSON obj with a user', async () => {
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

it('PATCH / --> JSON obj modified', async () => {
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

    // Modify name
    user.name = 'DebianNew';
    await response.patch('/')
        .send({ name: 'Debian', newName: 'DebianNew' })
        .expect(user)
        .expect(200);
})

it('DELETE / --> JSON obj deleted', async () => {
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
        .expect(user)
        .expect(201);

    // Modify name
    await response.delete('/')
        .send({ name: 'Debian' })
        .expect(user);
})