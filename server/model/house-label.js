module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("houselabel", {
        labelid: { type: DataTypes.BIGINT(11), primarykey: true, allowNull: false, unique: true, comment: "房屋id" },
        labelname: { type: DataTypes.STRING, allowNull: false, comment: "标签名" }
    }, {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'houselabel',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}