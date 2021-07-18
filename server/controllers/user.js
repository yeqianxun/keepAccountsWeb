let Op = require("sequelize").Op;
const fs = require("fs");
const path = require("path")
const jsonwebtoken = require("jsonwebtoken")
let {
    UserModel, FollowModel
} = require("../model/index.js");
let {
    MD5Crypto,
    checkDirExist,
    getUploadFileExt
} = require("../lib/utils")
let {
    jwtSignSecret
} = require("../lib/config");


let UserController = {
    async findUserIsExist(ctx) {
        ctx.verifyParams({
            username: {
                type: "string",
                required: true,
                allowEmpty: false
            },
            password: {
                type: "string",
                required: true,
                allowEmpty: false
            }
        })
        let {
            username,
            password
        } = ctx.request.body;
        if (!username || !password) {
            ctx.body = {
                code: -1,
                status: "fail",
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
        let {
            uid
        } = ctx.state.payload;
        let userInfo = await UserModel.findOne({
            attributes: ["avator", "username","uid", "email", "mobile", "active"],
            where: {
                uid: {
                    [Op.eq]: uid
                }
            },
        })
        ctx.body = {
            status: 200,
            message: "获取用户信息",
            data: userInfo
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
            let signToken = jsonwebtoken.sign({
                username: value.username,
                uid: value.uid
            }, jwtSignSecret, {
                expiresIn: "1h"
            });
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
        let {
            username,
            password
        } = ctx.request.body
        let result = await UserController.findUserIsExist(ctx);
        if (!result) {
            let saveUser = await UserModel.create({
                username,
                password: MD5Crypto(password),
                usertype: "0",
                active: false
            });
            if (saveUser) {
                ctx.body = {
                    status: "success",
                    code: 0,
                    message: "注册成功，请登录"
                }
            } else {
                ctx.body = {
                    status: "fail",
                    code: 0,
                    message: "注册失败，请重新注册"
                }
            }
        } else {
            ctx.body = {
                status: "fail",
                code: -1,
                message: "用户已存在"
            }
        }
    },
    // https://segmentfault.com/a/1190000021996824
    async uploadAvator(ctx) {
        if (ctx.request.files) {
            let {
                uid
            } = ctx.state.payload;
            let _filePath = ctx.request.files.file.path
            const basename = path.basename(_filePath);
            const avatorUploadDir = path.join(__dirname, "..", `public/avator/`)
            checkDirExist(avatorUploadDir);
            try {
                let reader = fs.createReadStream(_filePath);
                let writer = fs.createWriteStream(avatorUploadDir + `${uid}.${getUploadFileExt(basename)}`);
                reader.pipe(writer);
                const remotePath = `${ctx.origin}/avator/${uid}.${getUploadFileExt(basename)}`;
                let result = await UserModel.update({
                    avator: remotePath
                }, {
                    where: {
                        uid: uid
                    }
                });
                ctx.body = {
                    code: 200,
                    data: remotePath,
                    message: "成功"
                }
                fs.unlinkSync(_filePath);
            } catch (err) {
                console.error("erro------", err)
            }
        }
    },
    async updateUserInfo(ctx) {
        let {
            uid
        } = ctx.state.payload;
        let {
            username,
            email,
            mobile,
            active
        } = ctx.request.body;
        let result = await UserModel.update({
            username,
            email,
            mobile,
            active
        }, {
            where: {
                uid: uid
            }
        });
        ctx.body = {
            code: 200,
            message: "更新用户系信息成功",
            data: []
        }
    }
}
module.exports = UserController;