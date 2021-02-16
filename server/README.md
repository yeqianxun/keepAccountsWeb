
## 博客 node server

[koa-generator](https://github.com/17koa/koa-generator) 构建项目

koa + koa-router + mysql2 + sequelize

```
 "scripts": {
    "start": "node bin/www",
    "dev": "./node_modules/.bin/nodemon bin/www",
    "prd": "pm2 start bin/www",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
从 package.json 可以看出 dev 命令当项目文件有变化的时候会自动编译，start 则需要每次手动重启

运行

```
yarn dev

localhost:3000
```
### Links

* [koa](https://koa.bootcss.com/)
* [sequelizejs 英文](http://docs.sequelizejs.com/)
* [sequelizejs 中文](https://itbilu.com/nodejs/npm/VkYIaRPz-.html)
* [sequelize-docs-Zh-CN](https://github.com/demopark/sequelize-docs-Zh-CN)