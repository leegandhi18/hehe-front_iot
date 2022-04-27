// influx calss 를 사용하는 다른 예
// const Influx = require('influx');
// const influxConfig = require('../config/influxConfig');
// const models = require('../models/index');

// const influx = new Influx.InfluxDB(influxConfig);
// // eslint-disable-next-line new-cap
// const influxModels = new models.influx();
// influxModels.useDatabase();

// const dao = {
//   /* selectList() {
//     return new Promise((resolve, reject) => {
//       influx
//         .query('select')
//         .then((selectList) => {
//           resolve(selectList);
//         }).catch((err) => {
//           reject(err);
//         });
//     });
//   }, */
//   insert(params) {
//     return new Promise((resolve, reject) => {
//       influx.writePoints([
//         {
//           measurement: 'plcdata',
//           tags: params.tags,
//           fields: params.fields,
//         },
//       ], { precision: 's' })
//         .then((inserted) => {
//           resolve(inserted);
//         }).catch((err) => {
//           reject(err);
//         });
//     });
//   },
// };

// module.exports = dao;
