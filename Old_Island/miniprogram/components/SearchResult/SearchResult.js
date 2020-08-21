const { get } = require("../../api/index")

Component({
  properties: {
    q: String,
    bookData: {
      type: Array,
      value: []
    }
  },
  lifetimes: {
    // attached() {
    //   get('/book/search', {q: this.properties.q}).then(({data}) => {
    //     this.setData({ bookData: data })
    //   })
    // }
  },
  methods: {
    update(q) {

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

      get('/book/search', { start: requestStart, q }).then(({data}) => {

        const bookData = this.data.bookData

        bookData.count = data.count
        bookData.start = data.start
        bookData.books.push(...data.books)

        this.setData({ bookData })
      })
    }
  }
})
