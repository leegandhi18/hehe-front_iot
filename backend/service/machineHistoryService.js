const logger = require('../lib/logger');
const machineHistoryDao = require('../dao/machineHistoryDao');
const tsEdukitDao = require('../dao/tsEdukitDao');

const service = {
  // 완료이력 list 조회
  async list() {
    let result = null;

    try {
      result = await machineHistoryDao.selectList();
      logger.debug(`(machineHistoryService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 완료이력 등록
  async reg(params) {
    let countResult = null; // TSDB에서 현재 호기 생산 Count 값
    let inserted = null;

    // TSDB에서 현재 호기 생산 Count select
    try {
      countResult = await tsEdukitDao.selectCount();
      logger.debug(`(itemService.quantityEdit.tsdb) ${JSON.stringify(countResult)}`);
    } catch (err) {
      logger.error(`(itemService.quantityEdit.tsdb) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    const newParams = {
      ...params,
      totalQuantity: countResult[0].No1Count,
      goodQuantity: countResult[0].No3Count,
      badQuantity: countResult[0].No1Count - countResult[0].No3Count,
    };

    try {
      inserted = await machineHistoryDao.insert(newParams);
      logger.debug(`(machineHistoryService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 특정 완료이력 조회
  async info(params) {
    let result = null;

    try {
      result = await machineHistoryDao.selectInfo(params);
      logger.debug(`(machineHistoryService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 완료이력 수정
  async edit(params) {
    let result = null;

    try {
      result = await machineHistoryDao.update(params);
      logger.debug(`(machineHistoryService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 완료이력 삭제
  async delete(params) {
    let result = null;

    try {
      result = await machineHistoryDao.delete(params);
      logger.debug(`(machineHistoryService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.delete) ${err.toString()}`);
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
