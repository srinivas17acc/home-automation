const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../routes/auth/auth.validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { report } = require('../routes');


const register = async (userData) => {

    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist) {
        throw new Error('User already exist');
    }
    const { error } = registerValidation(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const hashPwd = await bcrypt.hash(userData.password, 10);
    const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashPwd
    });

    try {
        const saveUser = await user.save();
        return saveUser.id;
    } catch (err) {
        throw new Error(err);
    }
};

const login = async (userData) => {

    let header;
    let token;
    let response = [];
    let comparePwd;

    const { error } = loginValidation(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const validUser = await User.findOne({ email: userData.email });
    if (validUser) {
        comparePwd = await bcrypt.compare(userData.password, validUser.password);
    }
    if (validUser == null || !userData.email == validUser.email || !validUser.password == comparePwd) {
        throw new Error('username or password wrong');
    }
    token = jwt.sign({ id: validUser.id }, process.env.TOKEN_SECRET);
    header = 'auth-token';
    response.push(header);
    response.push(token);

    return response;
};

const getUserById = async (id) => {
    return User.findById(id).lean();
};

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    await user.remove();
    return user;
};


module.exports = {
    register,
    login,
    getUserById,
    getUserByEmail,
    deleteUserById
};




