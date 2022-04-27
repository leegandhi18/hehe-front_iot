const logger = require('../lib/logger');
const itemDao = require('../dao/itemDao');
const tsEdukitDao = require('../dao/tsEdukitDao');
const mqttUtil = require('../lib/mqttUtil');

const service = {
  // 재료 list 조회
  async list() {
    let result = null;

    try {
      result = await itemDao.selectList();
      logger.debug(`(itemService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 작업 후 재료/완성품 재고값 수정
  async quantityEdit(params) {
    let countResult = null; // TSDB에서 현재 호기 생산 Count 값
    let nowQuantity = null; // 재료/완성품 현재 재고 quantity 값
    let updatedQuantity = null; // 재료/완성품 현재 재고 quantity 값
    let uc = null; // 재료/완성품 재고 update 결과

    // TSDB에서 모든 호기 Count와 No2Mode, DiceComparisonValue select
    try {
      countResult = await tsEdukitDao.selectCount();
      logger.debug(`(itemService.quantityEdit.tsdb) ${JSON.stringify(countResult)}`);
    } catch (err) {
      logger.error(`(itemService.quantityEdit.tsdb) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // console.log(countResult);
    // console.log(countResult[0]);
    // console.log(countResult[0].No1Count);
    // console.log(countResult[0].No2Count);
    // console.log(countResult[0].No3Count);
    // console.log(countResult[0].No2Mode);
    // console.log(countResult[0].DiceComparisonValue);

    // 현재 재료/완성품 개수 select
    try {
      nowQuantity = await itemDao.selectQuantity(params);
      logger.debug(`(itemService.quantityEdit.rdb) ${JSON.stringify(nowQuantity)}`);
    } catch (err) {
      logger.error(`(itemService.quantityEdit.rdb) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    console.log('asdf:', nowQuantity.rows);

    // 업데이트 할 수 있도록 data 가공
    try {
      updatedQuantity = await mqttUtil.updateItemQuantityData(params, countResult, nowQuantity);
      logger.debug(`(itemService.mqttUtil.updateItemQuantityData) ${JSON.stringify(nowQuantity)}`);
    } catch (err) {
      logger.error(`(itemService.mqttUtil.updateItemQuantityData) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // update
    try {
      uc = { updatedCount: 0 };
      for (let i = 0; i < updatedQuantity.name.length; i += 1) {
        const result = await itemDao.updateQuantity(updatedQuantity.name[i], updatedQuantity.quantity[i]);
        uc.updatedCount += result.updatedCount;
        logger.debug(`(itemService.itemDao.updateItemQuantity) ${JSON.stringify(result)}`);
      }
    } catch (err) {
      logger.error(`(itemService.itemDao.updateItemQuantity) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(uc);
    });
  },
  // 재료 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await itemDao.insert(params);
      logger.debug(`(itemService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(itemService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 특정 재료 조회
  async info(params) {
    let result = null;

    try {
      result = await itemDao.selectInfo(params);
      logger.debug(`(itemService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 작업 시작 시 재료 조회
  async itemInfo(params) {
    let result = null;

    try {
      result = await itemDao.selectItemInfo(params);
      logger.debug(`(itemService.itemInfo) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.itemInfo) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 재료 수정
  async edit(params) {
    let result = null;

    try {
      result = await itemDao.update(params);
      logger.debug(`(itemService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 재료 삭제
  async delete(params) {
    let result = null;

    try {
      result = await itemDao.delete(params);
      logger.debug(`(itemService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.delete) ${err.toString()}`);
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
