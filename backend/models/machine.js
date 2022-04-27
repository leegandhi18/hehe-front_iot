const Sequelize = require('sequelize');

module.exports = class Machine extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      code: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      status: {
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
    db.Machine.hasMany(db.EmoHistory, { foreignKey: 'machineCode', sourceKey: 'code' });
    db.Machine.hasMany(db.MachineHistory, { foreignKey: 'machineCode', sourceKey: 'code' });
    db.Machine.hasMany(db.Management, { foreignKey: 'machineCode', sourceKey: 'code' });
    db.Machine.hasMany(db.Item, { foreignKey: 'machineCode', sourceKey: 'code' });
    db.Machine.hasMany(db.Order, { foreignKey: 'machineCode', sourceKey: 'code' });
  }
};
