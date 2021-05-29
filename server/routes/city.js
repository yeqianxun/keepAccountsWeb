const router = require("koa-router")({ "prefix": "/city" });
const CityController = require("../controllers/city");

router.get("/allCity", CityController.getAllCity);
module.exports = router