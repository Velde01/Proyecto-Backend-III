const express = require('express');
const router = express.Router();
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
        res.status(404).json({ status: 'error', message: 'Adopción no encontrada o ID inválido' });
    }
});

// Crea una adopción verificando usuario, mascota y que no haya sido adoptada antes
router.post('/:uid/:pid', async (req, res) => {
    try {
        const { uid, pid } = req.params;

        const user = await userModel.findById(uid);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        const pet = await petModel.findById(pid);
        if (!pet) {
            return res.status(404).json({ status: 'error', message: 'Mascota no encontrada' });
        }

        if (pet.adopted) {
            return res.status(400).json({ status: 'error', message: 'La mascota ya fue adoptada' });
        }

        pet.adopted = true;
        pet.owner = user._id;
        await pet.save();

        const newAdoption = await adoptionModel.create({ owner: uid, pet: pid });
        res.status(201).json({ status: 'success', payload: newAdoption });
    } catch (error) {
        res.status(404).json({ status: 'error', message: 'Usuario o mascota no encontrados o ID inválido' });
    }
});

module.exports = router;