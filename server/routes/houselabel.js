const router = require("koa-router")({ "prefix": "/label" });
const LabelController = require("../controllers/houselabel");

router.get("/house-label", LabelController.getHouseLabel);
module.exports = router