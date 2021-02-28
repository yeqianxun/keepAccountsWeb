const router = require("koa-router")({ "prefix": "" });
// const Admin = require('../controllers/admin');

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: "后台请求首页sss"
  }
})

router.get('/test', async (ctx, next) => {
  ctx.body = {
    message: "后台请求首页ddd"
  }
})

module.exports = router
