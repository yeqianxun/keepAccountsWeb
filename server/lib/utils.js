let Crypto = require("crypto");
let util = require("util");
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
    async tokenVerify(token) {
        return await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], jwtSignSecret);
    }
}