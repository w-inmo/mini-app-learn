const HTTP = require("../utils/http-p")

class LikeModel extends HTTP {
    like(behavior, artId, category) {

        const url = behavior ? '/like' : '/like/cancel'

        this.request({
            url,
            data: {
                art_id: artId,
                type: category
            }
        })
    }

    getClassicLikeStatus(artId, category) {
        return this.request({ url: `/classic/${category}/${artId}/favor` })
    }
}

module.exports = LikeModel
