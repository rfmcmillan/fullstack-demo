const conn = require('./conn');
const { DataTypes } = conn.Sequelize;

const User = conn.define('user', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = User;
