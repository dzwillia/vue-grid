<template>
  <div class="flex flex-row nowrap absolute" :style="row_style">
    <!-- row handle -->
    <div class="flex-none db overflow-hidden ba bgg-td" :style="'height: '+rowHeight+'px'">
      <div class="db h-100 lh-1 bgg-td-inner light-silver tr bg-near-white" :style="row_handle_style">{{rowIndex+1}}</div>
    </div>

    <!-- cells -->
    <div class="flex-none db overflow-hidden ba bgg-td" :style="'height: '+rowHeight+'px'" v-for="col in columns">
      <div class="db h-100 lh-1 bgg-td-inner" :style="'width: '+col.pixel_width+'px'">{{row[col.name]}}</div>
    </div>
  </div>
</template>

<script>
  const DEFAULT_ROW_HEIGHT = 24
  const DEFAULT_ROW_HANDLE_WIDTH = 60

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
    data() {
      return {
        row_handle_width: DEFAULT_ROW_HANDLE_WIDTH
      }
    },
    computed: {
      row_style() {
        return 'top: '+(this.rowIndex*(this.rowHeight-1))+'px'
      },
      row_handle_style() {
        return 'width: '+this.row_handle_width+'px'
      }
    }
  }
</script>
