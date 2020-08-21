// components/ClassicHeader/ClassicHeader.js
Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  data: {
    likeIconMap: {
      0: "images/live.png",
      1: "images/live-active.png"
    },
    monthMap: {
      '01': '一月',
      '02': '二月',
      '03': '三月',
      '04': '四月',
      '05': '五月',
      '06': '六月',
      '07': '七月',
      '08': '八月',
      '09': '九月',
      '10': '十月',
      '11': '十一月',
      '12': '十二月'
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        ['date']: this.properties.data.pubdate.split('-')
      })
    }
  }
})