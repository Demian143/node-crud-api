import fs from 'fs';


function UpdateUser({ name, newName, age, city, state, country, resp }) {
    fs.readFile("./api/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

        const result = JSON.parse(data);

        if (name === undefined) {
            resp.send('Name must be provided');
            return;
        }

        const getUser = result.users.filter(user => user.name === name);

        if (getUser.length === 0) {
            resp.status(404).send('User not found');
            return;
        } if (newName) {
            getUser[0].name = newName;
        } if (age) {
            getUser[0].age = age;
        } if (city) {
            getUser[0].city = city;
        } if (state) {
            getUser[0].state = state;
        } if (country) {
            getUser[0].country = country;
        }

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