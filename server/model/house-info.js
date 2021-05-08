module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("houseinfo", {
        houseid: { type: DataTypes.BIGINT(11), primarykey: true, allowNull: false, unique: true, comment: "房屋id" },
        address: { type: DataTypes.STRING, allowNull: false, comment: "房屋住址" },
        label: { type: DataTypes.STRING, allowNull: true, comment: "房屋标签" },
        houseimg: { type: DataTypes.STRING, allowNull: false, comment: "房屋图片" }
    }, {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'houseinfo',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}