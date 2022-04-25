const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const machineService = require('../service/machineService');
// const TsEdukitService = require('../service/tsEdukitService');

router.route('/')
// 기계 list 조회
  .get(async (req, res) => {
    let result = {};
    try {
      result = await machineService.list();
      logger.info(`(machine.list.result) ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 기계 등록
  .post(async (req, res) => {
    try {
      const params = {
        code: req.body.code,
        status: req.body.status,
      };
      logger.info(`(machine.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.itemName || !params.productQuantity
        || !params.startTime || !params.endTime || !params.name) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await machineService.reg(params);
      logger.info(`(machine.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/:id')
// 특정 기계 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(machine.info.params) ${JSON.stringify(params)}`);

      const result = await machineService.info(params);
      logger.info(`(machine.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 기계 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        code: req.body.code,
        status: req.body.status,
      };
      logger.info(`(machine.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await machineService.edit(params);
      logger.info(`(machine.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 기계 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(machine.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await machineService.delete(params);
      logger.info(`(machine.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
