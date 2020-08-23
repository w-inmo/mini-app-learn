const { get } = require("../../api/index")

Page({
  data: {
    isData: false,
    data: null
  },
  onLoad(options) {
    get(`/classic/${options.type}/${options.id}`).then(({data}) => {
      this.setData({ data: data, isData: true })
    })
  }
})