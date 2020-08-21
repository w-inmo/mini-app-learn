
const { getClassicFavor } = require("../../api/index")

Component({
  data: {
    typeMap: {
      100: '电影',
      200: '音乐',
      300: '句子'
    },
    likeList: null
  },
  lifetimes: {
    created() {
      
      wx.request({
        url: getClassicFavor,
        method: 'GET',
        success: this.onSuccess.bind(this),
        fail: this.onFail.bind(this)
      })

    }
  },
  methods: {
    onSuccess({ data }) {
      this.setData({ likeList: data })
    },
    onFail(err) {
      console.log(err)

      wx.showToast({
        title: "数据请求失败",
        icon: 'none',
        duration: 2000
      })
    },
    onNavigator(e) {
      const {type, index} = e.currentTarget.dataset
      wx.navigateTo({url: `/pages/collect/collect?type=${type}&id=${index}`});
    }
  }
})
