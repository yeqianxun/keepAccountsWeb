module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("houseimg", {
        imgid: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true },
        url: { type: DataTypes.STRING, allowNull: false, comment: "房屋图片" }
    }, {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'houseimg',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}