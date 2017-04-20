<template>
  <div :style="cell_style">
    <!-- cell content -->
    <div class="h-100 lh-1 vg-th-inner" :style="inner_cell_style">
      <span ref="content">{{value}}</span>
    </div>

    <!-- column resize handle -->
    <div
      class="absolute top-0 bottom-0 right-0 cursor-resize-ew"
      :style="'width: '+column_resize_handle_width+'px'"
      @mousedown="onColumnResizerMousedown"
    ></div>
  </div>
</template>

<script>
  import {
    COLUMN_RESIZE_HANDLE_WIDTH
  } from '../constants'

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
        content_width: 0,
        column_resize_handle_width: COLUMN_RESIZE_HANDLE_WIDTH
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
    },
    methods: {
      onColumnResizerMousedown() {
        this.$emit('column-resizer-mousedown', this.col)
      }
    }
  }
</script>
