const logger = require('../lib/logger');
const workStatusDao = require('../dao/workStatusDao');

const service = {
  // 작업상태 list 조회
  async list() {
    let result = null;

    try {
      result = await workStatusDao.selectList();
      logger.debug(`(machineService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 작업상태 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await workStatusDao.insert(params);
      logger.debug(`(machineService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(machineService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 특정 작업상태 조회
  async info(params) {
    let result = null;

    try {
      result = await workStatusDao.selectInfo(params);
      logger.debug(`(machineService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업상태 수정
  async edit(params) {
    let result = null;

    try {
      result = await workStatusDao.update(params);
      logger.debug(`(machineService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업상태 삭제
  async delete(params) {
    let result = null;

    try {
      result = await workStatusDao.delete(params);
      logger.debug(`(machineService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
