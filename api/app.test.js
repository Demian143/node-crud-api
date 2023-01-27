import supertest from "supertest";
import app from "./app.js";
import fs from 'fs';

async function clearDB() {
    fs.readFile('./api/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const json = JSON.parse(data)
        json.users = []

        fs.writeFile('./api/db.json', JSON.stringify(json), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        })
    })
}

// TODO: increase the timeout value of tests

beforeEach(async () => {
    await clearDB();
});

afterEach(async () => {
    await clearDB();
});

describe('GET /', () => {

    it('GET / --> Empty array', async () => {
        await supertest(app).get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('{"users":[]}');
    });

    it('GET / --> Array with one user', async () => {
        const user = {
            name: 'Debian',
            age: '23',
            city: 'São Gonçalo',
            state: 'RJ',
            country: 'Brazil'
        };
        await supertest(app)
            .post('/?name=Debian&age=23&city=São Gonçalo&state=RJ&country=Brazil')
            .expect(user)
            .expect(201);
    });
});