const HTTP = require("../utils/http-p")

class BookModel extends HTTP { 
    getHotList() {
        return this.request({
            url: '/book/hot_list'
        })
    }

    getDetail(bookId) {
        return this.request({
            url: `/book/${bookId}/detail`
        })
    }


    getLikeStatus(bookId) {
        return this.request({
            url: `/book/${bookId}/favor`
        })
    }

    getComments(bookId) {
        return this.request({
            url: `/book/${bookId}/short_comment`
        })
    }
}

module.exports = BookModel
