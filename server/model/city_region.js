module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("cityregions", {
        regionid: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true },
        region_name: { type: DataTypes.STRING, allowNull: false, comment: "城市区域名称" },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'cityregions',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}