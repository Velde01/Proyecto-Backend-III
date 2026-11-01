const { faker } = require('@faker-js/faker');
const { createHash } = require('../utils'); // Ajustá la ruta según dónde esté tu utils.js

const generateUsers = (quantity) => {
    const users = [];
    // Encriptamos la contraseña una sola vez por eficiencia
    const encryptedPassword = createHash('coder123'); 
    const roles = ['user', 'admin'];

    for (let i = 0; i < quantity; i++) {
        users.push({
            _id: faker.database.mongodbObjectId(), // Formato exacto de petición de Mongo
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 80 }),
            password: encryptedPassword,
            role: faker.helpers.arrayElement(roles), // Varía entre user y admin
            pets: [] // Array vacío por consigna
        });
    }
    
    return users;
};

module.exports = { generateUsers };