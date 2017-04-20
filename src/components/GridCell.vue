<template>
  <div :style="cell_style">
    <div class="h-100 lh-1 vg-td-inner" :style="inner_cell_style">
      <span ref="content">{{value}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'col': {
        type: Object,
        required: true
      },
      'row-handle-width': {
        type: Number
      },
      'value': {
        required: true
      },
      'left': {
        type: Number,
        required: false
      },
      'width': {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        content_width: 0
      }
    },
    computed: {
      cell_style() {
        return { 'left': (this.rowHandleWidth+this.left)+'px' }
      },
      inner_cell_style() {
        return { 'width': this.width+'px' }
      }
    },
    mounted() {
      var el = this.$refs['content']
      this.content_width = el ? el.offsetWidth : 0
      this.$emit('determine-auto-width', this.col, this.content_width)
    }
  }
</script>
