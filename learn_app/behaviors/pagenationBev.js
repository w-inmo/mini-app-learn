const pagenationBev = Behavior({
    data: {
        searchData: [],
        total: 0
    },

    setMoreSearchData(books) {
        this.data.searchData.push(...books)
        this.setData({ searchData: this.data.searchData })
    },

    clearBooksData() {
        this.setData({ searchData: [] })
    },

    setTotal(total) {
        this.setData({ total })
    },

    hasMore() {
        return (this.data.searchData.length < this.data.total)
    }
})

module.exports = pagenationBev
