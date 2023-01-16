import CreateUpdate from './functions/fakeorm/CreateUpdate.js';
import express from 'express';

const app = express();
const port = 3000;

// Create a new user
app.get('/', (req, resp) => {
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
        return resp.status(201).send(`Successfully created user: ${JSON.stringify(newUser.name)}`);
    } else {
        return resp.status(500).send('Something went wrong in the server.');
    }
});

app.listen(port, () => {
    console.log('Listening on port:', port);
});