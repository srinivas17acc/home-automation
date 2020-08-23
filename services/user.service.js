const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../routes/auth/auth.validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var message;
var status;
var data = [];
var id;

var response = {
    message,
    status,
    data: [
        id
    ]
}

const register = async (userData) => {

    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist) {
        response.message = 'User already exist';
        response.status = 400;
        return response;
    }

    const { error } = registerValidation(userData);
    if (error) return response.status = 400, response.message = error.details[0].message;

    const hashPwd = await bcrypt.hash(userData.password, 10);

    const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashPwd
    });

    try {
        const saveUser = await user.save();
        response.data.id = saveUser.id;
        response.status = 200;
        response.message = "User created successfully"
        return response;
    } catch (err) {
        return response.status = 400, response.message = err;
    }

};

const login = async (userData) => {

    let header;
    let comparePwd;

    const { error } = loginValidation(userData);
    if (error) {
        response.message = error.details[0].message;
        response.status = 400
        return response;
    }

    const validUser = await User.findOne({ email: userData.email });

    if (validUser) {
        comparePwd = await bcrypt.compare(userData.password, validUser.password);
    }

    if (validUser == null || !userData.email == validUser.email || !validUser.password == comparePwd) {
        response.message = "username or password invalid";
        response.status = 400;
        return response;
    }

    const token = jwt.sign({_id: userData.id}, process.env.TOKEN_SECRET);
    response.data.header = 'auth-token';
    response.data.token = token;
    

    response.message = "Login successfully";
    response.status = 200;
    return response;
};

module.exports = {
    register, login
}