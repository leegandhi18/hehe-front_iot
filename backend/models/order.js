const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      productQuantity: {
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.DATE,
      },
      endTime: {
        type: Sequelize.DATE,
      },
      name: {
        type: Sequelize.STRING(30),
      },
      itemName: {
        type: Sequelize.STRING(30),
      },
      machineCode: {
        type: Sequelize.STRING(30),
      },
      workStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    db.Order.hasMany(db.EmoHistory, { foreignKey: 'workNum', sourceKey: 'id' });
    db.Order.hasMany(db.MachineHistory, { foreignKey: 'workNum', sourceKey: 'id' });
    db.Order.belongsTo(db.User, { foreignKey: 'name', targetKey: 'name' });
    db.Order.belongsTo(db.Item, { foreignKey: 'itemName', targetKey: 'name' });
    db.Order.belongsTo(db.Machine, { foreignKey: 'machineCode', targetKey: 'code' });
    db.Order.belongsTo(db.WorkStatus, { foreignKey: 'workStatus', targetKey: 'workStatus' });
  }
};
