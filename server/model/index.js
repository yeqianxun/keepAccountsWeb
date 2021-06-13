const sequelize = require("./sequelize.js");
const { DataTypes } = require('sequelize');
const CityModel = require("./city")(sequelize, DataTypes);
const UserModel = require("./users")(sequelize, DataTypes);
const HouseInfoModel = require("./house-info")(sequelize, DataTypes);
const HouseLabelModel = require("./house-label")(sequelize, DataTypes)
const CityRegionModel = require("./city_region")(sequelize, DataTypes);
const HouseImgModel = require("./houseimg")(sequelize, DataTypes);
const CarouselModel = require("./carousel")(sequelize, DataTypes);

//一对多
HouseInfoModel.belongsTo(UserModel)
UserModel.hasMany(HouseInfoModel);

CityRegionModel.belongsTo(CityModel);
CityModel.hasMany(CityRegionModel)

HouseImgModel.belongsTo(HouseInfoModel);
HouseInfoModel.hasMany(HouseImgModel)

//多对多
HouseInfoModel.belongsToMany(HouseLabelModel, { through: "housetag" })
HouseLabelModel.belongsToMany(HouseInfoModel, { through: "housetag" });

module.exports = {
    UserModel,
    HouseInfoModel,
    HouseLabelModel,
    CityModel,
    CityRegionModel,
    HouseImgModel,
    CarouselModel
}