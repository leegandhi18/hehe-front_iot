// const Sequelize = require('sequelize');
const { Order } = require('../models/index');

// const { Op } = Sequelize;

const dao = {
  selectList() {
    return new Promise((resolve, reject) => {
      Order.findAndCountAll({
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      Order.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectWorkingList() {
    const setQuery = {};
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      Order.findAndCountAll({
        ...setQuery,
        where: { workStatus: '0' },
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectBeforeWorkingList() {
    const setQuery = {};
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      Order.findAndCountAll({
        ...setQuery,
        where: { workStatus: '1' },
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Order.findByPk(params.id).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      Order.update(
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
      Order.destroy({
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
