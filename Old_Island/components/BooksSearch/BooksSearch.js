Component({
  data: {
    isFocus: false,
    input: ''
  },
  methods: {
    onFocus() {
      this.setData({ isFocus: true })
    },
    onBlur(event) {
      this.setData({ isFocus: false, input: '' })
    },
    onSearch() {
      
    }
  }
})
