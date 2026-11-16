const express = require('express');
const router = express.Router();
// Asumiendo que tenés tus modelos configurados así (ajustá la ruta si es necesario)
const adoptionModel = require('../models/adoption.model');
const userModel = require('../models/user.model');
const petModel = require('../models/pet.model');

// Devuelve todas las adopciones desde MongoDB
router.get('/', async (req, res) => {
    try {
        const adoptions = await adoptionModel.find();
        res.status(200).json({ status: 'success', payload: adoptions });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener adopciones' });
    }
});

// Busca una adopción real por ID en MongoDB
router.get('/:aid', async (req, res) => {
    try {
        const adoption = await adoptionModel.findById(req.params.aid);
        if (!adoption) {
            return res.status(404).json({ status: 'error', message: 'Adopción no encontrada' });
        }
        res.status(200).json({ status: 'success', payload: adoption });
    } catch (error) {
        // Mongoose tira un CastError si el ID tiene formato inválido
        res.status(404).json({ status: 'error', message: 'Adopción no encontrada o ID inválido' });
    }
});

// Crea una adopción verificando que el usuario y mascota existan en MongoDB
router.post('/:uid/:pid', async (req, res) => {
    try {
        const { uid, pid } = req.params;

        // Verificamos si el usuario existe
        const user = await userModel.findById(uid);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        // Verificamos si la mascota existe
        const pet = await petModel.findById(pid);
        if (!pet) {
            return res.status(404).json({ status: 'error', message: 'Mascota no encontrada' });
        }

        // Si ambos existen, creamos la adopción real
        const newAdoption = await adoptionModel.create({ owner: uid, pet: pid });
        res.status(201).json({ status: 'success', payload: newAdoption });

    } catch (error) {
        res.status(404).json({ status: 'error', message: 'Usuario o mascota no encontrados' });
    }
});

module.exports = router;