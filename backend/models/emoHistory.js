const Sequelize = require('sequelize');

module.exports = class EmoHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      workNum: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      time: {
        type: Sequelize.DATE,
      },
      workStatus: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(30),
      },
      machineCode: {
        type: Sequelize.STRING(30),
      },
      description: {
        type: Sequelize.TEXT,
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
    db.EmoHistory.belongsTo(db.Order, { foreignKey: 'workNum', targetKey: 'id' });
    db.EmoHistory.belongsTo(db.User, { foreignKey: 'name', targetKey: 'name' });
    db.EmoHistory.belongsTo(db.Machine, { foreignKey: 'machineCode', targetKey: 'code' });
  }
};
