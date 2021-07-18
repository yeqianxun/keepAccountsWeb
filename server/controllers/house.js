let Op = require("sequelize").Op;
let {
    HouseInfoModel,
    HouseImgModel,
    UserModel,
    FollowModel
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
                await uploadImages(ctx, _localFilePath, houseItem)
            }
        } else {
            if (files.files.path) {
                await uploadImages(ctx, files.files.path, houseItem)
            }
        }
        ctx.body = {
            code: 200,
            data: [],
            message: "上传房屋信息成功"
        }
    },
    async getAllHouseInfo(ctx) {
        let { sortby, ascOrDesc } = ctx.query
        let houses = await HouseInfoModel.findAll({
            attributes: ["house_id", "house_type", "created_at", "desc", "build_date", "floor_level", "layout", "house_square", "address", "house_price"],
            // attributes:{exclude:[]}
            order: [[sortby, ascOrDesc]],
            include: [{
                model: HouseImgModel,
                // as: "house_images",
                attributes: ["url"]
            }, {
                model: UserModel,
                attributes: ["avator"]
            }],
            where: {

            }
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
    async getMyHouse(ctx) {
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
    },
    async followHouse(ctx) {
        let data = {
            houseid: ctx.query.house_id,
            userid: ctx.state.payload.uid
        }
        let followed = ctx.query.follow
        let message = ""
        if (followed > 0) {
            let res = await FollowModel.create(data);
            if (res) { message = "关注成功" }
        } else {
            let res = await FollowModel.destroy({
                where: {
                    houseid: ctx.query.house_id,
                    userid: ctx.state.payload.uid
                }
            });
            console.log("取消", res, data)
            if (res) { message = "取消关注" }
        }
        ctx.body = {
            code: 200, message
        }
    },
    async getHouseFollows(ctx) {
        let { house_id, by } = ctx.query;
        let uid = ctx.state.payload.uid;
        let obj = Object.assign({}, by == "house_id" ? {
            houseid: house_id
        } : {
            userid: uid
        })
        let houselist = await FollowModel.findAll({
            where: obj,
            // attributes: ["userid"]
        });
        if (houselist) {
            ctx.body = {
                code: 200,
                data: houselist,
                message: "根据房屋by找关注的房屋"
            }
        }
    }
}