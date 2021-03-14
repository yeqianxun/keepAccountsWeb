let Op = require("sequelize").Op;
const jsonwebtoken = require("jsonwebtoken")
let UserModel = require("../model/users");
let { MD5Crypto } = require("../lib/utils")
let { jwtSignSecret } = require("../lib/config");
let UserController = {
    async findUserIsExist(ctx) {
        let { username, password } = ctx.request.body;
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
        console.log("state===>0", ctx.state)
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
            console.log("登录====》", result.dataValues.username);
            let value = result.dataValues;
            let signToken = jsonwebtoken.sign(
                { username: value.username, id: result.id },  // 加密userToken
                jwtSignSecret,
                { expiresIn: '1h' });
            console.log("sing====>0", signToken)
            ctx.body = {
                code: 0,
                status: "success",
                message: "登录成功",
                token: signToken
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
                isadmin: username == "admin" ? true : false,
                unit: "λ"
            });
            console.log("创建结果", saveUser)
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