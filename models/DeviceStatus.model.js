const mongoose = require('mongoose');
//const toJSON = require('./toJSON.plugin');

const deviceStatusSchema = mongoose.Schema({
    deviceId: {
        type: String,
        required:true,
    },
    status:[
        {
            name: {
                type: String,
                trim:true,
            },
            value: mongoose.Mixed,
        }
    ]
});

//deviceStatusSchema.plugin(toJSON);

module.exports = mongoose.model('DeviceStatus', deviceStatusSchema);