import CreateUser from './functions/CreateUser.js';
import ReadUser from './functions/ReadUser.js';
import UpdateUser from './functions/UpdateUser.js';
import DeleteUser from './functions/DeleteUser.js';

import express from 'express';

const app = express();
const port = 3000;

// TODO: Check if all the status codes are correct.

app.get('/', (req, resp) => {
    const name = req.query.name;

    if (name) {
        ReadUser({ name: name, resp: resp });
    } else {
        ReadUser({ resp: resp });
    }
});

app.post('/', (req, resp) => {
    const user = {
        name: req.query.name,
        age: req.query.age,
        city: req.query.city,
        state: req.query.state,
        country: req.query.country
    };
    // field verification
    for (let value in user) {
        if (user[value] === undefined) {
            resp.status(422).send(`Value ${value} is required. Hint: values are name, age, city, state and country.`);
            return;
        }
    }

    CreateUser(user, resp);
});

app.patch('/', (req, resp) => {
    const user = {
        name: req.query.name,
        newName: req.query.newName,
        age: req.query.age,
        city: req.query.city,
        state: req.query.state,
        country: req.query.country
    };

    UpdateUser(user, resp);
});

app.delete('/', (req, resp) => {
    const name = req.query.name
    if (!name) {
        resp.status(422).send('Name is required.')
    }
    DeleteUser(name, resp);
});


app.listen(port, () => {
    console.log('Listening on port:', port);
});