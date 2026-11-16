const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Vincula con la colección de usuarios
        required: true
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pets', // Vincula con la colección de mascotas
        required: true
    }
}, { timestamps: true }); // Agrega fecha de creación automáticamente

module.exports = mongoose.model('adoptions', adoptionSchema);