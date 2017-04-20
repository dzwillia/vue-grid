<template>
  <div class="relative" :style="header_style">
    <!-- row handle -->
    <div class="overflow-hidden ba absolute bg-near-white z-1 vg-th" :style="row_handle_style">
      <div class="h-100 lh-1 light-silver tr vg-th-inner" :style="inner_row_handle_style"></div>

      <!-- row handle resize handle -->
      <div
        class="absolute top-0 bottom-0 right-0 cursor-resize-ew"
        :style="'width: '+column_resize_handle_width+'px'"
        @mousedown="onRowHandleResizerMousedown"
      ></div>
    </div>

    <!-- cells -->
    <div class="flex flex-row nowrap" :style="cell_container_style">
      <grid-header-cell
        class="flex-none overflow-hidden ba bg-near-white tc relative vg-th"
        v-for="(col, index) in columns"
        :col="col"
        :value="getColumnName(col)"
        :width="col.pixel_width || 0"
        :style="'height: '+(rowHeight+1)+'px'"
        @column-resizer-mousedown="onColumnResizerMousedown"
        @determine-auto-width="onHeaderCellDetermineWidth"
      >
      </grid-header-cell>
    </div>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT,
    DEFAULT_ROW_HANDLE_WIDTH,
    COLUMN_RESIZE_HANDLE_WIDTH
  } from '../constants'
  import GridHeaderCell from './GridHeaderCell.vue'

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
      'left-of-render-cols-width': {
        type: Number,
        default: 0
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
    components: {
      GridHeaderCell
    },
    watch: {
      rowHandleWidth(val, old_val) {
        this.row_handle_width = val
      },
      leftOfRenderColsWidth(val, old_val) {
        this.left_of_render_cols_width = val
      }
    },
    data() {
      return {
        row_handle_width: this.rowHandleWidth,
        left_of_render_cols_width: this.leftOfRenderColsWidth,
        column_resize_handle_width: COLUMN_RESIZE_HANDLE_WIDTH
      }
    },
    computed: {
      header_style() {
        return 'left: -'+this.scrollLeft+'px'
      },
      cell_container_style() {
        return 'padding-left: '+(this.row_handle_width+this.left_of_render_cols_width)+'px'
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
      },
      onHeaderCellDetermineWidth(col, width) {
        this.$emit('determine-cell-auto-width', 'header', col, width)
      }
    }
  }
</script>
