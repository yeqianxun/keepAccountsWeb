const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    outputDir: process.env.VUE_APP_DIR_NAME,
    devServer: {
        port: "8888",
        open: true,
        hotOnly: true,
        compress: true,
        disableHostCheck: true, 
        proxy: {
            '^/api': {
                target: 'http://localhost:3333',
                changeOrigin: true,
                // ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            .set("@", resolve("src"));
        const oneOfsMap = config.module.rule("scss").oneOfs.store;
        oneOfsMap.forEach(item => {
            item
                .use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    // 公用scss
                    resources: [
                        path.join(__dirname,"./src/style/common.scss"),
                        path.join(__dirname,"./src/style/color.scss"),
                        path.join(__dirname,"./src/style/mixin.scss")
                    ]
                })
                .end();
        });
    }

};