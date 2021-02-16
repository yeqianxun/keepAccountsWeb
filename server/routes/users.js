const router = require('koa-router')({ "prefix": "/users" })


router.get('', function (ctx, next) {
  ctx.body = 'this is a users response!'
});
module.exports = router;
