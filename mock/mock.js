const bodyParser = require('body-parser')
const Mock = (app) => {
    app.use(bodyParser.json())
    app.get('/user/info', function (req, res) {
        res.json({
            status: "ok",
            data: {
                name: '11111111111',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                userid: '11111111111',
                email: 'antdesign@alipay.com',
                access: 'admin',
                phone: '11111111111',
            }
        })
    })
    app.post('/user/login', function (req, res) {
        let body = req.body;
        if (body.loginType === 'password') {
            if (body.username === 'admin' && body.password === 'admin') {
                res.json({
                    status: 'ok',
                    data: {
                        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzI3MjU2ODIsImlhdCI6MTYwNjgwNTY4MiwicGhvbmUiOiIxMzUzNTAzMjkzNiJ9.BY-dsK8YFIofIDah7qufUJJKlPyfSdhzt4cBmRx1CCo'
                    }
                })
            } else {
                res.json({
                    status: 'fail',
                    msg: '登录失败、请检查帐号密码',
                })
            }
        } else {
            if (body.phone === '11111111111' && body.message === '123') {
                res.json({
                    status: 'ok',
                    data: {
                        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzI3MjU2ODIsImlhdCI6MTYwNjgwNTY4MiwicGhvbmUiOiIxMzUzNTAzMjkzNiJ9.BY-dsK8YFIofIDah7qufUJJKlPyfSdhzt4cBmRx1CCo'
                    }
                })
            } else {
                res.json({
                    status: 'fail',
                    msg: '验证码错误、请检查',
                })
            }
        }
    })
    app.get('/position/virtual/list', function (req, res) {
        res.json({
            status: 'ok',
            data: [
                {
                    name: 'BTC',
                    status: 'enable',
                    directions: [{ name: '追涨', value: 'buy' }, { name: '杀跌', value: 'sell' }],
                    contractTypes: [
                        {
                            name: '季度',
                            value: 'quarter'
                        }, {
                            name: '下季度',
                            value: 'next_quarter'
                        }, {
                            name: '本周',
                            value: 'this_week'
                        }, {
                            name: '下周',
                            value: 'next_week'
                        }]
                },
                {
                    name: 'ETH',
                    status: 'enable',
                    directions: [{ name: '杀跌', value: 'sell' }],
                    contractTypes: [
                        {
                            name: '季度',
                            value: 'next_quarter'
                        }]
                },
                {
                    name: 'ETC',
                    status: 'disable',
                    directions: [{ name: '追涨', value: 'buy' }, { name: '杀跌', value: 'sell' }],
                    contractTypes: [
                        {
                            name: '季度',
                            value: 'quarter'
                        }, {
                            name: '下季度',
                            value: 'next_quarter'
                        }, {
                            name: '本周',
                            value: 'this_week'
                        }, {
                            name: '下周',
                            value: 'next_week'
                        }]
                },
            ]
        })
    })
    app.get('/position/huobi/list', function (req, res) {
        res.json({
            status: 'ok',
            data: [
                {
                    key: '1',
                    name: 'BTC',
                    status: 'enable',
                    directions: ['buy', 'sell'],
                    contractTypes: ['quarter', 'next_quarter', 'this_week', 'next_week']
                }
            ]
        })
    })
}

module.exports = Mock