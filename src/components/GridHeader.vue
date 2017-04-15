<template>
  <div class="relative" :style="header_style">
    <!-- row handle -->
    <div class="overflow-hidden ba absolute z-1 vg-th" :style="row_handle_style">
      <div class="h-100 lh-1 light-silver tr bg-near-white vg-th-inner" :style="inner_row_handle_style"></div>

      <!-- row handle resize handle -->
      <div
        class="absolute top-0 bottom-0 right-0 cursor-resize-ew"
        :style="'width: '+column_resize_handle_width+'px'"
        @mousedown="onRowHandleResizerMousedown"
      ></div>
    </div>

    <!-- cells -->
    <div class="flex flex-row nowrap" :style="'padding-left: '+row_handle_width+'px'">
      <div class="flex-none overflow-hidden ba bg-near-white tc relative vg-th" :style="'height: '+(rowHeight+1)+'px'" v-for="col in columns">
        <!-- cell content -->
        <div class="h-100 lh-1 vg-th-inner" :style="'width: '+col.pixel_width+'px'">{{getColumnName(col)}}</div>

        <!-- column resize handle -->
        <div
          class="absolute top-0 bottom-0 right-0 cursor-resize-ew"
          :style="'width: '+column_resize_handle_width+'px'"
          @mousedown="onColumnResizerMousedown(col)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT,
    DEFAULT_ROW_HANDLE_WIDTH,
    DEFAULT_COLUMN_RESIZE_HANDLE_WIDTH
  } from '../constants'

  export default {
    props: {
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
        row_handle_width: this.rowHandleWidth,
        column_resize_handle_width: DEFAULT_COLUMN_RESIZE_HANDLE_WIDTH
      }
    },
    computed: {
      header_style() {
        return 'left: -'+this.scrollLeft+'px'
      },
      row_handle_style() {
        return 'left: '+this.scrollLeft+'px; height: '+(this.rowHeight+1)+'px'
      },
      inner_row_handle_style() {
        return 'width: '+(this.row_handle_width)+'px'
      }
    },
    methods: {
      getColumnName(col) {
        return _.get(col, 'name', '')
      },
      onRowHandleResizerMousedown(col) {
        this.$emit('start-row-handle-resize', col)
      },
      onColumnResizerMousedown(col) {
        this.$emit('start-column-resize', col)
      }
    }
  }
</script>
