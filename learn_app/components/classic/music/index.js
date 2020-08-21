const classicBehavior = require("../classic-beh")

const mMgr = wx.getBackgroundAudioManager();
  
Component({
    behaviors: [classicBehavior],
    /**
     * 组件的属性列表
     */
    properties: {
        src: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        pauseSrc: 'images/pause.png',
        playSrc: 'images/play.png',
        isPlay: false
    },

    /**
     * 生命周期列表
     */
    lifetimes: {
        attached() {
            this._recoverStatus()
            this._monitorSwitch()
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPlay() {

            if (this.data.isPlay) {
                mMgr.pause()
            } else {
                mMgr.title = this.properties.title
                mMgr.src = this.properties.src
            }

            this.setData({ isPlay: !this.data.isPlay })
        },
        _recoverStatus() {
            if (mMgr.paused) {
                this.setData({ isPlay: false })
            }
            else if (mMgr.src === this.properties.src) {
                this.setData({ isPlay: true })
            }
        },
        _monitorSwitch() {
            mMgr.onPlay(() => this._recoverStatus())
            mMgr.onPause(() => this._recoverStatus())
            mMgr.onStop(() => this._recoverStatus())
            mMgr.onEnded(() => this._recoverStatus())
        }
    }
})
