
const userService = require('../../services/user.service');


const register = async (req, res) => {
    const user = await userService.register(req.body);
    res.status(user.status).send({id: user.data.id, message: user.message});
};

const login = async (req, res) => {
    const user = await userService.login(req.body);
    console.log(user.data.header)
    res.header(user.data.header, user.data.token).send(user.data.token).status(user.data.status);
    
};

module.exports = {
    register,
    login
};