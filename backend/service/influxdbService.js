// const now = require('performance-now');
// const logger = require('../lib/logger');
// // const influxdbDao = require('../dao/influxdbDao');
// const tsEdukitDao = require('../dao/tsEdukitDao');
// const mqttUtil = require('../lib/mqttUtil');

// const service = {
//   // influxdb data list 조회
//   async list() {
//     let result = null;

//     try {
//       result = await tsEdukitDao.selectList();
//       logger.debug(`(influxdbService.list) ${JSON.stringify(result)}`);
//     } catch (err) {
//       logger.error(`(influxdbService.list) ${err.toString()}`);
//       return new Promise((resolve, reject) => {
//         reject(err);
//       });
//     }

//     return new Promise((resolve) => {
//       resolve(result);
//     });
//   },
//   // plc data 입력
//   async reg(topic, message) {
//     let inserted = null;
//     let processed = null;

//     const start = now();
//     console.log(start.toFixed(3));
//     try {
//       processed = await mqttUtil.mqttSubscribe(topic, message);
//       logger.debug(`(influxdbService.mqttSubscribe) ${JSON.stringify(processed)}`);
//     } catch (err) {
//       logger.error(`(influxdbService.mqttSubscribe) ${err.toString()}`);
//       return new Promise((resolve, reject) => {
//         reject(err);
//       });
//     }
//     const end = now();
//     console.log(end.toFixed(3)); // the number of milliseconds the current node process is running
//     console.log('성능테스트: ', end - start);
//     console.log('성능테스트: ', (end - start).toFixed(3), '밀리초');

//     try {
//       inserted = await tsEdukitDao.insert(processed);
//       logger.debug(`(influxdbService.reg) ${JSON.stringify(inserted)}`);
//     } catch (err) {
//       logger.error(`(influxdbService.reg) ${err.toString()}`);
//       return new Promise((resolve, reject) => {
//         reject(err);
//       });
//     }

//     return new Promise((resolve) => {
//       // resolve(inserted);
//       resolve(processed);
//     });
//   },
// };

// module.exports = service;
