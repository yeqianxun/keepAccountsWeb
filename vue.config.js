const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    outputDir: process.env.VUE_APP_DIR_NAME,
    productionSourceMap: false,
    devServer: {
        port: "8888",
        open: true,
        hotOnly: true,
        compress: true,
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: 'http://192.168.0.108:3333',
                changeOrigin: true,
                // ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '^/chat': {
                target: 'http://192.168.0.108:3333',
                changeOrigin: true,
            },
            '/socket.io': {
                target: 'http://192.168.0.108:3333',
                ws: true,
                changeOrigin: true
            },
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
                        path.join(__dirname, "./src/style/common.scss"),
                        path.join(__dirname, "./src/style/color.scss"),
                        path.join(__dirname, "./src/style/mixin.scss")
                    ]
                })
                .end();
        });
    }

};