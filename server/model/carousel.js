module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("carousel", {
        carousel_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true },
        carousel_text: { type: DataTypes.STRING, allowNull: false, comment: "首页轮播文字" },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'carousel',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}