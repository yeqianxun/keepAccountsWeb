const Koa = require('koa')
const Cors = require("koa2-cors");
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const InitRoute = require("./lib/index");

const app = new Koa();
require('./sequelize ');

//跨域解决方案
app.use(Cors({
  origin: function (ctx) {
    console.log(ctx.url + "==== koa", ctx.headers);
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
// routes
InitRoute(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error：', err, ctx)
});

module.exports = app
