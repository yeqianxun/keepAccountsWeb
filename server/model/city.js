module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("cities", {
        cid: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true },
        cityname: { type: DataTypes.STRING, allowNull: false, comment: "城市名称" }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'cities',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}