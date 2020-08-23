const BookModel = require("../../models/book")
const KeyworkModel = require("../../models/keyword")

const bookModel = new BookModel()
const keywordModel = new KeyworkModel()

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
    onLoad: function () {
        this._initSearchHistory()
        this.loadData()
    },

    loadData() {
        Promise.all([
            keywordModel.getHot(),
            bookModel.getHotList()
        ]).then(values => {
            this.setData({ hotWords: values[0].hot, books: values[1] })
        })
    },

    onShowSearchPage() {
        this.setData({ 
            historyWords: keywordModel.getHistory(),
            isShowSearchPage: true 
        })
    },

    onCancel() {
        this.clearBooksData()
        this.setData({ isShowSearchPage: false })
    },

    onSearch(event) {
        const q = event.detail.q
        keywordModel.search({ start: this._getStart(), q }).then(res => {
            keywordModel.addToHistory(q)
            this.setMoreSearchData(res.books)
            this.setData({ total: res.total, q })
        })
    },

    onClear() {
        this.clearBooksData()
        this.setData({ historyWords: keywordModel.getHistory() })
    },

    onReachBottom() {
        /**
         * 1. 非搜索页面触发
         * 2. 加载状态
         * 3. 没有更多的数据
         * 4. 搜索关键字是否为空
         */
        if (!this.data.isShowSearchPage ||
            this._isLocked() ||
            !this._hasMore() ||
            !this.data.q) return

        this.loadMore()
    },

    loadMore() {
        this._lock()
        keywordModel.search({ start: this._getStart(), q: this.data.q }).then(res => {
            // 把搜索历史存储到缓存
            keywordModel.addToHistory(this.data.q)

            this.setMoreSearchData(res.books)
            this._unLock()
        }, err => {
            this._unLock()
        })
    },

    setMoreSearchData(books) {
        this.data.searchData.push(...books)
        this.setData({ searchData: this.data.searchData })
    },

    clearBooksData() {
        this.setData({ searchData: [] })
    },

    _getStart() {
        return this.data.searchData.length
    },

    _hasMore() {
        return this.data.searchData.length < this.data.total
    },

    _getSearchStart() {
        return this.data.searchData.length
    },

    _isLocked() {
        return this.data.isLoading
    },

    _lock() {
        this.setData({ isLoading: true })
    },

    _unLock() {
        this.setData({ isLoading: false })
    },
    
    _initSearchHistory() {
        this.setData({ historyWords: keywordModel.getHistory() })
    },
})
