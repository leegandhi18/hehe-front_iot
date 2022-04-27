const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const emoHistoryService = require('../service/emoHistoryService');

router.route('/')
// 중단이력 list 조회
  .get(async (req, res) => {
    try {
      const result = await emoHistoryService.list();
      logger.info(`(emoHistory.list.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 중단이력 등록
  .post(async (req, res) => {
    try {
      const params = {
        workNum: req.body.workNum,
        time: req.body.time,
        workStatus: req.body.workStatus,
        name: req.body.name,
        machineCode: req.body.machineCode,
        description: req.body.description,
      };
      logger.info(`(emoHistory.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.itemName || !params.productQuantity
        || !params.startTime || !params.endTime || !params.name) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await emoHistoryService.reg(params);
      logger.info(`(emoHistory.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/:workNum')
// 특정 중단이력 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        workNum: req.params.workNum,
      };
      logger.info(`(emoHistory.info.params) ${JSON.stringify(params)}`);

      const result = await emoHistoryService.info(params);
      logger.info(`(emoHistory.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 중단이력 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        workNum: req.body.workNum,
        time: req.body.time,
        workStatus: req.body.workStatus,
        name: req.body.name,
        machineCode: req.body.machineCode,
      };
      logger.info(`(emoHistory.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await emoHistoryService.edit(params);
      logger.info(`(emoHistory.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 중단이력 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(emoHistory.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await emoHistoryService.delete(params);
      logger.info(`(emoHistory.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
