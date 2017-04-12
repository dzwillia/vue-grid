<template>
  <div class="flex flex-column relative bg-white h-100 big-container">
    <!-- grid header -->
    <div class="flex-none overflow-hidden bg-near-white big-thead">
      <div class="flex flex-row nowrap relative" ref="thead-tr">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba big-td">
          <div class="db lh-1 big-th-inner light-silver tr bg-near-white" :style="'width: 60px'"></div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba bg-near-white tc relative big-th" v-for="c in columns">
          <div class="db lh-1 big-th-inner" style="width: 130px">{{c.name}}</div>
        </div>
      </div>
    </div>

    <!-- grid body -->
    <div class="flex-fill overflow-auto" ref="tbody" @scroll="onScroll">
      <div class="flex flex-row nowrap" v-for="(r, index) in rows">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba big-td">
          <div class="db lh-1 big-td-inner light-silver tr bg-near-white" :style="'width: 60px'">{{start+index+1}}</div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba big-td" v-for="c in columns">
          <div class="db lh-1 big-td-inner" style="width: 130px">{{r[c.name]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

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
        inited: false,

        start: 0,
        limit: 100,
        total_row_count: 0,

        columns: [],
        rows: [],

        scroll_top: 0,
        scroll_left: 0
      }
    },
    computed: {
      fetch_url() {
        var url = this.dataUrl+'?start='+this.start+'&limit=+'+this.limit
        return this.inited ? url : url + '&metadata=true'
      }
    },
    mounted() {
      this.tryFetch()
    },
    methods: {
      tryFetch() {
        axios.get(this.fetch_url).then(response => {
          var resdata = response.data

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

          // set our init flag to true so we don't get columns after this
          this.inited = true
        })
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
      }, 10)
    }
  }
</script>

<style lang="less">
  @border-color: #ddd;

  .big-container {
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333;
  }

  .big-thead {
    box-shadow: inset 0 -1px 0 @border-color;
  }

  .big-th,
  .big-td {
    height: 24px;
    margin-top: -1px;
    margin-left: -1px;
    border-color: @border-color;
  }

  .big-th-inner,
  .big-td-inner {
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
</style>
