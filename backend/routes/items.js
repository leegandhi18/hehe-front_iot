const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const itemService = require('../service/itemService');

router.route('/')
// 품목 list 조회
  .get(async (req, res) => {
    try {
      const result = await itemService.list();
      logger.info(`(item.list.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err0: err.toString() });
    }
  })
  // 품목 등록
  .post(async (req, res) => {
    try {
      const params = {
        name: req.body.name,
        quantity: req.body.quantity,
        itemId: req.body.itemId,
        machineCode: req.body.machineCode,
        No2Mode: req.body.No2Mode,
        DiceComparisonValue: req.body.DiceComparisonValue,
      };
      logger.info(`(item.reg.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.itemName || !params.productQuantity
        || !params.startTime || !params.endTime || !params.name) {
        const err = new Error('Not allowed null (Id, Password, Name, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await itemService.reg(params);
      logger.info(`(item.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/quantityUpdate')
// 특정 품목 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        name: req.body.itemName,
        No2Mode: req.body.No2Mode,
        DiceComparisonValue: req.body.DiceComparisonValue,
      };
      logger.info(`(item.quantityEdit.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await itemService.quantityEdit(params);
      logger.info(`(item.quantityEdit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });
router.route('/product/:name')
// 특정 품목 조회
  .get(async (req, res) => {
    try {
      const params = {
        name: req.params.name,
      };
      logger.info(`(itemProduct.info.params) ${JSON.stringify(params)}`);

      const result = await itemService.itemInfo(params);
      logger.info(`(itemProduct.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  });
router.route('/:id')
// 특정 품목 조회
  .get(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(item.info.params) ${JSON.stringify(params)}`);

      const result = await itemService.info(params);
      logger.info(`(item.info.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  })
  // 특정 품목 수정
  .put(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
        name: req.body.name,
        quantity: req.body.quantity,
        itemId: req.body.itemId,
        machineCode: req.body.machineCode,
        No2Mode: req.body.No2Mode,
        DiceComparisonValue: req.body.DiceComparisonValue,
      };
      logger.info(`(item.edit.params) ${JSON.stringify(params)}`);

      // 입력값 null 체크
      /* if (!params.password || !params.role) {
        const err = new Error('Not allowed null (Password, Role)');
        logger.error(err.toString());

        res.status(500).json({ err1: err.toString() });
      } */

      // 비즈니스 로직 호출
      const result = await itemService.edit(params);
      logger.info(`(item.edit.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  })
  // 특정 품목 삭제
  .delete(async (req, res) => {
    try {
      const params = {
        id: req.params.id,
      };
      logger.info(`(item.delete.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await itemService.delete(params);
      logger.info(`(item.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err2: err.toString() });
    }
  });

module.exports = router;
