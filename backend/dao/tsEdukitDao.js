const { TsEdukit } = require('../models/index');

const TsEdukitQuery = new TsEdukit();
TsEdukitQuery.useDatabase();

const dao = {
  selectCount(params) {
    return new Promise((resolve, reject) => {
      TsEdukitQuery
        .query('select No1Count, No2Count, No3Count from plcdata order by DESC limit 1')
        // .query('select No1Count, No2Count, No3Count, No2Mode, DiceComparisonValue from plcdata order by DESC limit 1')
        .then((selectList) => {
          resolve(selectList);
        }).catch((err) => {
          reject(err);
        });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      TsEdukitQuery.writePoints([
        {
          measurement: 'plcdata',
          tags: params.tags,
          fields: params.fields,
        },
      ], { precision: 's' })
        .then((inserted) => {
          resolve(inserted);
        }).catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
