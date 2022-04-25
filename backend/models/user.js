const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(300),
      },
      role: {
        type: Sequelize.STRING(200),
      },
      phone: {
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
    db.User.hasMany(db.EmoHistory, { foreignKey: 'name', sourceKey: 'name' });
    db.User.hasMany(db.Order, { foreignKey: 'name', sourceKey: 'name' });
    db.User.hasMany(db.MachineHistory, { foreignKey: 'name', sourceKey: 'name' });
  }
};
