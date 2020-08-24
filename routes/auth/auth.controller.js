const userService = require('../../services/user.service');
const {omit} = require('lodash');


const register = async (req, res) => {
    const user = await userService.register(req.body);
    res.status(user.status).send({id: user.data.id, message: user.message});
};

const login = async (req, res) => {
    const user = await userService.login(req.body);
    console.log(user)
    if (user.status == 400) {
         res.status(400).send({user: user.message});
         return;
    }
    res.header(user.data.header, user.data.token).send(user.data.token).status(user.data.status);
    
};

const profile = async (req, res) => {

    const userId = res.locals.userId;
    if(userId){
        const user = await userService.getUserById(userId);
        res.send({...omit(user, 'password')});
    }else {
      res.send({message: "user not found"});
    }
};

module.exports = {
    register,
    login,
    profile
};