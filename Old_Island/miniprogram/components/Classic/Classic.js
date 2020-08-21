// components/classic/classic.js

const { getClassicLatest } = require("../../api/index")

Component({
  data: {
    isData: false,
    classic: null
  },
  methods: {
    onSuccess({data}) {
      this.setData({
        ['classic']: data,
        isData: true
      })
    },
    onFail(err) {
      console.log(err)
      wx.showToast({
        icon: 'none',
        title: '数据请求失败',
        duration: 2000
      })
    },
    onUpdateData(event) {
      this.onSuccess(event.detail)
    }
  },
  created() {
    wx.request({
      url: getClassicLatest,
      method: 'GET',
      success: this.onSuccess.bind(this),
      fail: this.onFail.bind(this)
    })
  }
})