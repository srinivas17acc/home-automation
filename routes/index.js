const express = require('express');

const statusCheck = require('./helloNode');
const router = express.Router();

router.use(statusCheck);

module.exports = router;