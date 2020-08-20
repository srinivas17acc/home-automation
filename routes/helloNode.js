const router = require('express').Router();
const status = require('../controller/helloNode');

router.get('/check', status.helloWord);

module.exports = router;