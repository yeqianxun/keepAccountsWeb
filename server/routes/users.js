const router = require('koa-router')({ "prefix": "/users" })
let { tokenVerify } = require("../lib/utils")
let UserController = require("../controllers/user")

router.post("/login", UserController.UserLogin);
router.post("/register", UserController.UserRegister);
router.get("/userinfo", UserController.getUserInfo)
module.exports = router;
