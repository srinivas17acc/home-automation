const express = require('express');
const authController = require('./auth/auth.controller');
const devices = require('./devices/device.controller');
const verify = require('../config/verifyToken')
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', verify, authController.profile);

router.post('/device/create', verify, devices.createDevice);
router.get('/user/devices', verify, devices.getUserDevices);
router.delete('/user/device/remove', verify, devices.removeDevice);
router.post('/user/device/change/status', verify, devices.deviceStatusChange);


module.exports = router;