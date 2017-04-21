<template>
  <div class="overflow-hidden ba absolute bg-near-white z-1 vg-th" :style="row_handle_style">
    <div class="h-100 lh-1 light-silver tr vg-th-inner" :style="inner_row_handle_style"></div>

    <!-- row handle resize handle -->
    <div
      class="absolute top-0 bottom-0 right-0 cursor-resize-ew"
      :style="'width: '+column_resize_handle_width+'px'"
      @mousedown="onRowHandleResizerMousedown"
    ></div>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT,
    DEFAULT_ROW_HANDLE_WIDTH,
    COLUMN_RESIZE_HANDLE_WIDTH
  } from '../constants'

  export default {
    props: {
      'row-height': {
        type: Number,
        default: DEFAULT_ROW_HEIGHT
      },
      'row-handle-width': {
        type: Number,
        default: DEFAULT_ROW_HEIGHT
      }
    },
    data() {
      return {
        column_resize_handle_width: COLUMN_RESIZE_HANDLE_WIDTH
      }
    },
    computed: {
      row_handle_style() {
        return {
          'height': (this.rowHeight+1)+'px'
        }
      },
      inner_row_handle_style() {
        return {
          'width': this.rowHandleWidth+'px'
        }
      }
    },
    methods: {
      onRowHandleResizerMousedown() {
        this.$emit('start-row-handle-resize')
      },
    }
  }
</script>
