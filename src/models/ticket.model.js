const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ticketSchema = new mongoose.Schema({
    code: { 
        type: String, 
        unique: true, 
        default: uuidv4 // Genera un código alfanumérico seguro automáticamente
    },
    purchase_datetime: { 
        type: Date, 
        default: Date.now 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    purchaser: { 
        type: String, // Acá guardaremos el email del comprador
        required: true 
    }
});

module.exports = mongoose.model('tickets', ticketSchema);