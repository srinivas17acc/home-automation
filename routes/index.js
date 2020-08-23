const express = require('express');

const statusCheck = require('./helloNode');
const authController = require('./auth/auth.controller');
const router = express.Router();

router.use(statusCheck);
router.use('/register', authController.register);
router.use('/login', authController.login);    


module.exports = router;