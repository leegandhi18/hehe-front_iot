const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const managementService = require('../service/managementService');

router.route('/')
// 관리 list 조회
  .get(async (req, res) => {
    try {
      const result = await managementService.list();
      logger.info(`(management.list.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 관리 등록
  .post(async (req, res) => {
    try {
      const params = {
        state: req.body.state,
        machineCode: req.body.machineCode,
      };
      logger.info(`(management.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.itemName || !params.productQuantity
        || !params.startTime || !params.endTime || !params.name) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await managementService.reg(params);
      logger.info(`(management.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/:id')
// 특정 관리 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(management.info.params) ${JSON.stringify(params)}`);

      const result = await managementService.info(params);
      logger.info(`(management.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 관리 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        state: req.body.state,
        machineCode: req.body.machineCode,
      };
      logger.info(`(management.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await managementService.edit(params);
      logger.info(`(management.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 관리 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(management.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await managementService.delete(params);
      logger.info(`(management.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
