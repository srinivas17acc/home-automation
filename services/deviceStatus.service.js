const DeviceStatusSchema = require('../models/DeviceStatus.model');

const createOrUpdateDeviceStatus = async (deviceStatus) => {
    let status;
    const filter = { deviceId: deviceStatus.id };
    status = await DeviceStatusSchema.findOneAndUpdate(filter, {
        $set: {
            deviceId: deviceStatus.id,
            status: deviceStatus.status
        }
    }, {
        new: true,
        upsert: true,
    }).lean();

    console.log(status, ' status');
    return status;
};

const getDeviceStatus = async (deviceId) => {
    const filter = { "deviceId": deviceId };
    const deviceStatus = await DeviceStatusSchema.findOne(filter);
    if (deviceStatus) {
        return deviceStatus;
    } else {
        throw new Error(`${deviceId} is not found`);
    }
}

module.exports = {
    createOrUpdateDeviceStatus,
    getDeviceStatus
}