const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../routes/auth/auth.validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var message;
var status;
var data = [];
var id;

var response = {}

const register = async (userData) => {

    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist) {
        response.message = 'User already exist';
        response.status = 400;
        return response;
    }

    const { error } = registerValidation(userData);
    if (error) {
        response.message = error.details[0].message;
        response.status = 400
        return response;
    }
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
        console.log(err);
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

    console.log(validUser.id, 'validuserid');

    const token = jwt.sign({id: validUser.id}, process.env.TOKEN_SECRET);
    response.data.header = 'auth-token';
    response.data.token = token;
    

    response.message = "Login successfully";
    response.status = 200;
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




