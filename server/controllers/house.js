const fs = require("fs");
const path = require("path")
let Op = require("sequelize").Op;
let {
    HouseInfoModel,
    HouseImgModel,
    UserModel
} = require("../model/index.js");
let {
    uploadImages
} = require("../lib/utils")
module.exports = {
    async uploadHouse(ctx) {
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
    async getAllHouseInfo(ctx) {
        let houses = await HouseInfoModel.findAll({
            attributes: ["house_id", "house_type", "desc", "build_date", "floor_level", "layout", "house_square", "address", "house_price"],
            // attributes:{exclude:[]}
            include: [{
                model: HouseImgModel,
                // as: "house_images",
                attributes: ["url"]
            }, {
                model: UserModel,
                attributes: ["avator"]
            }]
        });
        ctx.body = {
            code: 200,
            data: houses,
            message: "所有房屋信息"
        }
    },
    async getHouseDetail(ctx) {
        let houseid = ctx.query.house_id;
        let houseInfo = await HouseInfoModel.findOne({
            where: {
                house_id: houseid,
            },
            include: [{
                model: HouseImgModel,
            }]
        })
        ctx.body = {
            code: 200,
            data: houseInfo,
            message: "获取房屋详情"
        }
    },
    async getMyHouse(ctx, next) {
        let { uid } = ctx.state.payload;
        let myhouse = await HouseInfoModel.findAll({
            where: {
                userUid: uid
            },
            include: [{
                model: HouseImgModel
            }]
        });
        if (myhouse) {
            ctx.body = {
                code: 200,
                data: myhouse,
                message: "查询登录用的的房屋列表"
            }
        } else {
            ctx.body = {
                code: -1,
                data: [],
                message: "房屋查询失败"
            }
        }



    }
}