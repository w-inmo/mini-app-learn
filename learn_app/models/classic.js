const HTTP = require("../utils/http-p")

class ClassicModel extends HTTP {
    getLatest() {
        return this.request({ url: '/classic/latest' })
    }

    getClassic(index, previousOrNext) {
        return this.request({
            url: `/classic/${index}/${previousOrNext}`,
        })
    }

    getMyFavor() {
        return this.request({ url: '/classic/favor' })
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
