import fs from 'fs';


function CreateUser(obj, resp) {
    return fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;

        }

        const newJson = JSON.parse(data);
        newJson.users.push(obj);

        fs.writeFile("./api/db.json", JSON.stringify(newJson), err => {
            if (err) {
                console.log(err);
                return resp.status(500).send('Sorry, something went wrong.')

            }

            return resp.status(201).json(obj);
        });
    });
}

export default CreateUser;