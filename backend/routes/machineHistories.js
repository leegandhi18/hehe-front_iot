const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const machineHistoryService = require('../service/machineHistoryService');

router.route('/')
// 설비이력 list 조회
  .get(async (req, res) => {
    try {
      const result = await machineHistoryService.list();
      logger.info(`(machineHistory.list.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 설비이력 등록
  .post(async (req, res) => {
    try {
      const params = {
        itemName: req.body.itemName,
        totalQuantity: req.body.totalQuantity,
        goodQuantity: req.body.goodQuantity,
        badQuantity: req.body.badQuantity,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        emoHistory: req.body.emoHistory,
        machineCode: req.body.machineCode,
        workStatus: req.body.workStatus,
        workNum: req.body.workNum,
        name: req.body.name,
      };
      logger.info(`(machineHistory.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.itemName || !params.productQuantity
        || !params.startTime || !params.endTime || !params.name) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await machineHistoryService.reg(params);
      logger.info(`(machineHistory.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/:id')
// 특정 설비이력 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(machineHistory.info.params) ${JSON.stringify(params)}`);

      const result = await machineHistoryService.info(params);
      logger.info(`(machineHistory.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 설비이력 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        workNum: req.body.workNum,
        itemName: req.body.itemName,
        totalQuantity: req.body.totalQuantity,
        goodQuantity: req.body.goodQuantity,
        badQuantity: req.body.badQuantity,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        workStatus: req.body.workStatus,
        name: req.body.name,
        machineCode: req.body.machineCode,
      };
      logger.info(`(machineHistory.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await machineHistoryService.edit(params);
      logger.info(`(machineHistory.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 설비이력 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(machineHistory.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await machineHistoryService.delete(params);
      logger.info(`(machineHistory.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
