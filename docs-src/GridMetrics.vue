<template>
  <div>
    <div class="f6 b pv2 ph2 ttu mid-gray bg-near-white bt bb b--black-10" style="font-size: 11px">Metrics</div>
    <table class="w-100 pv1 ph2 f6 dark-gray">
      <tbody>
        <tr>
          <td class="pv1a pr2 b ttu mid-gray bb b--black-10" style="font-size: 11px" colspan="2">Dimensions</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Mouse position:</td>
          <td class="pv1a pl2 tr">
            x: <grid-metrics-value :val="metrics.mouse_x"></grid-metrics-value>
            y: <grid-metrics-value :val="metrics.mouse_y"></grid-metrics-value>
          </td>
        </tr>
        <tr>
          <td class="pv1a pr2">Scroll top:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.scroll_top"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Scroll left:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.scroll_left"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Offset top:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.offset_top"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Offset left:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.offset_left"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Offset height:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.offset_height"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Offset width:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.offset_width"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Client height:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.client_height"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Client width:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.client_width"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Content height:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.total_height"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Content width:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.total_width"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Row handle width:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.row_handle_width"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2 b ttu mid-gray bb b--black-10" style="font-size: 11px" colspan="2"><div class="mt2">Calculated Values</div></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Rendered row count:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.rendered_row_count"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Cached row count:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.cached_row_count"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">First visible row:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.first_visible_row"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Last visible row:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.last_visible_row"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Visible row count:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.visible_row_count"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Total row count:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.total_row_count"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Visible column count:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.visible_column_count"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2">Total column count:</td>
          <td class="pv1a pl2 tr"><grid-metrics-value :val="metrics.total_column_count"></grid-metrics-value></td>
        </tr>
        <tr>
          <td class="pv1a pr2 b ttu mid-gray bb b--black-10" style="font-size: 11px" colspan="2"><div class="mt2">First visible column</div></td>
        </tr>
        <tr>
          <td class="pv1a" colspan="2">
            <div class="mt1">
              <table class="w-100 collapse" style="font-size: 11px">
                <thead>
                  <tr>
                    <th class="pv1a ph1 bg-near-white ba b--light-moon-gray fw6 pr3 w1 tl">Attribute</th>
                    <th class="pv1a ph1 bg-near-white ba b--light-moon-gray fw6 w1 tr">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, k) in first_visible_column">
                    <td class="pv1a ph1 ba b--light-moon-gray pr3 w1">{{k}}</td>
                    <td class="pv1a ph1 ba b--light-moon-gray tr"><grid-metrics-value :val="v"></grid-metrics-value></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td class="pv1a pr2 b ttu mid-gray bb b--black-10" style="font-size: 11px" colspan="2"><div class="mt2">Last visible column</div></td>
        </tr>
        <tr>
          <td class="pv1a" colspan="2">
            <div class="mt1">
              <table class="w-100 collapse" style="font-size: 11px">
                <thead>
                  <tr>
                    <th class="pv1a ph1 bg-near-white ba b--light-moon-gray fw6 pr3 w1 tl">Attribute</th>
                    <th class="pv1a ph1 bg-near-white ba b--light-moon-gray fw6 w1 tr">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, k) in last_visible_column">
                    <td  class="pv1a ph1 ba b--light-moon-gray pr3 w1">{{k}}</td>
                    <td  class="pv1a ph1 ba b--light-moon-gray tr"><grid-metrics-value :val="v"></grid-metrics-value></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import _ from 'lodash'
  import GridMetricsValue from './GridMetricsValue.vue'

  export default {
    props: {
      'metrics': {
        type: Object,
        default: () => { return {} }
      }
    },
    components: {
      GridMetricsValue
    },
    computed: {
      first_visible_column() {
        var col = _.get(this.metrics, 'first_visible_column', {})
        return col
      },
      last_visible_column() {
        var col = _.get(this.metrics, 'last_visible_column', {})
        return col
      }
    }
  }
</script>

<style>
  .pv1a {
    padding-top: 2px;
    padding-bottom: 2px;
  }
</style>
