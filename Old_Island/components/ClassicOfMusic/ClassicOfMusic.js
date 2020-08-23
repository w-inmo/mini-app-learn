// components/ClassicOfMusic/ClassicOfMusic.js
Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  data: {
    isPlay: false,
    play: 'images/play.png',
    pause: 'images/pause.png',
    audioManger: null
  },
  methods: {
    onTogglePlay() {
      if (this.data.isPlay) {
        this.data.audioManger.stop()
        this.setData({ audioManger: null })
      } else {
        const backgroundAudioManger = wx.getBackgroundAudioManager()
        backgroundAudioManger.title = this.properties.data.title
        backgroundAudioManger.src = this.properties.data.url
        
        this.data.audioManger = backgroundAudioManger
      }

      this.setData({ isPlay: !this.data.isPlay })
    }
  }
})
