module.exports = {
    devServer: {
        proxy: {
            'cms': {
                // http://192.168.113.249:8081/cms/products/recommend 
                // 转发的目标服务器和端口
                target: 'http://192.168.113.249:8081',
                // ws: true,
                // changeOrigin: true
            },
            // '/foo': {
            //     target: '<other_url>'
            // }
        }
    }
}