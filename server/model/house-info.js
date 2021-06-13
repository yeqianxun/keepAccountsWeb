module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define("houseinfo", {
        house_id: {
            type: DataTypes.UUID, primaryKey: true, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV1
        },
        address: { type: DataTypes.STRING, allowNull: false, comment: "房屋住址" },
        label: { type: DataTypes.STRING, allowNull: true, comment: "房屋标签" },
        houseimg: { type: DataTypes.STRING, allowNull: true, comment: "房屋图片" },
        layout: { type: DataTypes.STRING, allowNull: false, comment: "房屋布局" },
        house_price: { type: DataTypes.STRING, allowNull: false, defaultValue: "1500", comment: "价格" },
        house_type: { type: DataTypes.STRING, allowNull: false, defaultValue: "合租" },
        house_square: { type: DataTypes.STRING, allowNull: false, comment: "房屋面积" },
        floor_level: { type: DataTypes.STRING, allowNull: false, comment: "楼层" },
        build_date: { type: DataTypes.STRING, allowNull: true, defaultValue: "1977", comment: "房屋搭建日期" },
    }, {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'houseinfo',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}