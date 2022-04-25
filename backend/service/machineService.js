const logger = require('../lib/logger');
const machineDao = require('../dao/machineDao');
const mqttUtil = require('../lib/mqttUtil');

const service = {
  // 설비관리 list 조회
  async list() {
    let result = null;

    try {
      result = await machineDao.selectList();
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
  // 설비 상태 업데이트
  async statusEdit(message) {
    let result = {};
    let newResult = {};
    let machineStatus = {};

    // RDB에 저장된 설비 상태 출력
    try {
      result = await machineDao.selectList();
      logger.debug(`(machineService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // plc data에서 설비 status 추출 및 변동사항 유무 체크
    try {
      newResult = await mqttUtil.MachineStatusCompare(message, result);
      logger.debug(`(machineService.StatusCompare) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineService.StatusCompare) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // status 변동사항이 있으면 상태 update
    if (newResult !== null) {
      // eslint-disable-next-line consistent-return
      Object.entries(newResult).forEach((e) => {
        const params = {
          code: e[0],
          status: e[1],
        };
        try {
          machineStatus = machineDao.updateStatus(params);
          logger.debug(`(machineService.StatusUpdate) ${JSON.stringify(result)}`);
        } catch (err) {
          logger.error(`(machineService.StatusUpdate) ${err.toString()}`);
          return new Promise((resolve, reject) => {
            reject(err);
          });
        }
      });
    }

    return new Promise((resolve) => {
      resolve(machineStatus);
    });
  },
  // 작업지시서 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await machineDao.insert(params);
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
  // 특정 작업지시서 조회
  async info(params) {
    let result = null;

    try {
      result = await machineDao.selectInfo(params);
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

  // 특정 작업지시서 수정
  async edit(params) {
    let result = null;

    try {
      result = await machineDao.update(params);
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

  // 특정 작업지시서 삭제
  async delete(params) {
    let result = null;

    try {
      result = await machineDao.delete(params);
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
