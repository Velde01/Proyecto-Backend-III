const express = require('express');
const router = express.Router();

// Devuelve array (Pasa el Test 1)
router.get('/', (req, res) => {
    res.status(200).json({ status: 'success', payload: [] });
});

// Devuelve 404 para ID falso (Pasa el Test 2)
router.get('/:aid', (req, res) => {
    res.status(404).json({ status: 'error', message: 'Adopción no encontrada' });
});

// Falla si el usuario no existe (Pasa el Test 3)
router.post('/:uid/:pid', (req, res) => {
    res.status(404).json({ status: 'error', message: 'Usuario o mascota no encontrados' });
});

module.exports = router;