import CreateUser from './functions/CreateUser.js';
import ReadUser from './functions/ReadUser.js';
import UpdateUser from './functions/UpdateUser.js';
import DeleteUser from './functions/DeleteUser.js';
import bodyParser from 'body-parser';

import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
    const user = {
        name: req.body.name,
        age: req.body.age,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
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


// app.listen(port, () => {
//     console.log('Listening on port:', port);
// });

export default app;