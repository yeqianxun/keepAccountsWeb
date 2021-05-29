const sequelize = require("./sequelize.js");
const { DataTypes } = require('sequelize');
const UserModel = require("./users.js")(sequelize, DataTypes);
const HouseInfoModel = require("./house-info.js")(sequelize, DataTypes);
const HouseLabelModel = require("./house-label.js")(sequelize, DataTypes)
const CityModel = require("./city.js")(sequelize, DataTypes);
const CityRegionModel = require("./city_region.js")(sequelize, DataTypes)

//一对多
HouseInfoModel.belongsTo(UserModel)
UserModel.hasMany(HouseInfoModel);
CityRegionModel.belongsTo(CityModel);
CityModel.hasMany(CityRegionModel)


//多对多
HouseInfoModel.belongsToMany(HouseLabelModel, { through: "housetag" })
HouseLabelModel.belongsToMany(HouseInfoModel, { through: "housetag" });

let Model = {
    UserModel,
    HouseInfoModel,
    HouseLabelModel,
    CityModel,
    CityRegionModel
}
module.exports = Model