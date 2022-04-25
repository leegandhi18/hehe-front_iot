const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const orderService = require('../service/orderService');

router.route('/')
// 작업현황 list 조회 - 사용할 일 없을듯
  .get(async (req, res) => {
    try {
      const result = await orderService.list();
      logger.info(`(order.list.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 작업지시서 등록
  .post(async (req, res) => {
    try {
      const params = {
        productQuantity: req.body.productQuantity,
        startTime: req.body.startTime,
        name: req.body.name,
        itemName: req.body.itemName,
        machineCode: req.body.machineCode,
        workStatus: req.body.workStatus,
      };
      logger.info(`(order.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.itemName || !params.productQuantity
        || !params.startTime || !params.endTime || !params.name) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await orderService.reg(params);
      logger.info(`(order.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/beforeWorking')
// 작업 전 list 조회
  .get(async (req, res) => {
    try {
      const result = await orderService.beforeWorkingList();
      logger.info(`(order.beforeWorkingList.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  });
router.route('/working')
// 작업 중 list 조회
  .get(async (req, res) => {
    try {
      const result = await orderService.selectBeforeWorkingList();
      logger.info(`(order.selectBeforeWorkingList.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  });
router.route('/:id')
// 특정 작업지시서 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(order.info.params) ${JSON.stringify(params)}`);

      const result = await orderService.info(params);
      logger.info(`(order.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 작업지시서 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        productQuantity: req.body.productQuantity,
        startTime: req.body.startTime,
        name: req.body.name,
        itemName: req.body.itemName,
        machineCode: req.body.machineCode,
        workStatus: req.body.workStatus,
      };
      logger.info(`(order.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await orderService.edit(params);
      logger.info(`(order.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 작업지시서 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(order.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await orderService.delete(params);
      logger.info(`(order.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
