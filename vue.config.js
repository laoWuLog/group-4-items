module.exports={
    devServer:{
        proxy:{
            '^/apil':{
                target:"http://192.168.113.249:8081",
                pathRewrite:{
                    '^/cms':'/a'//相当替换成空的
                }
            },
            '^/cms':{
                target:"http://192.168.113.249:8081",
                // pathRewrite:{
                //     '^/cms':'/a'//相当替换成空的
                // }
            }
        }
    }
}