const HTTP = require("../utils/http")

class ClassicModel extends HTTP {
    getLatest(cb) {
        this.request({
            url: '/classic/latest',
            method: "GET",
            success: (res) => {
                cb(res)
                this._setLatestIndex(res.index)
                wx.setStorageSync(this._getKey(res.index), res)
            }
        })
    }

    getClassic(index, previousOrNext, cb) {
        const key = previousOrNext ==='next' ? 
            this._getKey(index + 1) : this._getKey(index - 1)

        const classic = wx.getStorageSync(key)

        if (!classic) {
            this.request({
                url: `/classic/${index}/${previousOrNext}`,
                success: (res) => {
                    cb(res)
                    wx.setStorageSync(this._getKey(res.index), res)
                }
            })
        }
        else {
            cb(classic)
        }
    }

    isFirst(index) {
        return index === 1 ? true : false
    }

    isLatest(index) {
        const latestIndex = this._getLatestIndex()
        return latestIndex === index
    }

    _getKey(index) {
        return 'classic-' + index
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex() {
        return wx.getStorageSync('latest')
    }

}

module.exports = ClassicModel
