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
    async tokenVerify(ctx, next) {
        const { authorization = '' } = ctx.request.header
        let token = ctx.header.authorization;
        try {
            let payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], jwtSignSecret);
            ctx.state.payload = payload;
            console.log("校验中间件---》", payload)
        } catch (e) {
            console.log("err---》", e)
            ctx.throw(401, e.message)
        }
        await next()
    }
}