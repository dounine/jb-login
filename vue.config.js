const port = 8083
const { name } = require('./package.json')
module.exports = {
    devServer: {
        hot: true,
        port,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            "/api": {
                target: `http://localhost:${port}`,
                ws: true,
                changeOrigin: true, // 是否改变域名
                secure: false,
                cookieDomainRewrite: '',
                pathRewrite: {
                    "^/api": ""
                },
                onProxyReq: function (proxyReq, req, res, options) {
                    if (req.body) {
                        let bodyData = JSON.stringify(req.body);
                        proxyReq.setHeader('Content-Type', 'application/json')
                        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
                        proxyReq.write(bodyData)
                    }
                }
            }
        },
        before: require('./mock/mock.js')
    },
    configureWebpack: {
        output: {
            library: `${name}`,
            libraryTarget: 'umd',
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : `/`
}
