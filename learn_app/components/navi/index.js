// components/navi/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        first: Boolean,
        latest: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        prevSrc: 'images/prev.png',
        nextSrc: 'images/next.png',
        disPrevSrc: 'images/prev@dis.png',
        disNextSrc: 'images/next@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLeft() {
            if (this.properties.latest) return

            this.triggerEvent('next')
        },
        onRight() {
            if (this.properties.first) return

            this.triggerEvent('previous')
        }
    }
})
