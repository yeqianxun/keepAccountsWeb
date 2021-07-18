const router = require("koa-router")({
    "prefix": "/house"
});
const HouseController = require("../controllers/house");
let {
    tokenVerify
} = require("../lib/utils");


router.post('/uploadHouse', tokenVerify, HouseController.uploadHouse);
router.get('/getAllHouseInfo', tokenVerify, HouseController.getAllHouseInfo);
router.get("/getHouseDetail", tokenVerify, HouseController.getHouseDetail);
router.get("/getMyHouse", tokenVerify, HouseController.getMyHouse);
router.get("/followHouse", tokenVerify, HouseController.followHouse)
router.get("/getHouseFollows", tokenVerify, HouseController.getHouseFollows)
module.exports = router