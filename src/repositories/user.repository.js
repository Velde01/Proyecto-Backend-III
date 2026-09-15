const userDAO = require('../dao/user.dao');
const UserDTO = require('../dto/user.dto');

class UserRepository {
    // Usamos el DTO para limpiar el usuario que viene de Passport
    getCurrentUser(user) {
        return new UserDTO(user); 
    }
}

module.exports = new UserRepository();