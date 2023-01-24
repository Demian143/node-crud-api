import fs from 'fs';


function UpdateUser(obj, resp) {
    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        if (obj.name === undefined) {
            resp.send('Name must be provided');
            return;
        }

        const result = JSON.parse(data);
        const getUser = result.users.filter(user => user.name === obj.name);
        const builtedUser = BuildAlterations(getUser, obj, resp);

        if (builtedUser) {
            SaveAlterations(builtedUser, JSON.stringify(result), resp);
        }
    });
}


function BuildAlterations(getUser, obj, resp) {
    if (getUser.length === 0) {
        resp.status(404).send('User not found');
        return;
    }

    for (let value in obj) {
        if (!obj[value] || value === 'newName') {
            continue;
        }
        if (obj[value] && value !== 'name') {
            getUser[0][value] = obj[value];
            continue;
        }
        if (obj.newName) {
            getUser[0]['name'] = obj.newName;
        }
    };

    return getUser;
}


function SaveAlterations(getUser, result, resp) {
    fs.writeFile('api/db.json', result, (err) => {
        if (err) {
            console.log(err);
            resp.status(500).send('Sorry, something went wrong.')
            return;
        }

        resp.status(200).json(getUser[0]);
    });
}

export default UpdateUser;