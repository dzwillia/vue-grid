<template>
  <div class="absolute" :style="row_style">
    <!-- row handle -->
    <div class="overflow-hidden ba absolute z-1 bg-near-white vg-td" :style="row_handle_style">
      <div class="h-100 lh-1 light-silver tr vg-td-inner" :style="inner_row_handle_style">{{rowIndex+1}}</div>
    </div>

    <!-- cells -->
    <div class="flex flex-row nowrap" :style="'padding-left: '+row_handle_width+'px'">
      <div class="flex-none overflow-hidden ba vg-td" :style="'height: '+(rowHeight+1)+'px'" v-for="col in columns">
        <div class="h-100 lh-1 vg-td-inner" :style="'width: '+col.pixel_width+'px'">{{row[getColumnName(col)]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT,
    DEFAULT_ROW_HANDLE_WIDTH
  } from '../constants'

  export default {
    props: {
      'row': {
        type: Object,
        required: true
      },
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
        default: DEFAULT_ROW_HANDLE_WIDTH
      },
      'columns': {
        type: Array,
        required: true
      },
      'scroll-left': {
        type: Number,
        default: 0
      }
    },
    watch: {
      rowHandleWidth(val, old_val) {
        this.row_handle_width = val
      }
    },
    data() {
      return {
        row_handle_width: this.rowHandleWidth
      }
    },
    computed: {
      row_style() {
        return 'top: '+(this.rowIndex*this.rowHeight)+'px'
      },
      row_handle_style() {
        return 'left: '+this.scrollLeft+'px; height: '+(this.rowHeight+1)+'px'
      },
      inner_row_handle_style() {
        return 'width: '+this.row_handle_width+'px'
      }
    },
    methods: {
      getColumnName(col) {
        return _.get(col, 'name', '')
      }
    }
  }
</script>
