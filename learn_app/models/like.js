const HTTP = require("../utils/http")

class LikeModel extends HTTP {
    like(behavior, artId, category) {

        const url = behavior ? '/like' : '/like/cancel'

        this.request({
            url,
            method: 'POST',
            data: {
                art_id: artId,
                type: category
            }
        })
    }

    getClassicLikeStatus(artId, category, cb) {
        this.request({
            url: `/classic/${category}/${artId}/favor`,
            success: (res) => cb(res)
        })
    }
}

module.exports = LikeModel
