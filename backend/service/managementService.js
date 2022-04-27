const logger = require('../lib/logger');
const managementDao = require('../dao/managementDao');

const service = {
  // 작업현황 list 조회
  async list() {
    let result = null;

    try {
      result = await managementDao.selectList();
      logger.debug(`(managementService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(managementService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 작업지시서 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await managementDao.insert(params);
      logger.debug(`(managementService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(managementService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 특정 작업지시서 조회
  async info(params) {
    let result = null;

    try {
      result = await managementDao.selectInfo(params);
      logger.debug(`(managementService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(managementService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업지시서 수정
  async edit(params) {
    let result = null;

    try {
      result = await managementDao.update(params);
      logger.debug(`(managementService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(managementService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업지시서 삭제
  async delete(params) {
    let result = null;

    try {
      result = await managementDao.delete(params);
      logger.debug(`(managementService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(managementService.delete) ${err.toString()}`);
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
