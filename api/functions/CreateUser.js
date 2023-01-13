import CreateUpdate from './fakeorm/CreateUpdate.js';

function CreateUser(obj) {
    const newUser = {
        name: obj.name,
        age: obj.age,
        city: obj.city,
        state: obj.state,
        country: obj.country
    };

    CreateUpdate(newUser);
}


export default CreateUser;