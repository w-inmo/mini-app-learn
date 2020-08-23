Component({

    /**
     * 组件的属性列表
     */
    properties: {
        historyWords: Array,
        hotWords: Array,
        isLoading: Boolean,
        books: {
            type: Array,
            observer(newV) {
                if (!this.data.value) return

                this.setData({ noneData: newV.length === 0, isRequesting: false })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        searching: false,       // 显示搜索结果面板
        value: '',              // 输入框显示的值
        isRequesting: false,    // 是否在加载数据,
        noneData: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCancel() {
            this._hideNoneData()
            this.triggerEvent('cancel')
        },
        onConfirm(event) {

            const word = event.detail.value || event.detail.text

            if (event.detail.text) this.setData({ value: word })

            this.setData({ searching: true, isRequesting: true })
            this.triggerEvent('search', { q: word })
        },
        onClear() {
            this._hideNoneData()
            this.triggerEvent('clear')
            this.setData({ searching: false, value: '' })
        },

        _showNoneData() {
            this.setData({ noneData: true })
        },

        _hideNoneData() {
            this.setData({ noneData: false })
        }
    }
})