const mongoose = require('mongoose');

const userDeviceSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    devices: [String],
});

module.exports = mongoose.model('UserDevice', userDeviceSchema);