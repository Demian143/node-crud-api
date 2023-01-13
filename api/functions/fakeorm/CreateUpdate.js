import fs from 'fs';

function CreateUpdate(obj) {
    // Inserts a new user in the fake db
    // This code emulates the work of a real db, just for fun.

    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const newJson = JSON.parse(data);
        newJson[obj.name] = obj; // This sintax ensures that will not have duplicates If you refer to the same object it will be updated.
        fs.writeFile("./api/db.json", JSON.stringify(newJson), (err) => { console.log(err); });
    });
}

export default CreateUpdate;