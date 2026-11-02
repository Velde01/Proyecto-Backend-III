const express = require('express');
const router = express.Router();
const { generateUsers, generatePets } = require('../utils/mocking');
const userModel = require('../models/user.model');
const petModel = require('../models/pet.model');

// 1. Endpoint migrado para generar mascotas mock
router.get('/mockingpets', (req, res) => {
    const pets = generatePets(50); 
    res.json({ status: 'success', payload: pets });
});

// 2. Endpoint para generar 50 usuarios mock (sin insertarlos, solo devolverlos)
router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.json({ status: 'success', payload: users });
});

// 3. Endpoint POST completo (Usuarios + Mascotas)
router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;
        let insertedUsers = [];
        let insertedPets = [];

        if (users > 0) {
            const mockUsers = generateUsers(users);
            insertedUsers = await userModel.insertMany(mockUsers);
        }

        if (pets > 0) {
            const mockPets = generatePets(pets);
            insertedPets = await petModel.insertMany(mockPets);
        }

        res.status(201).json({
            status: 'success',
            message: 'Datos generados e insertados en la base de datos correctamente',
            payload: {
                usersInserted: insertedUsers.length,
                petsInserted: insertedPets.length
            }
        });

    } catch (error) {
        console.error("Error al generar datos:", error);
        res.status(500).json({ status: 'error', message: 'Error interno al insertar los datos' });
    }
});

module.exports = router;
