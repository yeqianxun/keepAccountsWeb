module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define('follows', {
        fid: {
            type: DataTypes.UUID, primaryKey: true, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV1
        },
        houseid: {
            type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV1
        },
        userid: {
            type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV1
        }
    }, {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'follows',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}
