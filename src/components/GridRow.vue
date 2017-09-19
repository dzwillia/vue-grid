<template>
  <div class="absolute nowrap" :style="row_style">
    <grid-cell
      class="dib v-top overflow-hidden ba vg-td"
      v-for="(col, index) in columns"
      :col="col"
      :value="row[getColumnName(col)]"
      :width="col.pixel_width || 0"
      :style="'height: '+(rowHeight+1)+'px'"
      @determine-auto-width="onCellDetermineWidth"
    ></grid-cell>
  </div>
</template>

<script>
  import {
    DEFAULT_ROW_HEIGHT
  } from '../constants'
  import _ from 'lodash'
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
      'columns': {
        type: Array,
        required: true
      }
    },
    components: {
      GridCell
    },
    computed: {
      row_style() {
        return {
          'top': (this.rowIndex*this.rowHeight)+'px'
        }
      }
    },
    methods: {
      getColumnName(col) {
        return _.get(col, 'name', '')
      },
      onCellDetermineWidth(col, width) {
        this.$emit('determine-cell-auto-width', this.rowIndex, col, width)
      }
    }
  }
</script>
