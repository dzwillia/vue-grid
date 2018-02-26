<template>
  <div class="flex flex-column relative bg-white h-100 vg-container" ref="container">

    <div class="flex flex-column justify-center h-100" v-if="!inited">
      <spinner size="large" message="Loading..."></spinner>
    </div>

    <div class="flex flex-column relative bg-white h-100 overflow-hidden" v-else>
      <!-- grid header row handle -->
      <grid-header-row-handle class="z-2 ba bg-near-white vg-td"
        :row-height="row_height"
        :row-handle-width="row_handle_width"
        @start-row-handle-resize="onStartRowHandleResize"
        v-if="inited"
      ></grid-header-row-handle>

      <!-- grid header -->
      <div
        class="flex-none overflow-hidden bg-near-white vg-thead"
        :style="'margin-left: '+(row_handle_width+left_of_render_cols_width-scroll_left+1)+'px'"
      >
        <grid-header
          :row-handle-width="row_handle_width"
          :columns="render_cols"
          @start-column-resize="onStartColumnResize"
          @determine-cell-auto-width="initializeColumnWidths"
        ></grid-header>
      </div>

      <!-- row handles -->
      <div class="absolute z-1" :style="'top: '+(row_height-scroll_top)+'px'">
        <grid-row-handle
          v-for="(row, index) in render_rows"
          class="ba bg-near-white vg-td"
          :row-index="start+index"
          :row-height="row_height"
          :row-handle-width="row_handle_width"
        ></grid-row-handle>
      </div>

      <!-- grid body -->
      <div
        ref="tbody"
        class="flex-fill relative overflow-auto vg-tbody"
        :style="'margin-left: '+(row_handle_width+1)+'px'"
        @scroll="onScroll"
        v-resize="onResize"
      >
        <!-- yardsticks -->
        <div class="absolute top-0 left-0" :style="'z-index: -1; width: 1px; height: '+total_height+'px'"></div>
        <div class="absolute top-0 left-0" :style="'z-index: -1; height: 1px; width: '+total_width+'px'"></div>

        <!-- rows -->
        <grid-row
          v-for="(row, index) in render_rows"
          :row="row"
          :row-index="start+index"
          :row-height="row_height"
          :columns="render_cols"
          :style="'padding-left: '+left_of_render_cols_width+'px'"
          @determine-cell-auto-width="initializeColumnWidths"
        ></grid-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    DEFAULT_START,
    DEFAULT_LIMIT,
    DEFAULT_ROW_HEIGHT,
    DEFAULT_ROW_HANDLE_WIDTH,
    ROW_HANDLE_MIN_WIDTH,
    ROW_HANDLE_MAX_WIDTH,
    DEFAULT_COLUMN_WIDTH,
    COLUMN_MIN_WIDTH,
    COLUMN_MAX_WIDTH
  } from '../constants'
  import _ from 'lodash'
  import axios from 'axios'
  import resize from 'vue-resize-directive'
  import GridHeaderRowHandle from './GridHeaderRowHandle.vue'
  import GridHeader from './GridHeader.vue'
  import GridRowHandle from './GridRowHandle.vue'
  import GridRow from './GridRow.vue'
  import Spinner from 'vue-simple-spinner'

  var getOffset = function(el) {
    var top = 0
    var left = 0

    do {
      if (!isNaN(el.offsetTop))
          top += el.offsetTop
      if (!isNaN(el.offsetLeft))
          left += el.offsetLeft
    } while (el = el.offsetParent)

    return { left, top }
  }

  export default {
    props: {
      'data-url': {
        type: String,
        default: ''
      },
      'custom-headers': {
        type: Object,
        default: () => { return {} }
      },
      /* show empty cells on vertical scroll */
      'live-scroll': {
        type: Boolean,
        default: false
      },
      /* remove off-screen cells from the DOM on horizontal scroll */
      'virtual-scroll': {
        type: Boolean,
        default: true
      }
    },
    components: {
      GridHeaderRowHandle,
      GridHeader,
      GridRowHandle,
      GridRow,
      Spinner
    },
    directives: {
      resize
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
      },
      first_visible_column(val, old_val) {
        this.$emit('first-visible-column-change', val, old_val)
      },
      last_visible_column(val, old_val) {
        this.$emit('last-visible-column-change', val, old_val)
      },
      visible_column_count(val, old_val) {
        this.$emit('visible-column-count-change', val, old_val)
      },
      metrics(val, old_val) {
        this.$emit('metrics-change', val, old_val)
      }
    },
    data() {
      return {
        uid: _.uniqueId('vue-grid-'),

        inited: false,
        col_widths_inited: false,

        start: DEFAULT_START, // initial start
        limit: DEFAULT_LIMIT, // initial limit
        total_row_count: 0, // returned by query

        columns: [],
        resize_col: null,
        resize_row_handle: null,

        rows: [],
        cached_rows: {},
        row_height: DEFAULT_ROW_HEIGHT,
        row_handle_width: DEFAULT_ROW_HANDLE_WIDTH,

        client_height: 0,
        client_width: 0,

        container_offset_top: 0,
        container_offset_left: 0,

        offset_top: 0,
        offset_left: 0,
        offset_height: 0,
        offset_width: 0,

        scroll_top: 0,
        scroll_left: 0,

        mousedown_x: -1,
        mousedown_y: -1,
        mouse_x: 0,
        mouse_y: 0,

        is_horizontal_scroll_active: false
      }
    },
    computed: {
      total_height() {
        return this.row_height * this.total_row_count
      },
      total_width() {
        return _.sum(_.map(this.columns, 'pixel_width'))
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
        return Math.min(Math.ceil((this.scroll_top+this.client_height)/this.row_height), this.total_row_count)
      },
      visible_row_count() {
        return this.last_visible_row-this.first_visible_row
      },
      rows_in_cache() {
        var missing_rows = false

        if (this.cached_row_count == 0)
          return false

        for (var i = this.start; i < this.start+this.limit; ++i)
        {
          if (i < this.total_row_count && !this.cached_rows[i])
          {
            missing_rows = true
            break
          }
        }

        return missing_rows ? false : true
      },
      render_rows() {
        if (this.liveScroll)
          return this.rows

        var rows = []
        for (var i = this.start; i < this.start+this.limit; ++i)
        {
          if (i < this.total_row_count)
            rows.push(this.cached_rows[i] || {})
        }
        return rows
      },
      left_of_render_cols() {
        if (!this.virtualScroll)
          return []

        // this value should be an empty array since we're showing
        // all columns when scrolling horizontally
        if (this.is_potential_horizontal_scroll)
          return []

        var left = (-1 * this.scroll_left)
        return _.filter(this.columns, (c) => {
          var is_offscreen_left = left+c.pixel_width+1 < 0
          left += c.pixel_width+1
          return is_offscreen_left
        })
      },
      left_of_render_cols_width() {
        return _.sum(_.map(this.left_of_render_cols, (c) => { return c.pixel_width+1 }))
      },
      render_cols() {
        if (!this.virtualScroll)
          return this.columns

        // horizontal scroll operations are far more performant with
        // all columns visible since this is a normal browser scroll event
        // and there are no expensive calculations that need to happen
        if (this.is_potential_horizontal_scroll)
          return this.columns

        // if we haven't yet initialized our column widths,
        // we need to return all columns so that the cells
        // are renderend and the cell contents can be measured
        if (!this.col_widths_inited)
          return this.columns

        var left = (-1 * this.scroll_left)
        return _.filter(this.columns, (c) => {
          var is_offscreen_left = left+c.pixel_width+1 < 0
          var is_offscreen_right = left > this.client_width
          left += c.pixel_width+1
          return !is_offscreen_left && !is_offscreen_right
        })
      },
      first_visible_column() {
        return _.first(this.render_cols)
      },
      last_visible_column() {
        return _.last(this.render_cols)
      },
      visible_column_count() {
        return _.size(this.render_cols)
      },
      total_column_count() {
        return _.size(this.columns)
      },
      resize_delta() {
        return this.mousedown_x == -1 ? 0 : this.mouse_x - this.mousedown_x
      },
      vertical_scrollbar_left() {
        return this.offset_left+this.client_width
      },
      vertical_scrollbar_right() {
        return this.offset_left+this.offset_width
      },
      horizontal_scrollbar_top() {
        return this.offset_top+this.client_height
      },
      horizontal_scrollbar_bottom() {
        return this.offset_top+this.offset_height
      },
      is_potential_horizontal_scroll() {
        if (this.is_horizontal_scroll_active)
          return true

        // handle bottom-right corner: if we're closer to the vertical
        // scrollbar than we are to the horizontal scrollbar, return 'false'
        if (this.mouse_x/this.vertical_scrollbar_left >
            this.mouse_y/this.horizontal_scrollbar_top)
          return false

        // for the rest of the viewport, return 'true' when we get close
        // to the horizontal scrollbar
        if (this.mouse_y >= this.horizontal_scrollbar_top*2/3 &&
            this.mouse_y < this.horizontal_scrollbar_bottom)
        {
          return true
        }

        return false
      },
      metrics() {
        var computed_data = this._computedWatchers
        computed_data = _.omit(computed_data, ['metrics'])
        computed_data = _.mapValues(computed_data, (k, v) => { return this[v] })

        var filtered_data = _.pick(this.$data, [
          'start',
          'limit',
          'rows',
          'total_row_count',
          'columns',
          'total_column_count',
          'cached_rows',
          'row_height',
          'row_handle_width',
          'mouse_x',
          'mouse_y',
          'scroll_top',
          'scroll_left',
          'offset_top',
          'offset_left',
          'offset_height',
          'offset_width',
          'client_height',
          'client_width',
          'total_height',
          'total_width'
        ])

        return _.assign({}, filtered_data, computed_data)
      }
    },
    mounted() {
      this.active_xhr = null
      this.cancelXhr = null
      this.default_col_widths = {}

      // initialize container offset
      var offset = getOffset(this.$refs['container'])
      this.container_offset_top = offset.top
      this.container_offset_left = offset.left

      // initialize the client dimensions
      this.client_height = this.$el.clientHeight
      this.client_width = this.$el.clientWidth

      // establish our debounced and throttled methods (we need these functions
      // to be members of this component since we've run into reference
      // issues using _.debounce() and _.throttle() directly on the method
      this.tryFetchDebounced = _.debounce(this.tryFetch, 50, { leading: false, trailing: true })
      this.resizeRowHandleThrottled = _.throttle(this.resizeRowHandle, 20)
      this.resizeColumnThrottled = _.throttle(this.resizeColumn, 20)
      //this.scrollVerticalThrottled = _.debounce(this.scrollVertical, 5, { leading: false, trailing: true })
      this.scrollVerticalThrottled = _.throttle(this.scrollVertical, 5, { leading: false, trailing: true })

      // do our initial fetch
      this.tryFetch()

      // document-level mouse down
      this.onDocumentMousedown = (evt) => {
        this.mousedown_x = evt.pageX
        this.mousedown_y = evt.pageY
      }

      // document-level mouse up
      this.onDocumentMouseup = (evt) => {
        this.mousedown_x = -1
        this.mousedown_y = -1
        this.resize_col = null
        this.resize_row_handle = null
        this.is_horizontal_scroll_active = false
        this.updateStyle('cursor', '')
        this.updateStyle('noselect', '')
      }

      // document-level mouse move
      this.onDocumentMousemove = (evt) => {
        this.mouse_x = evt.pageX
        this.mouse_y = evt.pageY

        if (!_.isNil(this.resize_row_handle))
          this.resizeRowHandleThrottled()

        if (!_.isNil(this.resize_col))
          this.resizeColumnThrottled()
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
      getFetchUrl(start, limit) {
        var url = this.dataUrl+'?start='+start+'&limit='+limit
        return this.inited ? url : url + '&metadata=true'
      },
      tryFetch() {
        var me = this

        // we need to get the start and limit before we do the AJAX call this the grid's
        // start and limit could potentially have changed by the time the callback resolves
        var fetch_start = this.start
        var fetch_limit = this.limit
        var fetch_url = this.getFetchUrl(fetch_start, fetch_limit)

        // if the last XHR is still active, kill it now
        if (!_.isNil(this.active_xhr) && !_.isNil(this.cancelXhr))
        {
          this.cancelXhr()

          // reset XHR variables
          this.active_xhr = null
          this.cancelXhr = null
        }

        // if all of the rows exist in our row cache, we're done
        if (this.rows_in_cache)
          return

        var CancelToken = axios.CancelToken
        this.active_xhr = axios.get(fetch_url, {
          headers: this.customHeaders,
          cancelToken: new CancelToken(function executor(c) {
            // an executor function receives a cancel function as a parameter
            me.cancelXhr = c
          })
        }).then(response => {
          var resdata = response.data

          if (_.isNumber(resdata.total_count))
            this.total_row_count = resdata.total_count

          // store our column info
          if (!this.inited && _.isArray(resdata.columns))
          {
            // include default column info with each column
            var temp_cols = _.map(resdata.columns, (col) => {
              return _.assign({ pixel_width: DEFAULT_COLUMN_WIDTH }, col)
            })

            this.columns = [].concat(temp_cols)
          }

          // store the current set of rows
          this.rows = [].concat(resdata.rows)

          // cache the current set of rows
          var start = fetch_start
          var limit = fetch_limit
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

          // reset XHR variables
          this.active_xhr = null
          this.cancelXhr = null
        })
      },

      onStartRowHandleResize(col) {
        this.resize_row_handle = { old_width: this.row_handle_width }
        this.updateStyle('cursor', 'html, body { cursor: ew-resize !important; }')
        this.updateStyle('noselect', 'html, body { -moz-user-select: none !important; user-select: none !important }')
      },

      onStartColumnResize(col) {
        this.resize_col = _.cloneDeep(col)
        this.updateStyle('cursor', 'html, body { cursor: ew-resize !important; }')
        this.updateStyle('noselect', 'html, body { -moz-user-select: none !important; user-select: none !important }')
      },

      onResize(resize_el) {
        var container_el = this.$refs['container']
        this.offset_top = this.container_offset_top+resize_el.offsetTop
        this.offset_left = this.container_offset_left+resize_el.offsetLeft
        this.offset_height = resize_el.offsetHeight
        this.offset_width = resize_el.offsetWidth
        this.client_height = resize_el.clientHeight
        this.client_width = resize_el.clientWidth

        this.$nextTick(() => {
          // check to see if all of the visible rows have been queried for
          if (this.last_visible_row >= this.start+this.rendered_row_count)
          {
            this.start = this.first_visible_row
            this.tryFetchDebounced()
          }
        })
      },

      onScroll() {
        var new_scroll_top = this.$refs['tbody'].scrollTop
        var new_scroll_left = this.$refs['tbody'].scrollLeft

        // vertical scrolls
        if (this.scroll_top != new_scroll_top)
          return this.scrollVerticalThrottled(new_scroll_top, this.scroll_top)

        // horizontal scrolls
        if (this.scroll_left != new_scroll_left)
          return this.scrollHorizontal(new_scroll_left, this.scroll_left)
      },

      scrollVertical(val, old_val) {
        this.scroll_top = val

        // scrolling down
        if (this.last_visible_row >= this.start+this.rendered_row_count)
        {
          this.start = this.first_visible_row
          this.tryFetchDebounced()
        }

        // scrolling up
        if (this.first_visible_row < this.start)
        {
          this.start = this.first_visible_row
          this.tryFetchDebounced()
        }
      },

      scrollHorizontal(val, old_val) {
        this.is_horizontal_scroll_active = true
        this.scroll_left = val
      },

      resizeRowHandle() {
        var old_width = this.resize_row_handle.old_width
        var new_width = old_width + this.resize_delta
        new_width = Math.max(ROW_HANDLE_MIN_WIDTH, new_width)
        new_width = Math.min(ROW_HANDLE_MAX_WIDTH, new_width)
        this.row_handle_width = new_width
      },

      resizeColumn() {
        var lookup_col = _.find(this.columns, { name: _.get(this.resize_col, 'name') })
        if (!_.isNil(lookup_col))
        {
          var temp_cols = _.map(this.columns, (col) => {
            if (_.get(col, 'name') == _.get(lookup_col, 'name'))
            {
              var old_width = _.get(this.resize_col, 'pixel_width', DEFAULT_COLUMN_WIDTH)
              var pixel_width = old_width + this.resize_delta
              pixel_width = Math.max(COLUMN_MIN_WIDTH, pixel_width)
              pixel_width = Math.min(COLUMN_MAX_WIDTH, pixel_width)
              return _.assign({}, lookup_col, { pixel_width })
            }

            return col
          })

          this.columns = [].concat(temp_cols)
        }
      },

      initializeColumnWidths(row_index, col, width) {
        // once we've initialized our column widths, we're done
        if (this.col_widths_inited)
          return

        var min_width = _.defaultTo(this.default_col_widths[col.name], COLUMN_MIN_WIDTH)
        var new_width = Math.max(min_width, width+20) // make columns a little wider than they need to be
        new_width = Math.min(new_width, COLUMN_MAX_WIDTH)
        this.default_col_widths[col.name] = new_width

        var is_header = row_index == 'header'
        var is_last_row = row_index == this.rendered_row_count-1

        if (is_header || is_last_row)
        {
          var temp_cols = _.map(this.columns, (col) => {
            var pixel_width = this.default_col_widths[col.name]
            return _.assign({}, col, { pixel_width })
          })

          this.columns = [].concat(temp_cols)
          this.$nextTick(() => { this.col_widths_inited = true })
        }
      },

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

<style>
  .vg-container {
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333;
  }

  .vg-thead {
    box-shadow: inset 0 -1px 0 #ddd;
  }

  .vg-th,
  .vg-td {
    margin-top: -1px;
    margin-left: -1px;
    padding-top: 1px;
    border-color: #ddd;
  }

  .vg-th-inner,
  .vg-td-inner {
    padding: 4px 5px 4px;
  }

  /* misc */

  .flex-fill {
    flex: 1 1;
    min-width: 0; /* 1 */
    min-height: 0; /* 1 */
  }

  .b--light-moon-gray {
    border-color: #ddd;
  }

  .lh-1 {
    line-height: 1;
  }

  .cursor-resize-ew {
    cursor: ew-resize;
  }
</style>
