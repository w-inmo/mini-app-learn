"use strict";

// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.userAuthorized();
  },
  userAuthorized: function userAuthorized() {
    wx.getSetting({
      success: this._authorizedSuccess
    });
  },
  _authorizedSuccess: function _authorizedSuccess(res) {
    if (res.authSetting['scope.userInfo']) {
      this.getUserInfo();
    } else {
      console.log('User no authorization 用户没有授权!');
    }
  },
  getUserInfo: function getUserInfo() {
    wx.getUserInfo({
      success: function success(res) {
        console.log(res);
      }
    });
  },
  onGetUserInfo: function onGetUserInfo(event) {
    console.log(event); // wx.getUserInfo({
    //     success(res) {
    //         console.log(res)
    //     }
    // })
  }
});