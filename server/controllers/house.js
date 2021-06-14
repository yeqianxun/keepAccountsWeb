
const fs = require("fs");
const path = require("path")
let Op = require("sequelize").Op;
let { HouseInfoModel, HouseImgModel } = require("../model/index.js");
let { uploadImages } = require("../lib/utils")
module.exports = {
    async uploadHouse(ctx, next) {
        let files = ctx.request.files;
        let formData = ctx.request.body;
        formData.userUid = ctx.state.payload.uid;
        let houseInfoItem = await HouseInfoModel.create(formData);
        let houseItem = houseInfoItem.dataValues;

        if (files.files.length) {
            for (let k = 0; k < files.files.length; k++) {
                let _localFilePath = files.files[k].path;
                let houseImg = await uploadImages(ctx, _localFilePath, houseItem)
            }
        } else {
            if (files.files.path) {
                let houseImg = await uploadImages(ctx, files.files.path, houseItem)
            }
        }
        ctx.body = {
            code: 200,
            data: [],
            message: "上传房屋信息成功"
        }
    },
    async getAllHouseInfo(ctx, next) {
        let houses = await HouseInfoModel.findAll({
            // attributes: ["cityname"],
            include: [{
                model: HouseImgModel,
                // as: "house_images",
                // attributes: ["region_name"]
            }]
        });
        ctx.body = {
            code: 200,
            data: houses,
            message: "所有房屋信息"
        }
    }
}