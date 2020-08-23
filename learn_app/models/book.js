const HTTP = require("../utils/http-p")

class BookModel extends HTTP {
    
    getHotList() {
        return this.request({
            url: '/book/hot_list'
        })
    }

    getBook(bookId) {
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

    postComment(id, comment) {
        return this.request({
            url: '/book/add/short_comment',
            method: "POST",
            data: {
                book_id: id,
                content: comment                
            }
        })
    }
}

module.exports = BookModel
