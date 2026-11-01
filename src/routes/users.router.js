const express = require('express');
const userModel = require('../models/user.model'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;