<template>
  <div class="absolute" :style="row_style">
    <!-- row handle -->
    <div class="overflow-hidden ba absolute z-1 bg-near-white vg-td" :style="row_handle_style">
      <div class="h-100 lh-1 light-silver tr vg-td-inner" :style="inner_row_handle_style">{{rowIndex+1}}</div>
    </div>

    <!-- cells -->
    <div class="flex flex-row nowrap" :style="'padding-left: '+row_handle_width+'px'">
      <grid-cell
        class="flex-none overflow-hidden ba vg-td"
        v-for="(col, index) in columns"
        :col="col"
        :value="row[getColumnName(col)]"
        :width="col.pixel_width || 0"
        :style="'height: '+(rowHeight+1)+'px'"
        @determine-auto-width="onCellDetermineWidth"
      >
      </grid-cell>
    </div>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT,
    DEFAULT_ROW_HANDLE_WIDTH
  } from '../constants'
  import GridCell from './GridCell.vue'

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
    components: {
      GridCell
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
      },
      onCellDetermineWidth(width, col) {
        this.$emit('determine-cell-auto-width', width, col, this.rowIndex)
      }
    }
  }
</script>
