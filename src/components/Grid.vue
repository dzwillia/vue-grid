<template>
  <div class="flex flex-column relative bg-white h-100 vg-container">
    <!-- grid header -->
    <div class="flex-none overflow-hidden bg-near-white vg-thead">
      <grid-header
        :columns="columns"
        :style="'left: -'+scroll_left+'px'"
        @start-column-resize="onStartColumnResize"
      >
      </grid-header>
    </div>

    <!-- grid body -->
    <div class="flex-fill relative overflow-auto vg-tbody" ref="tbody" @scroll="onScroll">
      <!-- yardstick -->
      <div class="absolute top-0 left-0" :style="'width: 1px; height: '+total_height+'px'"></div>

      <!-- rows -->
      <grid-row
        v-for="(row, index) in rows"
        :row="row"
        :row-index="start+index"
        :row-height="row_height"
        :columns="columns"
      >
      </grid-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import GridHeader from './GridHeader.vue'
  import GridRow from './GridRow.vue'

  const DEFAULT_START = 0
  const DEFAULT_LIMIT = 40
  const DEFAULT_ROW_HEIGHT = 24
  const DEFAULT_COLUMN_WIDTH = 130
  const DEFAULT_COLUMN_INFO = {
    pixel_width: DEFAULT_COLUMN_WIDTH
  }

  export default {
    name: 'vue-grid',
    props: {
      'data-url': {
        default: '',
        type: String
      }
    },
    components: {
      GridHeader,
      GridRow
    },
    watch: {
      scroll_top(val, old_val) {
        this.$emit('scroll-top-change', val, old_val)
      },
      scroll_left(val, old_val) {
        this.$emit('scroll-left-change', val, old_val)
      },
      total_height(val, old_val) {
        this.$emit('total-height-change', val, old_val)
      },
      rendered_row_count(val, old_val) {
        this.$emit('rendered-row-count-change', val, old_val)
      },
      cached_row_count(val, old_val) {
        this.$emit('cached-row-count-change', val, old_val)
      },
      total_row_count(val, old_val) {
        this.$emit('total-row-count-change', val, old_val)
      },
      first_visible_row(val, old_val) {
        this.$emit('first-visible-row-change', val, old_val)
      },
      last_visible_row(val, old_val) {
        this.$emit('last-visible-row-change', val, old_val)
      },
      visible_row_count(val, old_val) {
        this.$emit('visible-row-count-change', val, old_val)
      }
    },
    data() {
      return {
        uid: _.uniqueId('vue-grid-'),

        inited: false,

        start: DEFAULT_START, // initial start
        limit: DEFAULT_LIMIT, // initial limit
        total_row_count: 0, // returned by query

        columns: [],
        resize_col: null,

        rows: [],
        cached_rows: {},
        row_height: DEFAULT_ROW_HEIGHT,

        client_height: 0,
        client_width: 0,

        scroll_top: 0,
        scroll_left: 0,

        mousedown_x: 0,
        mousedown_y: 0,
        mouse_x: 0,
        mouse_y: 0
      }
    },
    computed: {
      fetch_url() {
        var url = this.dataUrl+'?start='+this.start+'&limit='+this.limit
        return this.inited ? url : url + '&metadata=true'
      },
      total_height() {
        return this.row_height * this.total_row_count
      },
      rendered_row_count() {
        return _.size(this.rows)
      },
      cached_row_count() {
        return _.size(this.cached_rows)
      },
      first_visible_row() {
        return Math.floor(this.scroll_top/this.row_height)
      },
      last_visible_row() {
        return Math.ceil((this.scroll_top+this.client_height)/this.row_height)
      },
      visible_row_count() {
        return this.last_visible_row-this.first_visible_row
      },
      resize_delta() {
        return this.mousedown_x == -1 ? 0 : this.mouse_x - this.mousedown_x
      }
    },
    mounted() {
      this.tryFetch()

      this.client_height = this.$el.clientHeight
      this.client_width = this.$el.clientWidth

      this.onDocumentMousedown = (evt) => {
        this.mousedown_x = evt.pageX
        this.mousedown_y = evt.pageY
      }

      this.onDocumentMouseup = (evt) => {
        this.mousedown_x = -1
        this.mousedown_y = -1
        this.resize_col = null
        this.updateStyle('cursor', '')
        this.updateStyle('noselect', '')
      }

      this.onDocumentMousemove = (evt) => {
        this.mouse_x = evt.pageX
        this.mouse_y = evt.pageY

        if (!_.isNil(this.resize_col))
          this.resizeColumn()
      }

      // create document-level event handlers
      document.addEventListener('mousedown', this.onDocumentMousedown)
      document.addEventListener('mouseup', this.onDocumentMouseup)
      document.addEventListener('mousemove', this.onDocumentMousemove)
    },
    beforeDestroy() {
      // destroy document-level event handlers
      document.removeEventListener('mousedown', this.onDocumentMousedown)
      document.removeEventListener('mouseup', this.onDocumentMouseup)
      document.removeEventListener('mousemove', this.onDocumentMousemove)
    },
    methods: {
      tryFetch() {
        axios.get(this.fetch_url).then(response => {
          var resdata = response.data

          if (_.isNumber(resdata.total_count))
            this.total_row_count = resdata.total_count

          // store our column info
          if (!this.inited && _.isArray(resdata.columns))
          {
            // include default column info with each column
            var temp_cols = _.map(resdata.columns, (col) => {
              return _.assign({}, DEFAULT_COLUMN_INFO, col)
            })

            this.columns = [].concat(temp_cols)
          }

          // store the current set of rows
          this.rows = [].concat(resdata.rows)

          // cache the current set of rows
          var start = this.start
          var limit = this.limit
          var row_count = this.total_row_count
          var temp_cached_rows = {}
          var idx = 0

          for (var r = start; r < start+limit && r < row_count; ++r)
          {
            temp_cached_rows[r] = this.rows[idx]
            idx++
          }

          // add the temporary cached rows to our stored cached rows
          this.cached_rows = _.assign({}, this.cached_rows, temp_cached_rows)

          // set our init flag to true so we don't get columns after this
          this.inited = true
        })
      },

      onStartColumnResize(col) {
        this.resize_col = _.cloneDeep(col)
        this.updateStyle('cursor', 'html { cursor: ew-resize !important; }')
        this.updateStyle('noselect', 'html { user-select: none !important; }')
      },

      onScroll: _.throttle(function(evt) {
        var new_scroll_top = this.$refs['tbody'].scrollTop
        var new_scroll_left = this.$refs['tbody'].scrollLeft

        // vertical scrolls
        if (this.scroll_top != new_scroll_top)
        {
          this.scroll_top = new_scroll_top

          // scrolling down
          if (this.last_visible_row >= this.start+this.rendered_row_count)
          {
            this.start = this.first_visible_row
            this.tryFetch()
          }

          // scrolling up
          if (this.first_visible_row < this.start)
          {
            this.start = this.last_visible_row-100
            this.tryFetch()
          }
        }

        // horizontal scrolls
        if (this.scroll_left != new_scroll_left)
        {
          this.scroll_left = new_scroll_left
        }
      }, 10),

      resizeColumn: _.throttle(function(evt) {
        var lookup_col = _.find(this.columns, { name: _.get(this.resize_col, 'name') })
        if (!_.isNil(lookup_col))
        {
          var temp_cols = _.map(this.columns, (col) => {
            if (_.get(col, 'name') == _.get(lookup_col, 'name'))
            {
              var old_width = _.get(this.resize_col, 'pixel_width', DEFAULT_COLUMN_WIDTH)
              return _.assign({}, lookup_col, { pixel_width: old_width + this.resize_delta })
            }

            return col
          })

          this.columns = [].concat(temp_cols)
        }
      }, 150),

      updateStyle(id_suffix, style_str) {
        var head_el = document.head || document.getElementsByTagName('head')[0]
        var style_el = document.getElementById(this.uid+'-'+id_suffix)

        // a style with this ID already exists; remove it
        if (style_el)
          head_el.removeChild(style_el)

        // no style string specified; we're done
        if (!_.isString(style_str) || style_str.length == 0)
          return

        // add style to the <head>
        style_el = document.createElement('style')
        style_el.type = 'text/css'
        style_el.id = this.uid+'-'+id_suffix

        if (style_el.styleSheet)
          style_el.styleSheet.cssText = style_str
           else
          style_el.appendChild(document.createTextNode(style_str))

        head_el.appendChild(style_el)
      }
    }
  }
</script>

<style lang="less">
  @border-color: #ddd;

  .vg-container {
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333;
  }

  .vg-thead {
    box-shadow: inset 0 -1px 0 @border-color;
  }

  .vg-th,
  .vg-td {
    margin-top: 0;
    margin-left: 0;
    border-color: @border-color;
  }

  .vg-th-inner,
  .vg-td-inner {
    min-width: 30px;
    max-width: 1200px;
    padding: 5px 5px 4px;
  }

  /* misc */

  .flex-fill {
    flex: 1 1;
    min-width: 0; /* 1 */
    min-height: 0; /* 1 */
  }

  .lh-1 {
    line-height: 1;
  }

  .cursor-resize-ew {
    cursor: ew-resize;
  }
</style>
