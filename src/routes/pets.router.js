const express = require('express');
const petModel = require('../models/pet.model'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pets = await petModel.find();
        res.json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;