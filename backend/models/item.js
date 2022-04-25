const Sequelize = require('sequelize');

module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      itemId: {
        type: Sequelize.STRING(30),
      },
      machineCode: {
        type: Sequelize.STRING(30),
      },
      No2Mode: {
        type: Sequelize.INTEGER,
      },
      DiceComparisonValue: {
        type: Sequelize.INTEGER,
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
    db.Item.hasMany(db.Order, { foreignKey: 'itemName', sourceKey: 'name' });
    db.Item.belongsTo(db.Machine, { foreignKey: 'machineCode', targetKey: 'code' });
  }
};
