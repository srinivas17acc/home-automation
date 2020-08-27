const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    deviceName: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        trim: true
    },
    macId: {
        type: String,
        trim: true,
        required: true,
    },
    status: [
        {
            name: {
                type: String,
                trim: true,
            },
            value: mongoose.Mixed,
        }
    ]
});

module.exports = mongoose.model('Device', DeviceSchema);