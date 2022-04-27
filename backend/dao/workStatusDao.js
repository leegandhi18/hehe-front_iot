// const Sequelize = require('sequelize');
const { WorkStatus } = require('../models/index');

// const { Op } = Sequelize;

const dao = {
  selectList() {
    return new Promise((resolve, reject) => {
      WorkStatus.findAndCountAll({
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      WorkStatus.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      WorkStatus.findByPk(params.id).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      WorkStatus.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  delete(params) {
    return new Promise((resolve, reject) => {
      WorkStatus.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
