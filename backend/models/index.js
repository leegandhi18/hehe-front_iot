const { sequelize } = require('./connection');
const User = require('./user');
const Machine = require('./machine');
const Management = require('./management');
const Item = require('./item');
const EmoHistory = require('./emoHistory');
const MachineHistory = require('./machineHistory');
const Order = require('./order');
const WorkStatus = require('./workStatus');
const TsEdukit = require('./tsEdukit');

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;
db.Machine = Machine;
db.Management = Management;
db.Item = Item;
db.EmoHistory = EmoHistory;
db.MachineHistory = MachineHistory;
db.Order = Order;
db.WorkStatus = WorkStatus;
db.TsEdukit = TsEdukit;

// model init
User.init(sequelize);
Machine.init(sequelize);
Management.init(sequelize);
Item.init(sequelize);
EmoHistory.init(sequelize);
MachineHistory.init(sequelize);
Order.init(sequelize);
WorkStatus.init(sequelize);
// TsEdukit();

// association(관계 생성)
User.associate(db);
Machine.associate(db);
Management.associate(db);
Item.associate(db);
EmoHistory.associate(db);
MachineHistory.associate(db);
Order.associate(db);
WorkStatus.associate(db);

module.exports = db;
