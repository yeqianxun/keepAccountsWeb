const router = require("koa-router")({ "prefix": "/house" });
const HouseController = require("../controllers/house");
let { tokenVerify } = require("../lib/utils")

router.post('/uploadHouse', tokenVerify, HouseController.uploadHouse);
module.exports = router
