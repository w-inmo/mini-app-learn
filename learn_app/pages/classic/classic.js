const ClassicModel = require("../../models/classic")
const LikeModel = require("../../models/like")

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({
    data: {
        classicData: null,
        first: false,
        latest: true,
        likeStatus: false,
        likeCount: 0
    },
    onLoad() {
        classicModel.getLatest().then((res) => {
            this.setData({ 
                classicData: res,
                likeStatus: res.like_status,
                likeCount: res.fav_nums
            })
        })
    },
    onLike(e) {
        const behavior = e.detail.behavior
        likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
    },
    onPrevious() {
        this._updateClassic('previous')
    }, 
    onNext() {
        this._updateClassic('next')
    },
    _updateClassic(previousOrNext) {
        const index = this.data.classicData.index
        const key = previousOrNext ==='next' ? this._getKey(index + 1) : this._getKey(index - 1)

        const classic = wx.getStorageSync(key)

        if (classic) {
            this.saveData(classic)
        }
        else {
            classicModel.getClassic(index, previousOrNext).then(res => {
                wx.setStorageSync(this._getKey(res.index), res)
                this.saveData(res)
            })
        }
    },

    saveData(res) {
        this._getLikeStatus(res.id, res.type)
        this.setData({
            classicData: res,
            latest: classicModel.isLatest(res.index),
            first: classicModel.isFirst(res.index)
        })
    },

    _getLikeStatus(artId, category) {
        likeModel.getClassicLikeStatus(artId, category).then((res) => {
            this.setData({
                likeCount: res.fav_nums,
                likeStatus: res.like_status
            })
        })
    },

    _getKey(index) {
        return 'classic-' + index
    },

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    },

    _getLatestIndex() {
        return wx.getStorageSync('latest')
    },
})