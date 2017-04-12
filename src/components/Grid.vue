<template>
  <div class="flex flex-column relative h-100 big-container">
    <!-- grid header -->
    <div class="flex-none overflow-hidden bg-near-white big-thead">
      <div class="flex flex-row nowrap relative">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba big-td">
          <div class="db lh-1 big-th-inner light-silver tr bg-near-white" :style="'width: 60px'"></div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba bg-near-white tc relative big-th" v-for="c in columns">
          <div class="db big-th-inner" style="width: 130px">{{c.name}}</div>
        </div>
      </div>
    </div>

    <!-- grid body -->
    <div class="flex-fill overflow-auto">
      <div class="flex flex-row nowrap" v-for="(r, index) in rows">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba big-td">
          <div class="db lh-1 big-td-inner light-silver tr bg-near-white" :style="'width: 60px'">{{start+index+1}}</div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba big-td" v-for="c in columns">
          <div class="db big-td-inner" style="width: 130px">{{r[c.name]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import simple_data from '../data/simple'

  const DEFAULT_COLUMN_INFO = {
    pixel_width: 130
  }

  export default {
    name: 'biggrid',
    props: {
      'data-url': {
        default: null
      }
    },
    data() {
      return {
        inited: false,

        start: 0,
        limit: 100,
        total_row_count: simple_data.total_count,

        columns: simple_data.columns,
        rows: simple_data.rows
      }
    },
    mounted() {

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
