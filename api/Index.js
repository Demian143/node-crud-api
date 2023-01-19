import CreateUpdate from './functions/fakeorm/CreateUpdate.js';
import ReadUser from './functions/ReadUser.js';
import express from 'express';

const app = express();
const port = 3000;


app.get('/', (req, resp) => {
    const name = req.query.name;

    if (name) {
        ReadUser({ name: name, resp: resp });
        return;
    }

    ReadUser({ resp: resp });
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


app.listen(port, () => {
    console.log('Listening on port:', port);
});