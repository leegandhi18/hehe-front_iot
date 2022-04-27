const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const hashUtil = require('../lib/hashUtil');

const service = {
  // 작업자 list 조회
  async list(params) {
    let result = null;

    try {
      result = await userDao.selectList(params);
      logger.debug(`(userService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 작업자 등록
  async reg(params) {
    let inserted = null;
    let hashPassword = null;

    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    const newParams = {
      ...params,
      password: hashPassword,
    };

    try {
      inserted = await userDao.insert(newParams);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 특정 작업자 조회
  async info(params) {
    let result = null;

    try {
      result = await userDao.selectInfo(params);
      logger.debug(`(userService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업자 수정
  async edit(params) {
    let result = null;
    let hashPassword = null;

    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
    } catch (err) {
      logger.error(`(userService.edit.hashUtil) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    const newParams = {
      ...params,
      password: hashPassword,
    };

    try {
      result = await userDao.update(newParams);
      logger.debug(`(userService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업자 삭제
  async delete(params) {
    let result = null;

    try {
      result = await userDao.delete(params);
      logger.debug(`(userService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 이름(아이디) 중복 체크
  async idCheck(params) {
    let result = null;

    try {
      result = await userDao.idOverlabCheck(params);
      logger.debug(`(userService.idCheck) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.idCheck) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 로그인
  async login(params) {
    let result = null;

    try {
      result = await userDao.login(params);
      logger.debug(`(userService.login) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.login) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    try {
      const checkPassword = await hashUtil.checkPasswordHash(params.password, result.password);
      if (!checkPassword) {
        const err = new Error('Incorect name or password');
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      logger.error(`(userService.login.checkPassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    result.password = null;

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
