// components/DetailBottombar/DetailBottombar.js
Component({
  data: {
    hideComment: true
  },
  methods: {
    onComment() {
      console.log('toggle')
      this.setData({ hideComment: !this.data.hideComment })
    }
  }
})
