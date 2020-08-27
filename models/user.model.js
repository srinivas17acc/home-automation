const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 40
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 40
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 200
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);