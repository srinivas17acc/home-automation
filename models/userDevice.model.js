const mongoose = require('mongoose');
//const toJSON = require('./toJSON.plugin')

const userDeviceSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    devices: [String],
});

//userDeviceSchema.plugin(toJSON);

userDeviceSchema.methods.addDevice = async (deviceId) => {
    return this.devices.push(deviceId);
}

module.exports = mongoose.model('UserDevice', userDeviceSchema);