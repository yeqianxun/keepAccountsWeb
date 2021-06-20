const router = require("koa-router")({ "prefix": "/" });
const adminController = require("../controllers/admin");

router.get('getCarouselText', adminController.getCarouselText)
    //   .get("socket.io", adminController.socketLongPolling);
module.exports = router
