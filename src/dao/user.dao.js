const userModel = require('../models/user.model');

class UserDAO {
    async getByEmail(email) {
        return await userModel.findOne({ email });
    }
    async create(user) {
        return await userModel.create(user);
    }
}

module.exports = new UserDAO();