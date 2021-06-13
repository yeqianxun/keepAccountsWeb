let Crypto = require("crypto");
let util = require("util");
const path = require('path');
const fs = require('fs');
const jsonwebtoken = require("jsonwebtoken");
let { jwtSignSecret } = require("../lib/config");

module.exports = {
    MD5Crypto(str) {
        // 签名对象
        // let obj = crypto.createHash('md5');
        // // 加密数据
        // obj.update('12345');
        // // 以十六进制返回结果
        // let str = obj.digest('hex');
        return Crypto.createHash("md5").update(str).digest("hex");
    },
    async tokenVerify(ctx, next) {
        let token = ctx.header.authorization;
        try {
            let payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], jwtSignSecret);
            ctx.state.payload = payload;
        } catch (e) {
            ctx.throw(401, e.message)
        }
        await next()
    },
    getUploadDirName() {
        const date = new Date();
        let month = Number.parseInt(date.getMonth()) + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        const dir = `${date.getFullYear()}${month}${date.getDate()}`;
        return dir;
    },
    checkDirExist(p) {
        if (!fs.existsSync(p)) {
            fs.mkdir(p, 0777, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }
    },
    mkdirs(dirname, callback) {
        fs.exists(dirname, function (exists) {
            if (exists) {
                callback();
            } else {
                mkdirs(path.dirname(dirname), function () {
                    fs.mkdir(dirname, callback);
                    console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
                });
            }
        });
    },
    getUploadFileExt(name) {
        let ext = name.split('.');
        return ext[ext.length - 1];
    },
    

}