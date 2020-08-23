const HTTP = require('../utils/http-p')

class KeyworkModel extends HTTP {

    key = 'q'
    maxLength = 10

    getHistory() {
        return wx.getStorageSync(this.key) || []
    }

    getHot() {
        return this.request({ url: '/book/hot_keyword' })
    }

    addToHistory(keyword) {
        const words = this.getHistory()
        const has = words.includes(keyword)

        if (!has) {

            if (words.length >= this.maxLength) words.pop()

            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }

    search({start = 0, q = ''}) {
        return this.request({
            url: '/book/search?summary=1',
            data: {
                q,
                start
            }
        })
    }
}


module.exports = KeyworkModel

