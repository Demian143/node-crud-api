import fs from 'fs';

function ReadUser({ name, resp }) {
    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

        const result = JSON.parse(data);

        if (name) {
            const getUser = result.users.filter(user => user.name === name)
            resp.status(200).json(getUser[0]);

        } else {
            resp.status(200).json(result);
        }
    });
}

export default ReadUser;