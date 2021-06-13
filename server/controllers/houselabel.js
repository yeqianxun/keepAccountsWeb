const { CityModel, CityRegionModel } = require("../model/index");

let LabelController = {
    async getHouseLabel(ctx, next) {
        let cities = await CityModel.findAll({
            // attributes: ["cityname"],
            include: [{
                model: CityRegionModel,
                as: "cityregions",
                // attributes: ["region_name"]
            }]
        });
        ctx.body = {
            code: 200,
            message: "获取所有城市成功",
            data: {
                cities
            }
        }
        return
    }
}
module.exports = LabelController