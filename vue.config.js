
module.exports = {
    // 脚手架的方法--设置代理
    devServer: {
        proxy: {
            '^/api1': {
                // http://192.168.113.249:8081/cms/products/recommend 
                // 转发的目标服务器和端口
                target: 'http://192.168.113.249:8081',
                // 重写资源路径
                pathRewrite: {
                    '^/api': ''
                }
            },
            '^/cms':{
                target: 'http://192.168.113.249:8081',
            }
        }
    }
}