const sequelize = require("./sequelize.js");
const { DataTypes } = require('sequelize');
const CityModel = require("./city")(sequelize, DataTypes);
const UserModel = require("./users")(sequelize, DataTypes);
const HouseInfoModel = require("./house-info")(sequelize, DataTypes);
const CityRegionModel = require("./city_region")(sequelize, DataTypes);
const HouseImgModel = require("./houseimg")(sequelize, DataTypes);
const CarouselModel = require("./carousel")(sequelize, DataTypes);
const FollowModel = require("./follows")(sequelize, DataTypes);
//一对多,一个人可以发布多套房源
HouseInfoModel.belongsTo(UserModel)
UserModel.hasMany(HouseInfoModel);

HouseImgModel.belongsTo(HouseInfoModel);
HouseInfoModel.hasMany(HouseImgModel)

CityRegionModel.belongsTo(CityModel);
CityModel.hasMany(CityRegionModel)

//多对多
// HouseInfoModel.belongsToMany(UserModel, {
//     as: 'users', through: FollowModel, foreignKey:
//         'houseid'
// })
// UserModel.belongsToMany(HouseInfoModel, {
//     as: 'houses', through: FollowModel, foreignKey:
//         'userid'
// });

module.exports = {
    UserModel,
    HouseInfoModel,
    CityModel,
    FollowModel,
    CityRegionModel,
    HouseImgModel,
    CarouselModel
}