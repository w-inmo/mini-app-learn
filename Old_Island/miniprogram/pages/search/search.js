
const { get } = require("../../api/index")

Page({
  data: {
    value: '',
    q: '',
    isShowResult: false,
    bookData: null
  },
  onSearch(e) {
    get('/book/search', { 
      q: e.detail.value,
      summary: 1
    }).then(({data}) => {
      console.log(data)
      this.setData({ bookData: data, isShowResult: true, q: e.detail.value })
    })
  },
  updateBooks() {
    const { start, count, total } = this.data.bookData
    const requestStart = start + count

    if (requestStart >= total) {
      wx.showToast({
        title: '加载完毕',
        icon: 'success',
        duration: 1000
      })

      return
    }

    get('/book/search', { 
      start: requestStart, 
      q: this.data.q,
      summary: 1
    }).then(({data}) => {
      const bookData = this.data.bookData

      bookData.count = data.count
      bookData.start = data.start
      bookData.books.push(...data.books)

      this.setData({ bookData })
    })
  },
  onClear() {
    this.setData({ isShowResult: false, q: '', value: '' })
  },
  onBack() {
    wx.navigateBack({ delta: 1 })
  }
})