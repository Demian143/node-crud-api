import fs from 'fs';


function UpdateUser(obj, resp) {
    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

        const result = JSON.parse(data);

        if (obj.name === undefined) {
            resp.send('Name must be provided');
            return;
        }

        const getUser = result.users.filter(user => user.name === obj.name);

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
        }

        // if (getUser.length === 0) {
        //     resp.status(404).send('User not found');
        //     return;
        // } if (newName) {
        //     getUser[0].name = newName;
        // } if (age) {
        //     getUser[0].age = age;
        // } if (city) {
        //     getUser[0].city = city;
        // } if (state) {
        //     getUser[0].state = state;
        // } if (country) {
        //     getUser[0].country = country;
        // }

        fs.writeFile('api/db.json', JSON.stringify(result), (err) => {
            if (err) {
                console.log(err);
                resp.status(500).send('Sorry, something went wrong.')
                return;
            }

            resp.status(200).json(getUser[0]);
        });
    });
}


export default UpdateUser;