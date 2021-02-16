const sequelize = require('../sequelize ')
const Sequelize = require('sequelize');
let { DataTypes } = Sequelize;
const admin = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  isadmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  unit: {
    type: DataTypes.STRING,
    defaultValue: "λ"
  }
}, { freezeTableName: true })

module.exports = admin