import CreateUser from './functions/CreateUser.js';
import ReadUser from './functions/ReadUser.js';
import UpdateUser from './functions/UpdateUser.js';
import DeleteUser from './functions/DeleteUser.js';

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
    // field verification
    for (let value in newUser) {
        if (newUser[value] === undefined) {
            resp.send(`Value ${value} is missing, please fill the fields correctly. Hint: values are name, age, city, state and country.`);
            return;
        }
    }

    CreateUser(newUser, resp)
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
    DeleteUser(req.query.name, resp);
})

app.listen(port, () => {
    console.log('Listening on port:', port);
});