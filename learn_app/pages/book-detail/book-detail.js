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

        const id = options.id
        
        wx.showLoading({ title: "数据请求中" })

        Promise.all([
            bookModel.getBook(id),
            bookModel.getLikeStatus(id),
            bookModel.getComments(id)
        ]).then(values => {
            this.setData({
                book: values[0],
                like: values[1],
                comments: values[2].comments
            })

            wx.hideLoading()
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
    },

    onPost(event) {

        const comment = event.detail.value || event.detail.text

        if (!comment) return

        if (comment.length > 12) {
            wx.showToast({
                title: "短评最多十二个字",
                icon: 'none'
            })

            return
        }

        bookModel.postComment(this.data.book.id, comment).then(res => {
            wx.showToast({
                title: '短评添加成功',
                icon: 'success'
            })

            this.data.comments.unshift({
                content: comment,
                nums: 1
            })

            this.setData({ comments: this.data.comments, posting: false })
        })
    }
})