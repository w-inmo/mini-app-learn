const { get } = require("../../api/index")

Page({
  data: {
    bookData: null
  },
  onLoad(options) {
    options.id = options.id || 7

    get(`/book/${ options.id }/detail`).then(({data}) => {
      this.setData({ bookData: data })
    })
  }
})