import fs from 'fs';

function DeleteUser(name, resp) {
    fs.readFile("./api/db.json", (err, data) => {
        if (err) {
            console.error(err);
            resp.status(500).send('Sorry, something went wrong.');
            return;
        }

        const usersArr = JSON.parse(data);
        var userDeleted = {};

        if (usersArr.users.length === 0) {
            resp.status(404).send('User not found.');
            return;
        }

        usersArr.users.map(user => {
            user.name === name && usersArr.users.pop(user);
            userDeleted = user;
        });

        fs.writeFile('./api/db.json', JSON.stringify(usersArr), (err) => {
            if (err) {
                console.error(err);
                resp.status(500).send('Sorry, something went wrong.');
                return;
            }

            resp.status(200).send(userDeleted);
        });
    });
}


export default DeleteUser;