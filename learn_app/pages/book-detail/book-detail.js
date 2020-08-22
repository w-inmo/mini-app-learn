const BookModel = require("../../models/book")
const LikeModel = require("../../models/like")

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        book: {},
        like: false,
        likeCount: 0,
        posting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id,
            bookDetail = bookModel.getDetail(id),
            like = bookModel.getLikeStatus(id),
            bookComments = bookModel.getComments(id)

        Promise.all([bookDetail, like, bookComments]).then(values => {
            this.setData({
                book: values[0],
                like: values[1],
                comments: values[2]
            })
        })
    },

    onLike(event) {
        const behavior = event.detail.behavior
        likeModel.like(behavior, book.id, 400)
    },

    onFakePost() {
        this.setData({ posting: true })
    },

    onCancel() {
        this.setData({ posting: false })
    }
})