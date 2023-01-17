import fs from 'fs';

function ReadUser({ name, resp }) {
    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

        const result = JSON.parse(data);

        if (name) {
            const user = result.users.filter(user => user.name === name)
            resp.status(200).send(JSON.stringify(user));
        }

        resp.status(200).send(JSON.stringify(data));
    });
}

export default ReadUser;