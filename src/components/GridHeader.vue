<template>
  <div class="relative nowrap">
    <grid-header-cell
      class="dib v-top overflow-hidden ba bg-near-white relative tc vg-th"
      v-for="(col, index) in columns"
      :col="col"
      :value="getColumnName(col)"
      :width="col.pixel_width || 0"
      :style="'height: '+(rowHeight+1)+'px'"
      @column-resizer-mousedown="onColumnResizerMousedown"
      @determine-auto-width="onHeaderCellDetermineWidth"
    ></grid-header-cell>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT
  } from '../constants'
  import _ from 'lodash'
  import GridHeaderCell from './GridHeaderCell.vue'

  export default {
    props: {
      'row-height': {
        type: Number,
        default: DEFAULT_ROW_HEIGHT
      },
      'columns': {
        type: Array,
        required: true
      }
    },
    components: {
      GridHeaderCell
    },
    methods: {
      getColumnName(col) {
        return _.get(col, 'name', '')
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
