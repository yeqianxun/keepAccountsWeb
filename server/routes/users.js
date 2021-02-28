const router = require('koa-router')({ "prefix": "/users" })

router.post("/login", async (ctx, next) => {
  let data = ctx.request.body;
  ctx.body = {
    status: "success",
    message: "登录成功",
    token: data.name
  }
});
module.exports = router;
