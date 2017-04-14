<template>
  <div class="flex flex-row nowrap relative" ref="thead-tr">
    <!-- row handle -->
    <div class="flex-none db overflow-hidden ba bgg-th">
      <div class="db lh-1 bgg-th-inner light-silver tr bg-near-white" :style="row_handle_style"></div>
    </div>

    <!-- cells -->
    <div class="flex-none db overflow-hidden ba bg-near-white tc relative bgg-th" :style="'height: '+rowHeight+'px'" v-for="col in columns">
      <!-- cell content -->
      <div class="db lh-1 bgg-th-inner" :style="'width: '+col.pixel_width+'px'">{{col.name}}</div>

      <!-- column resize handle -->
      <div
        class="absolute top-0 bottom-0 right-0 cursor-resize-ew"
        style="width: 4px"
        @mousedown="onColumnResizerMousedown(col)"
      ></div>
    </div>
  </div>
</template>

<script>
  const DEFAULT_ROW_HEIGHT = 24
  const DEFAULT_ROW_HANDLE_WIDTH = 60

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
    data() {
      return {
        row_handle_width: DEFAULT_ROW_HANDLE_WIDTH
      }
    },
    computed: {
      row_handle_style() {
        return 'width: '+this.row_handle_width+'px'
      }
    },
    methods: {
      onColumnResizerMousedown(col) {
        this.$emit('start-column-resize', col)
      }
    }
  }
</script>
