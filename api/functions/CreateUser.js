import fs from 'fs';


function CreateUser(obj, resp) {
    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const newJson = JSON.parse(data);
        newJson.users.push(obj);

        fs.writeFile("./api/db.json", JSON.stringify(newJson), err => {
            if (err) {
                console.log(err);
                resp.status(500).send('Sorry, something went wrong.')
                return;
            }

            resp.status(201).json(obj);
        });
    });
}

export default CreateUser;