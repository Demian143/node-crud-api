import CreateUser from './functions/CreateUser.js';
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

    CreateUser(newUser);
    resp.send(`Successfully created user: ${JSON.stringify(newUser.name)}`);
});

app.listen(port, () => {
    console.log('Listening on port:', port);
});