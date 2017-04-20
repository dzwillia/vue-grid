<template>
  <div>
    <!-- cell content -->
    <div class="h-100 lh-1 vg-th-inner" :style="'width: '+width+'px'">
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
      'value': {
        required: true
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
