const config = require('../config.js')

// 用户体验，信息反馈
const tips = {
    1: '抱歉，出现了一个错误',
    1000: '输入参数错误',
    1005: 'appkey 无效',
    3000: '期刊不存在'
}

class HTTP {
    request(params) {
        wx.request({
            url: config.baseURL + params.url,
            header: {
                'content-type': 'application/json',
                appkey: config.appkey
            },
            method: params.method,
            data: params.data,
            success: (res) => {
                const code = res.statusCode.toString()

                if (code.startsWith('2')) {
                    params.success && params.success(res.data)
                } else {
                    const errorCode = res.data.error_code
                    this._show_err(errorCode)
                }
            },
            fail: (err) => {
                this._show_err(1)
            }
        })
    }

    _show_err(errorCode) {

        if (!errorCode) error_code = 1

        const tip = tips[errorCode]

        wx.showToast({
            title: tip || tips[1],
            icon: 'none',
            duration: 2000 
        }) 
    }
}

module.exports = HTTP
