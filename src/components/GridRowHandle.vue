<template>
  <div class="absolute nowrap" :style="row_style">
    <div class="h-100 lh-1 light-silver tr vg-td-inner" :style="inner_row_handle_style">{{rowIndex+1}}</div>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT,
    DEFAULT_ROW_HANDLE_WIDTH
  } from '../constants'

  export default {
    props: {
      'row-index': {
        type: Number,
        required: true
      },
      'row-height': {
        type: Number,
        default: DEFAULT_ROW_HEIGHT
      },
      'row-handle-width': {
        type: Number,
        default: DEFAULT_ROW_HEIGHT
      }
    },
    computed: {
      row_style() {
        return {
          'top': (this.rowIndex*this.rowHeight)+'px',
          'height': (this.rowHeight+1)+'px'
        }
      },
      inner_row_handle_style() {
        return {
          'width': this.rowHandleWidth+'px'
        }
      }
    }
  }
</script>
