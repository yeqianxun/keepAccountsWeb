const router = require("koa-router")({ "prefix": "" });
const adminController = require("../controllers/admin");

router.get('/getCarouselText', adminController.getCarouselText);
module.exports = router
