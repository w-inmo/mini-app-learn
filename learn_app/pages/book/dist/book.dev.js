"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var BookModel = require("../../models/book");

var KeyworkModel = require("../../models/keyword");

var bookModel = new BookModel();
var keywordModel = new KeyworkModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    isShowSearchPage: false,
    hotWords: [],
    searchData: [],
    historyWords: [],
    total: -1,
    q: '',
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this._initSearchHistory();

    this.loadData();
  },
  loadData: function loadData() {
    var _this = this;

    Promise.all([keywordModel.getHot(), bookModel.getHotList()]).then(function (values) {
      _this.setData({
        hotWords: values[0].hot,
        books: values[1]
      });
    });
  },
  onShowSearchPage: function onShowSearchPage() {
    this.setData({
      historyWords: keywordModel.getHistory(),
      isShowSearchPage: true
    });
  },
  onCancel: function onCancel() {
    this.clearBooksData();
    this.setData({
      isShowSearchPage: false
    });
  },
  onSearch: function onSearch(event) {
    var _this2 = this;

    var q = event.detail.q;
    keywordModel.search({
      start: this._getStart(),
      q: q
    }).then(function (res) {
      keywordModel.addToHistory(q);

      _this2.setMoreSearchData(res.books);

      _this2.setData({
        total: res.total,
        q: q
      });
    });
  },
  onClear: function onClear() {
    this.clearBooksData();
    this.setData({
      historyWords: keywordModel.getHistory()
    });
  },
  onReachBottom: function onReachBottom() {
    /**
     * 1. 非搜索页面触发
     * 2. 加载状态
     * 3. 没有更多的数据
     * 4. 搜索关键字是否为空
     */
    if (!this.data.isShowSearchPage || this._isLocked() || !this._hasMore() || !this.data.q) return;
    this.loadMore();
  },
  loadMore: function loadMore() {
    var _this3 = this;

    this._lock();

    keywordModel.search({
      start: this._getStart(),
      q: this.data.q
    }).then(function (res) {
      // 把搜索历史存储到缓存
      keywordModel.addToHistory(_this3.data.q);

      _this3.setMoreSearchData(res.books);

      _this3._unLock();
    }, function (err) {
      _this3._unLock();
    });
  },
  setMoreSearchData: function setMoreSearchData(books) {
    var _this$data$searchData;

    (_this$data$searchData = this.data.searchData).push.apply(_this$data$searchData, _toConsumableArray(books));

    this.setData({
      searchData: this.data.searchData
    });
  },
  clearBooksData: function clearBooksData() {
    this.setData({
      searchData: []
    });
  },
  _getStart: function _getStart() {
    return this.data.searchData.length;
  },
  _hasMore: function _hasMore() {
    return this.data.searchData.length < this.data.total;
  },
  _getSearchStart: function _getSearchStart() {
    return this.data.searchData.length;
  },
  _isLocked: function _isLocked() {
    return this.data.isLoading;
  },
  _lock: function _lock() {
    this.setData({
      isLoading: true
    });
  },
  _unLock: function _unLock() {
    this.setData({
      isLoading: false
    });
  },
  _initSearchHistory: function _initSearchHistory() {
    this.setData({
      historyWords: keywordModel.getHistory()
    });
  }
});