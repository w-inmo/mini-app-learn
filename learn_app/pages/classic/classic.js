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
        classicModel.getLatest((res) => {
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
        classicModel.getClassic(index, previousOrNext, (res) => {
            this._getLikeStatus(res.id, res.type)
            this.setData({
                classicData: res,
                latest: classicModel.isLatest(res.index),
                first: classicModel.isFirst(res.index)
            })
        })
    },
    _getLikeStatus(artId, category) {
        likeModel.getClassicLikeStatus(artId, category, (res) => {
            this.setData({
                likeCount: res.fav_nums,
                likeStatus: res.like_status
            })
        })
    },
})