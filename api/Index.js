import CreateUpdate from './functions/fakeorm/CreateUpdate.js';
import ReadUser from './functions/ReadUser.js';
import UpdateUser from './functions/UpdateUser.js';

import express from 'express';

const app = express();
const port = 3000;


app.get('/', (req, resp) => {
    const name = req.query.name;

    if (name) {
        ReadUser({ name: name, resp: resp });
    } else {
        ReadUser({ resp: resp });
    }
});

app.post('/', (req, resp) => {
    const newUser = {
        name: req.query.name,
        age: req.query.age,
        city: req.query.city,
        state: req.query.state,
        country: req.query.country
    };

    if (CreateUpdate(newUser)) {
        resp.status(201).send(`Successfully created user: ${JSON.stringify(newUser.name)}`);
    } else {
        resp.status(500).send('Something went wrong in the server.');
    }
});

app.patch('/', (req, resp) => {
    const user = {
        name: req.query.name,
        newName: req.query.newName,
        age: req.query.age,
        city: req.query.city,
        state: req.query.state,
        country: req.query.country,
        resp: resp
    };

    UpdateUser(user)
});


app.listen(port, () => {
    console.log('Listening on port:', port);
});