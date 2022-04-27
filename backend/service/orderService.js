const logger = require('../lib/logger');
const orderDao = require('../dao/orderDao');

const service = {
  // 작업현황 list 조회
  async list() {
    let result = null;

    try {
      result = await orderDao.selectList();
      logger.debug(`(orderService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(orderService.list) ${err.toString()}`);
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
      inserted = await orderDao.insert(params);
      logger.debug(`(orderService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(orderService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 작업 전 list 조회
  async beforeWorkingList() {
    let result = null;

    try {
      result = await orderDao.selectWorkingList();
      logger.debug(`(orderService.beforeWorkingList) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(orderService.beforeWorkingList) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 작업 중 list 조회
  async selectBeforeWorkingList() {
    let result = null;

    try {
      result = await orderDao.selectBeforeWorkingList();
      logger.debug(`(orderService.selectBeforeWorkingList) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(orderService.selectBeforeWorkingList) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 특정 작업지시서 조회
  async info(params) {
    let result = null;

    try {
      result = await orderDao.selectInfo(params);
      logger.debug(`(orderService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(orderService.info) ${err.toString()}`);
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
      result = await orderDao.update(params);
      logger.debug(`(orderService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(orderService.edit) ${err.toString()}`);
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
      result = await orderDao.delete(params);
      logger.debug(`(orderService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(orderService.delete) ${err.toString()}`);
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
