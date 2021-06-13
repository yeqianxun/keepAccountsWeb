module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("houselabel", {
        label_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV1 },
        label_name: { type: DataTypes.STRING, allowNull: false, comment: "标签名" }
    }, {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'houselabel',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}