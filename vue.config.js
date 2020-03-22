const path = require("path");
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target : 'http://39.97.33.178',
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    // 要公用的scss的路径
                    resources: './src/assets/style/core/mixin.scss'
                })
                .end()
        })
    }
}