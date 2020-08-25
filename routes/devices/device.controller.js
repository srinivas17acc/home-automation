const httpStatus = require('http-status');
const get = require('lodash/get');
const authService = require('../../services/user.service');
const deviceService = require('../../services/device.service');
const userDeviceService = require('../../services/userDevice.service');
const deviceStatusService = require('../../services/deviceStatus.service');
const { errorResponse, successResponse } = require('../../utils/Response.utils');


const getUserId = (res) => get(res, 'locals.userId', '');

const createDevice = async (req, res) => {
  try {
    const device = get(req, 'body', {});
    const userId = getUserId(res);
    const savedDevice = await deviceService.createDevice(userId, device);
    res.status(httpStatus.OK).send(successResponse({ ...savedDevice }, message = 'created successfully'));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(err.message));
  }
};

const removeDevice = async (req, res) => {
  try {
    const deviceId = req.body.deviceId;
    const userId = getUserId(res);
    await deviceService.removeDevice(userId, deviceId);
    res.status(httpStatus.OK).send(successResponse(message = "removed successfully"));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(err.message));
  }
};

const getUserDevices = async (req, res) => {
  try {
    const userId = getUserId(res);
    const currentUser = await authService.getUserById(userId);
    const data = await userDeviceService.getUserDevices(currentUser);
    res.status(httpStatus.OK).send(successResponse({ ...data }, message = 'found the devices'));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(err.message));
  }

};

const deviceStatusChange = async (req, res) => {
  try {
    const deviceStatus = get(req, 'body', {});
    const status = await deviceStatusService.createOrUpdateDeviceStatus(deviceStatus);
    res.status(httpStatus.OK).send(successResponse({ ...status }, message = 'updated successfully'));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(err.message));
  }
};

module.exports = {
  createDevice,
  removeDevice,
  getUserDevices,
  deviceStatusChange,
};