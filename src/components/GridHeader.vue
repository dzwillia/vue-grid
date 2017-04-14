<template>
  <div class="relative">
    <!-- row handle -->
    <div class="overflow-hidden ba absolute z-1 vg-th" :style="'height: '+(rowHeight+1)+'px'">
      <div class="h-100 lh-1 light-silver tr bg-near-white vg-th-inner" :style="row_handle_style"></div>
    </div>

    <!-- cells -->
    <div class="flex flex-row nowrap" :style="'padding-left: '+row_handle_width+'px'">
      <div class="flex-none overflow-hidden ba bg-near-white tc relative vg-th" :style="'height: '+(rowHeight+1)+'px'" v-for="col in columns">
        <!-- cell content -->
        <div class="h-100 lh-1 vg-th-inner" :style="'width: '+col.pixel_width+'px'">{{col.name}}</div>

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
  const DEFAULT_ROW_HEIGHT = 23
  const DEFAULT_ROW_HANDLE_WIDTH = 70
  const DEFAULT_COLUMN_RESIZE_HANDLE_WIDTH = 4

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
        row_handle_width: DEFAULT_ROW_HANDLE_WIDTH,
        column_resize_handle_width: DEFAULT_COLUMN_RESIZE_HANDLE_WIDTH
      }
    },
    computed: {
      row_handle_style() {
        return 'width: '+(this.row_handle_width)+'px'
      }
    },
    methods: {
      onColumnResizerMousedown(col) {
        this.$emit('start-column-resize', col)
      }
    }
  }
</script>
