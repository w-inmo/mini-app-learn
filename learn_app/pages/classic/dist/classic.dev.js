"use strict";

var ClassicModel = require("../../models/classic");

var LikeModel = require("../../models/like");

var classicModel = new ClassicModel();
var likeModel = new LikeModel();
Page({
  data: {
    classicData: null,
    first: false,
    latest: true,
    likeStatus: false,
    likeCount: 0
  },
  onLoad: function onLoad() {
    var _this = this;

    classicModel.getLatest().then(function (res) {
      _this.setData({
        classicData: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
    });
  },
  onLike: function onLike(e) {
    var behavior = e.detail.behavior;
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
  },
  onPrevious: function onPrevious() {
    this._updateClassic('previous');
  },
  onNext: function onNext() {
    this._updateClassic('next');
  },
  _updateClassic: function _updateClassic(previousOrNext) {
    var _this2 = this;

    var index = this.data.classicData.index;
    var key = previousOrNext === 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    var classic = wx.getStorageSync(key);

    if (classic) {
      this.saveData(classic);
    } else {
      classicModel.getClassic(index, previousOrNext).then(function (res) {
        wx.setStorageSync(_this2._getKey(res.index), res);

        _this2.saveData(res);
      });
    }
  },
  saveData: function saveData(res) {
    this._getLikeStatus(res.id, res.type);

    this.setData({
      classicData: res,
      latest: classicModel.isLatest(res.index),
      first: classicModel.isFirst(res.index)
    });
  },
  _getLikeStatus: function _getLikeStatus(artId, category) {
    var _this3 = this;

    likeModel.getClassicLikeStatus(artId, category).then(function (res) {
      _this3.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  },
  _getKey: function _getKey(index) {
    return 'classic-' + index;
  },
  _setLatestIndex: function _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  },
  _getLatestIndex: function _getLatestIndex() {
    return wx.getStorageSync('latest');
  }
});