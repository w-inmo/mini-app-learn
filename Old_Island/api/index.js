const baseURL = "http://bl.7yue.pro/v1"
const appkey = "none"

function get(url, params = {}) {

  params['appkey'] = 'AbhC31IG7ruCDp57'

  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '书籍请求中' })
    wx.request({
      url: baseURL + url,
      data: { ...params },
      method: "GET",
      success: (data) => {
        wx.hideLoading()
        resolve(data)
      },
      fail: (err) => {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}

module.exports = {
  baseURL,
  appkey,
  get,
  getClassicLatest: baseURL + '/classic/latest?' + appkey,
  getBookHotlist: baseURL + '/book/hot_list?' + appkey,
  getShortComment: baseURL + '/book/<int:book_id>/short_comment?' + appkey,
  getClassicFavor: baseURL + '/classic/favor?' + appkey,
  getClassicNext: baseURL + '/classic/<int:index>/next?' + appkey,
  search: baseURL + '/book/search?q=<title>&' + appkey,
  getBookDetail: baseURL + '/book/<id>/detail' + appkey,
}
