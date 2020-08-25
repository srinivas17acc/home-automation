const userService = require('../../services/user.service');
const {omit} = require('lodash');
const { required } = require('@hapi/joi');
const {errorResponse, successResponse } = require('../../utils/Response.utils');
const httpStatus = require('http-status');


const register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        console.log(user);
        res.status(httpStatus.OK).send(successResponse(user, message = 'User created successfully'));
    }catch(err) {
        res.status(httpStatus.BAD_REQUEST).send(errorResponse(err.message));
    }
   
};

const login = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        res.send(successResponse(user, 'Login Successfully')).status(httpStatus.OK);
    }catch(err) {
        res.status(httpStatus.BAD_REQUEST).send(errorResponse(err.message));
    }
};

const profile = async (req, res) => {

    const userId = res.locals.userId;
    if(userId){
        const user = await userService.getUserById(userId);
        res.status(httpStatus.OK).send(successResponse({...omit(user, 'password', '__v')}, message = 'User Found'));
    }else {
        res.status(httpStatus.BAD_REQUEST).send(errorResponse('user Not found'));
    }
};

module.exports = {
    register,
    login,
    profile
};