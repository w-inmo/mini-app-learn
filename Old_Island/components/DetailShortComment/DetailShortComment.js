const {
  get
} = require("../../api/index")

Component({
  properties: {
    bookId: {
      type: Number,
      value: -1
    }
  },
  data: {
    comments: []
  },
  lifetimes: {
    // attached() {
    //   get(`/book/${this.properties.bookId}/short_comment`).then(({ data }) => {
    //     this.setData({ comments: data.comments })
    //   })
    // }
  }
})