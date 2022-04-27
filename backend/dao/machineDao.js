// const Sequelize = require('sequelize');
const { Machine } = require('../models/index');

// const { Op } = Sequelize;

const dao = {
  selectList() {
    const setQuery = {};
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      Machine.findAndCountAll({
        ...setQuery,
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      Machine.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Machine.findByPk(params.id).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      Machine.update(
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
  updateStatus(params) {
    return new Promise((resolve, reject) => {
      Machine.update(
        params,
        {
          where: { code: params.code },
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
      Machine.destroy({
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
