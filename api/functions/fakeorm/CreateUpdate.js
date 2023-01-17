import fs from 'fs';

// It fills the roles of both CREATE and UPDATE methods,
// it's a super simple emulation of a ORM, that's why it should'nt be used in production


function CreateUpdate(obj) {
    // Inserts a new user in the fake db
    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const newJson = JSON.parse(data);
        newJson.users.push(obj);
        fs.writeFile("./api/db.json", JSON.stringify(newJson), (err) => { console.log(err); });
    });

    return true;

}

export default CreateUpdate;