const Koa = require('koa')
const Cors = require("koa2-cors");
const json = require('koa-json')
const onerror = require('koa-onerror')
const KoaBody = require('koa-body')
const logger = require('koa-logger')
const koajwt = require("koa-jwt");
let { jwtSignSecret } = require("./lib/config");
let { tokenVerify } = require("./lib/utils")
const InitRoute = require("./lib/index");

const app = new Koa();
require('./sequelize ');

//跨域解决方案
app.use(Cors({
  origin: function (ctx) {
    return "http://localhost:8888"//指定的请求域名+端口
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],//表明服务器支持的所有头信息字
  maxAge: 5,
  credentials: true,//表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'], //设置允许的HTTP请求类型
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],//前端请求头
}));

// error handler
onerror(app)
app.use(async (ctx, next) => {
  let token = ctx.header.authorization;
  if (token) {
    let payload = await tokenVerify(token);
    console.log("token===>", payload)
    ctx.state = {
      payload
    };
    await next();
  } else {
    await next()
  }
});
// middlewares
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(json());
app.use(logger());


// /* 当token验证异常时候的处理，如token过期、token错误 */
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status == 401) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: err.message
      }
    } else {
      throw err;
    }
  });
});
// auth
app.use(koajwt({ secret: jwtSignSecret }).unless({
  // 登录,注册接口不需要验证
  path: [/^\/users\/login/, /^\/users\/register/, "/test"]
}));
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
InitRoute(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error：', err, err.status)
});

module.exports = app
