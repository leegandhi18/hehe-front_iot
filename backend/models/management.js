const Sequelize = require('sequelize');

module.exports = class Management extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      state: {
        type: Sequelize.INTEGER,
      },
      machineCode: {
        type: Sequelize.STRING(30),
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(db) {
    db.Management.belongsTo(db.Machine, { foreignKey: 'machineCode', targetKey: 'code' });
  }
};
