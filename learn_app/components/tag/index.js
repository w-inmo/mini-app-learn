// components/tag/index.js
Component({

    options: {
        multipleSlots: true
    },

    externalClasses: ['tag-class'],

    /**
     * 组件的属性列表
     */
    properties: {
        text: String
    },

    methods: {
        onTap() {
            this.triggerEvent('tag', { text: this.properties.text })
        }
    }
})