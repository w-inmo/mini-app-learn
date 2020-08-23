// components/like/index.js
Component({
	properties: {
		isLike: Boolean,
        count: Number,
        readOnly: Boolean
	},
	data: {
		likeSrc: "images/like.png",
		disLikeSrc: "images/like@dis.png"
	}, 
	methods: {
		onLike(event) {
            if (this.properties.readOnly) return

			let { count, isLike } = this.properties

			// 如果是 true 状态点击
			count = isLike ? count - 1 : count + 1
            this.setData({ count, isLike: !isLike })

            const behavior = this.properties.isLike
            this.triggerEvent('like', { behavior })
		}
	}
})
