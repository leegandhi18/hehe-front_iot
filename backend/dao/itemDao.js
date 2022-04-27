const Sequelize = require('sequelize');
const { Item } = require('../models/index');

// const { Op } = Sequelize;

const dao = {
  selectList() {
    const setQuery = {};
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Item.findAndCountAll({
        ...setQuery,
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectQuantity(params) {
    const setQuery = {};
    setQuery.order = [['machineCode', 'ASC']];
    return new Promise((resolve, reject) => {
      Item.findAndCountAll({
        ...setQuery,
        attributes: { include: ['name', 'quantity'] },
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  updateQuantity(name, quantity) {
    return new Promise((resolve, reject) => {
      Item.update(
        {
          quantity,
        },
        {
          where: { name },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      Item.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Item.findByPk(params.id).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 작업 시작 버튼 누르면 해당 완제품 내용 조회
  selectItemInfo(params) {
    return new Promise((resolve, reject) => {
      Item.findOne({
        where: { name: params.name },
        order: [['id', 'DESC']],
        attributes: ['name', 'No2Mode', 'DiceComparisonValue'],
      }).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      Item.update(
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
      Item.destroy({
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
