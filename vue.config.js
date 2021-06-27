const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const cdn = {
    // 忽略打包的第三方库
    externals: {
        "vue": 'Vue',
        "element-ui": "ELEMENT",
        'vue-router': 'VueRouter',
        "vuex": 'Vuex',
        "axios": 'axios',
        //   moment: "moment",
        //   echarts: "echarts"
    },

    // 通过cdn方式使用
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
        "https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/index.min.js",
    ],

    css: ["https://unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css"],
}
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
                        path.join(__dirname, "./src/style/common.scss"),
                        path.join(__dirname, "./src/style/color.scss"),
                        path.join(__dirname, "./src/style/mixin.scss")
                    ]
                })
                .end();
        });
        //
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
        })
        config.plugins.delete('prefetch');
    },
    //打包忽略第三方库
    configureWebpack: config => {
        // 忽略打包配置
        config.externals = cdn.externals;
        // 开启gzip压缩
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.(js|css)?$/i, // 哪些文件要压缩
                filename: '[path].gz[query]',　// 压缩后的文件名
                algorithm: 'gzip',　// 使用gzip压缩
                minRatio: 1,　// 压缩率小于1才会压缩
                deleteOriginalAssets: true // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为
            }
            )
        )
    }

};