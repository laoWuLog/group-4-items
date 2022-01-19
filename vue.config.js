module.exports = {
  devServer: {
    proxy: {
      "^/api1": {
        target: "http://kumanxuan1.f3322.net:8881",
        pathRewrite: {
          "^/api1": "",
        },
      },

      // http://localhost:8080/cms/products/recommend
      "^/cms": {
        //http://192.168.113.249:8081/cms/products/recommend
        //http://192.168.113.249:8081/a/products/recommend
        target: "http://kumanxuan1.f3322.net:8881", // 转发的目标服务器和端口
        // 重写资源路径
        // pathRewrite: {
        //     '^/cms': '/a'
        // }
        // ws: true,
        // changeOrigin: true
      },
      // '/foo': {
      //     target: '<other_url>'
      // }
    },
  },
};
