module.exports = function (Sequelize, DataTypes) {
  return Sequelize.define('users', {
    uid: {
      type: DataTypes.UUID, primaryKey: true, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV1
    },
    avator: { type: DataTypes.STRING, allowNull: true, defaultValue: "", comment: "用户头像" },
    username: { type: DataTypes.STRING, allowNull: false, comment: '用户名' },
    password: { type: DataTypes.STRING, allowNull: false, comment: '用户密码' },
    sex: { type: DataTypes.STRING, allowNull: true, comment: '性别' },
    mobile: { type: DataTypes.STRING, allowNull: true, comment: '手机号码' },
    email: { type: DataTypes.STRING, allowNull: true, comment: '邮箱' },
    usertype: { type: DataTypes.STRING, allowNull: true, defaultValue: "0", comment: "用户类型" },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, comment: '是否接受消息' }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'users',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
}
