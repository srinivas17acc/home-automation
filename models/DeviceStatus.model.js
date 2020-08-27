const mongoose = require('mongoose');

const deviceStatusSchema = mongoose.Schema({
    deviceId: {
        type: String,
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

module.exports = mongoose.model('DeviceStatus', deviceStatusSchema);