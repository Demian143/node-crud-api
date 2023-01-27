import fs from 'fs';

function cleanDB() {
    return fs.readFile('./api/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const json = JSON.parse(data)
        json.users = []

        fs.writeFileSync('./api/db.json', JSON.stringify(json), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        })
    })
}

export { cleanDB };