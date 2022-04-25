const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');

router.route('/')
// 작업자 list 조회
  .get(async (req, res) => {
    try {
      const params = {
        name: req.query.name,
        password: req.query.password,
        role: req.query.role,
        phone: req.query.phone,
      };
      const result = await userService.list(params);
      logger.info(`(user.list.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 작업자 등록
  .post(async (req, res) => {
    try {
      const params = {
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        phone: req.body.phone,
      };
      logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.userId || !params.name || !params.password || !params.role) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await userService.reg(params);
      logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/:id')
// 특정 작업자 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(user.info.params) ${JSON.stringify(params)}`);

      const result = await userService.info(params);
      logger.info(`(user.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 작업자 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        phone: req.body.phone,
      };
      logger.info(`(user.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await userService.edit(params);
      logger.info(`(user.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 작업자 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await userService.delete(params);
      logger.info(`(user.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/idCheck/:name')
  // 이름 중복 체크
  .post(async (req, res) => {
    try {
      const params = {
        name: req.params.name,
      };
      logger.info(`(user.nameCheck.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.name) {
        const err = new Error('Not allowed null (name)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await userService.idCheck(params);
      logger.info(`(user.nameCheck.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
