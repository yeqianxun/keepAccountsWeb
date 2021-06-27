const router = require("koa-router")({
    "prefix": "/house"
});
const HouseController = require("../controllers/house");
let {
    tokenVerify
} = require("../lib/utils")

router.post('/uploadHouse', tokenVerify, HouseController.uploadHouse);
router.get('/getAllHouseInfo', tokenVerify, HouseController.getAllHouseInfo);
router.get("/getHouseDetail", tokenVerify, HouseController.getHouseDetail);
router.get("/getMyHouse", tokenVerify, HouseController.getMyHouse)
module.exports = router