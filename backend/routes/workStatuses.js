const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const workStatusService = require('../service/workStatusService');

router.route('/')
// 작업상태 list 조회
  .get(async (req, res) => {
    try {
      const result = await workStatusService.list();
      logger.info(`(workStatus.list.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 작업상태 등록
  .post(async (req, res) => {
    try {
      const params = {
        workStatus: req.body.workStatus,
      };
      logger.info(`(workStatus.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.itemName || !params.productQuantity
        || !params.startTime || !params.endTime || !params.name) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await workStatusService.reg(params);
      logger.info(`(workStatus.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/:id')
// 특정 작업상태 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(workStatus.info.params) ${JSON.stringify(params)}`);

      const result = await workStatusService.info(params);
      logger.info(`(workStatus.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 작업상태 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        workStatus: req.body.workStatus,
      };
      logger.info(`(workStatus.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await workStatusService.edit(params);
      logger.info(`(workStatus.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 작업상태 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(workStatus.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await workStatusService.delete(params);
      logger.info(`(workStatus.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
