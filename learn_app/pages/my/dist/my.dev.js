"use strict";

var BookModel = require("../../models/book");

var ClassicModel = require("../../models/classic");

var bookModel = new BookModel();
var classicModel = new ClassicModel();
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
  onLoad: function onLoad(options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },
  userAuthorized: function userAuthorized() {
    wx.getSetting({
      success: this.authorizedSuccess.bind(this)
    });
  },
  authorizedSuccess: function authorizedSuccess(res) {
    if (res.authSetting['scope.userInfo']) {
      wx.getUserInfo({
        success: this.successful.bind(this),
        fail: this.failful
      });
    }
  },
  successful: function successful(res) {
    this.setData({
      authorized: true,
      userInfo: res.userInfo
    });
  },
  failful: function failful() {
    console.log('User authorization fail 用户授权失败');
  },
  onGetUserInfo: function onGetUserInfo(event) {
    var userInfo = event.detail.userInfo;

    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: userInfo
      });
    }
  },
  getMyBookCount: function getMyBookCount() {
    var _this = this;

    bookModel.getLikeBookCount().then(function (res) {
      _this.setData({
        bookCount: res.count
      });
    });
  },
  getMyFavor: function getMyFavor() {
    var _this2 = this;

    classicModel.getMyFavor().then(function (res) {
      _this2.setData({
        classics: res
      });
    });
  },
  onJumpToDetail: function onJumpToDetail(event) {// const { cid, type } = event.detail
    // wx.navigateTo({
    //     url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    // })
  }
});