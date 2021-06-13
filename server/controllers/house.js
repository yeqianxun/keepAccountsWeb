
const fs = require("fs");
const path = require("path")
let Op = require("sequelize").Op;
let { HouseInfoModel, HouseImgModel } = require("../model/index.js");
let { checkDirExist, getUploadFileExt } = require("../lib/utils")
module.exports = {
    async uploadHouse(ctx, next) {
        let files = ctx.request.files;
        let formData = ctx.request.body;
        formData.userUid = ctx.state.payload.uid;
        let houseInfoItem = await HouseInfoModel.create(formData);

        let houseItem = houseInfoItem.dataValues;
        let houseImgUploadPath = path.join(__dirname, "..", "public/house_image/");
        checkDirExist(houseImgUploadPath);
        if (files.files.length) {
            for (let k = 0; k < files.files.length; k++) {
                let _localFilePath = files.files[k].path;
                let _basename = path.basename(_localFilePath);
                let reader = fs.createReadStream(_localFilePath);
                let writer = fs.createWriteStream(houseImgUploadPath + `${houseItem.house_id}.${getUploadFileExt(_basename)}`);
                reader.pipe(writer);

                let saveImgHouse = await HouseImgModel.create({
                    url: `${ctx.origin}/house_image/${houseItem.house_id}.${getUploadFileExt(_basename)}`,
                    houseinfoHouseId: houseItem.house_id
                });
            }
        }

        ctx.body = {
            code: 200,
            data: []
        }
    }
}