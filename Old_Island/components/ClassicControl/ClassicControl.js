
const { getClassicNext } = require('../../api/index')

Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  data: {
    cacheData: []
  },
  methods: {
    onTapNext() {

      const url = getClassicNext.replace('<int:index>', this.properties.data.index - 2)
      this.data.cacheData.push(this.properties.data)

      wx.request({
        url,
        method: 'GET',
        success: (data) => this.triggerEvent('updateData', data)
      })

    },
    onTapPrev() {
      this.triggerEvent('updateData', { data: this.data.cacheData.pop() })
    }
  }
})