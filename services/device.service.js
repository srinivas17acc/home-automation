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
        throw new Error('duplicate entry');
    }
}

const updateDeviceStatus = async (deviceStatus) => {
    return await DeviceStatusService.createOrUpdateDeviceStatus(deviceStatus);
}

const removeDevice = async (userId, deviceId) => {
    try {
        const result = await  Promise.allSettled(
            Device.findOne(filter),
            UserDevice.removeDeviceFromUser(userId, deviceId),
            DeviceStatusService.getDeviceStatus(deviceId)
       )
         result[2].remove();

    }catch(err) {
         throw new Error(err);
    }
   
}

module.exports = {
    createDevice,
    updateDeviceStatus,
    removeDevice,
}