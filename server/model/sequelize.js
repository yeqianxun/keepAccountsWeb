// https://blog.csdn.net/qq_27970999/article/details/89856966
const Sequelize = require('sequelize');
let { SqlConfig } = require("../lib/config");
const sequelize = new Sequelize(SqlConfig.DBName, SqlConfig.DBOwner, SqlConfig.DBPwd, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......');
  })
  .catch(err => {
    console.error('链接失败:', err);
  });

// 根据模型自动创建表
sequelize.sync({
  logging: console.log
})

module.exports = sequelize