
const { getBookHotlist } = require("../../api/index")

Component({
  data: {
    bookList: null
  },
  lifetimes: {
    created() {
      wx.request({
        url: getBookHotlist,
        method: "GET",
        success: this.onSuccess.bind(this),
        fail: this.onFail.bind(this)
      })
    }
  },
  methods: {
    onSuccess({data}) {
      this.setData({ bookList: data })
    },
    onFail(err) {
      console.log(err)

      wx.showToast({
        title: "网络请求失败",
        icon: 'none'
      })
    }
  }
})
