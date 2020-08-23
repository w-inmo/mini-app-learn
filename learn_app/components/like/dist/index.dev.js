"use strict";

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
    onLike: function onLike(event) {
      if (this.properties.readOnly) return;
      var _this$properties = this.properties,
          count = _this$properties.count,
          isLike = _this$properties.isLike; // 如果是 true 状态点击

      count = isLike ? count - 1 : count + 1;
      this.setData({
        count: count,
        isLike: !isLike
      });
      var behavior = this.properties.isLike;
      this.triggerEvent('like', {
        behavior: behavior
      });
    }
  }
});