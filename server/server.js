const Koa = require('koa')
const path = require("path")
const Cors = require("koa2-cors");
const json = require('koa-json')
const onerror = require('koa-onerror')
const JsonError = require("koa-json-error")
const KoaBody = require('koa-body')
const logger = require('koa-logger')
const koajwt = require("koa-jwt");
const parameter = require('koa-parameter')
const koaStatic = require("koa-static")
let { jwtSignSecret } = require("./lib/config");
const InitRoute = require("./lib/index");
const app = new Koa();

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
onerror(app);
app.use(JsonError({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

app.use(koaStatic(path.join(__dirname, 'public/')));
// app.use(koaStatic(path.join(__dirname, 'house_image/')));
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024,   // 设置上传文件大小最大限制，默认2M
    keepExtensions: true,
    // onFileBegin: (name, file) => {
    //   // 获取文件后缀
    //   const ext = getUploadFileExt(file.name);
    //   // 最终要保存到的文件夹目录
    //   const dir = path.join(__dirname, `public/upload/`);
    //   // 检查文件夹是否存在如果不存在则新建文件夹
    //   // checkDirExist(dir);
    //   const fileName = file.path.substring(file.path.lastIndexOf("upload"), file.path.length)
    //   // 重新覆盖 file.path 属性
    //   file.path = `${dir}/${fileName}`;
    // },
    onError: (err) => {
      console.log(err);
    }
  }
}));
app.use(json());
app.use(logger());
app.use(parameter(app))
// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "认证失败"
      }
    } else {
      throw err;
    }
  })
})
// auth
app.use(koajwt({ secret: jwtSignSecret }).unless({
  // 登录,注册接口不需要验证
  path: [/^\/users\/login/, /^\/users\/register/, /^\/public/]
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
  console.error('server error：', err, err.status);
});

module.exports = app
