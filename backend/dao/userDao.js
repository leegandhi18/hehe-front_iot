const Sequelize = require('sequelize');
const { User } = require('../models/index');

const { Op } = Sequelize;

const dao = {
  selectList(params) {
    const setQuery = {};
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // password 필드 제외
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      User.findByPk(
        params.id,
        {
          attributes: { exclude: ['password'] }, // password 필드 제외
        },
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      User.update(
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
      User.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  idOverlabCheck(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: { name: { [Op.like]: `${params.name}%` } },
        order: [['id', 'DESC']],
        attributes: ['name'],
      })
        .then((idCheckResult) => {
          resolve(idCheckResult);
        }).catch((err) => {
          reject(err);
        });
    });
  },
  login(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'name', 'password', 'phone', 'role'],
        where: { name: params.name },
      })
        .then((idCheckResult) => {
          resolve(idCheckResult);
        }).catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
