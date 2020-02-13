module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port:8001,
        proxy: {
            '/api':{
                target:'http://localhost:8080',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }
    }
}