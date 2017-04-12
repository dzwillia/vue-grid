<template>
  <div class="flex flex-column relative bg-white h-100 bgg-container">
    <!-- grid header -->
    <div class="flex-none overflow-hidden bg-near-white bgg-thead">
      <div class="flex flex-row nowrap relative" ref="thead-tr">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba bgg-td">
          <div class="db lh-1 bgg-th-inner light-silver tr bg-near-white" :style="'width: 60px'"></div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba bg-near-white tc relative bgg-th" v-for="c in columns">
          <!-- cell content -->
          <div class="db lh-1 bgg-th-inner" :style="'width: '+c.pixel_width+'px'">{{c.name}}</div>

          <!-- column resize handle -->
          <div
            class="absolute top-0 bottom-0 right-0 cursor-resize-ew"
            style="width: 4px"
            @mousedown="onColumnResizerMousedown(c)"
          ></div>
        </div>
      </div>
    </div>

    <!-- grid body -->
    <div class="flex-fill relative overflow-auto" ref="tbody" @scroll="onScroll">
      <!-- yardstick -->
      <div class="absolute top-0 left-0" :style="'width: 1px; height: '+total_height+'px'"></div>

      <!-- rows -->
      <div class="flex flex-row nowrap" v-for="(r, index) in rows">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba bgg-td">
          <div class="db lh-1 bgg-td-inner light-silver tr bg-near-white" :style="'width: 60px'">{{start+index+1}}</div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba bgg-td" v-for="c in columns">
          <div class="db lh-1 bgg-td-inner" :style="'width: '+c.pixel_width+'px'">{{r[c.name]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  const ROW_HEIGHT = 24
  const DEFAULT_COLUMN_INFO = {
    pixel_width: 130
  }

  export default {
    name: 'biggrid',
    props: {
      'data-url': {
        default: '',
        type: String
      }
    },
    data() {
      return {
        uid: _.uniqueId('biggrid-'),

        inited: false,

        start: 0,
        limit: 100,
        total_count: 0,

        columns: [],
        resize_col: null,

        rows: [],
        cached_rows: {},

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
        var url = this.dataUrl+'?start='+this.start+'&limit=+'+this.limit
        return this.inited ? url : url + '&metadata=true'
      },
      total_height() {
        return ROW_HEIGHT * this.total_count
      },
      resize_delta() {
        return this.mousedown_x == -1 ? 0 : this.mouse_x - this.mousedown_x
      }
    },
    mounted() {
      this.tryFetch()

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

          this.total_count = resdata.total_count

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
          var row_count = this.total_count
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

      onColumnResizerMousedown(col) {
        this.resize_col = _.cloneDeep(col)
        this.updateStyle('cursor', 'html { cursor: ew-resize !important; }')
        this.updateStyle('noselect', 'html { user-select: none !important; }')
      },

      onScroll: _.throttle(function(evt) {
        // vertical scrolls
        if (this.scroll_top != this.$refs['tbody'].scrollTop)
        {
          this.scroll_top = this.$refs['tbody'].scrollTop
        }

        // horizontal scrolls
        if (this.scroll_left != this.$refs['tbody'].scrollLeft)
        {
          this.scroll_left = this.$refs['tbody'].scrollLeft

          // sync up fixed header with content horizontal scroll offset
          this.$refs['thead-tr'].style = 'left: -'+this.scroll_left+'px'
        }
      }, 10),

      resizeColumn: _.throttle(function(evt) {
        var lookup_col = _.find(this.columns, { name: _.get(this.resize_col, 'name') })
        if (!_.isNil(lookup_col))
        {
          var temp_cols = _.map(this.columns, (col) => {
            if (_.get(col, 'name') == _.get(lookup_col, 'name'))
            {
              var old_width = _.get(this.resize_col, 'pixel_width', 120)
              return _.assign({}, lookup_col, { pixel_width: old_width + this.resize_delta })
            }

            return col
          })

          this.columns = [].concat(temp_cols)
        }
      }, 80),

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

  .bgg-container {
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333;
  }

  .bgg-thead {
    box-shadow: inset 0 -1px 0 @border-color;
  }

  .bgg-th,
  .bgg-td {
    height: 24px;
    margin-top: -1px;
    margin-left: -1px;
    border-color: @border-color;
  }

  .bgg-th-inner,
  .bgg-td-inner {
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
