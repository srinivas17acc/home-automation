const {omit} = require('lodash');
const Device = require('../models/device.model');
const DeviceStatusService = require('../services/deviceStatus.service');
const UserDevice = require('../services/userDevice.service');
const { required } = require('@hapi/joi');
const response  = require('../utils/Response.utils');

const createDevice = async (userId, device) => {
    const deviceStatus = {id: device.id, status: device.status};
    try{
          
       const results = await Promise.allSettled([
            Device.create(device), 
            DeviceStatusService.createOrUpdateDeviceStatus(deviceStatus), 
            UserDevice.addDeviceToUser(userId, device.id) ]);
        const { value } = results[1];
        return {
            ...device,
            ...omit(value, ['_id', 'deviceId', '__v', ]),
        };
    }catch(err){
        console.log(err);
        return {
            error: "Device duplicate entry...",
        }
    }
}

const updateDeviceStatus = async (deviceStatus) => {
    return await DeviceStatusService.createOrUpdateDeviceStatus(deviceStatus);
}

const removeDevice = async (userId, deviceId) => {
    const filter = {"deviceId": deviceId};
    const device = await Device.findOne(filter);
    await UserDevice.removeDeviceFromUser(userId, deviceId);
    const deviceStatus = await DeviceStatusService.getDeviceStatus(deviceId);
    deviceStatus.remove();
}

module.exports = {
    createDevice,
    updateDeviceStatus,
    removeDevice,
}