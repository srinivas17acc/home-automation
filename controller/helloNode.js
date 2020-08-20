const httpStatus = require('http-status');

const helloWord = async (req, res) => {
    res.status(httpStatus.OK).send({health: 'OK'});
}

module.exports = {
    helloWord,
}