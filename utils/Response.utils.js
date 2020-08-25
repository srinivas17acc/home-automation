const successResponse = (data, message = '') => {
    return {
        code: 200,
        data: data,
        message: message,
    }
};

const errorResponse = (err) => {
    return {
        code: 400,
        error: err,
    }
};


module.exports = {
    successResponse,
    errorResponse
}