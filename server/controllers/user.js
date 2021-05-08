let Op = require("sequelize").Op;
const jsonwebtoken = require("jsonwebtoken")
let { UserModel } = require("../model/index.js");
let { MD5Crypto } = require("../lib/utils")
let { jwtSignSecret } = require("../lib/config");


let UserController = {
    async findUserIsExist(ctx) {
        let { username, password } = ctx.request.body;
        if (!username || !password) {
            ctx.body = {
                code: -1,
                status: "faile",
                message: "用户名或密码不存在"
            }
            return
        }
        let result = await UserModel.findOne({
            where: {
                username: {
                    [Op.eq]: username,
                },
                password: MD5Crypto(password)
            }
        });
        return result;
    },
    async getUserInfo(ctx) {
        ctx.body = {
            status: 200,
            data: "获取用户信息"
        }
    },
    async UserLogin(ctx) {
        let result = await UserController.findUserIsExist(ctx);
        if (!result) {
            ctx.body = {
                code: -1,
                status: "fail",
                message: "用户不存在",
                data: null
            }
        } else {
            let value = result.dataValues;
            let signToken = jsonwebtoken.sign(
                { username: value.username, id: result.id }, jwtSignSecret, { expiresIn: 1 * 60 });
            ctx.body = {
                code: 0,
                status: "success",
                message: "登录成功",
                token: signToken,
                userinfo: result
            }
        }
    },
    async UserRegister(ctx) {
        let { username, password } = ctx.request.body
        let result = await UserController.findUserIsExist(ctx);
        if (!result) {
            let saveUser = await UserModel.create({
                username,
                password: MD5Crypto(password),
                usertype: "0",
                active: false
            });
            ctx.body = {
                status: "success",
                code: 0,
                message: "注册成功，请登录"
            }
        } else {
            ctx.body = {
                status: "fail",
                code: -1,
                message: "用户已存在"
            }
        }
    }
}
module.exports = UserController;