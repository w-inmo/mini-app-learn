const BookModel = require("../../models/book")
const ClassicModel = require("../../models/classic")

const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: {},
        bookCount: 0,
        classics: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.userAuthorized()
        this.getMyBookCount()
        this.getMyFavor()
    },

    userAuthorized() {
        wx.getSetting({
            success: this.authorizedSuccess.bind(this)
        })
    },

    authorizedSuccess(res) {
        if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
                success: this.successful.bind(this),
                fail: this.failful
            })
        }
    },

    successful(res) {
        this.setData({ authorized: true, userInfo: res.userInfo })
    },

    failful() {
        console.log('User authorization fail 用户授权失败')
    },

    onGetUserInfo(event) {
        const userInfo = event.detail.userInfo
        
        if (userInfo) {
            this.setData({
                authorized: true,
                userInfo,
            })
        }
    },

    getMyBookCount() {
        bookModel.getLikeBookCount().then(res => {
            this.setData({ bookCount: res.count })
        })
    },

    getMyFavor() {
        classicModel.getMyFavor().then(res => {
            this.setData({ classics: res })
        })
    }

})