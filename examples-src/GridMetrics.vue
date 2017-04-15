<template>
  <div>
    <div class="f5 pa2 mid-gray bg-near-white bb b--light-gray">Metrics</div>
    <table class="w-100 pv1 ph2 f6 dark-gray">
      <tbody>
        <tr>
          <td class="pv1a pr2">Scroll top:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.scroll_top}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Scroll left:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.scroll_left}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Row handle width:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.row_handle_width}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Rendered row count:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.rendered_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Cached row count:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.cached_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">First visible row:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.first_visible_row}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Last visible row:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.last_visible_row}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Total row count:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.total_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1a pr2">Visible row count:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.visible_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1a" colspan="2">
            First visible column:
            <div class="mt1">
              <table class="w-100 collapse" style="font-size: 11px">
                <tbody>
                  <tr v-for="(v, k) in first_visible_column">
                    <td class="pa1 ba bb b--light-moon-gray pr3 w1">{{k}}</td>
                    <td class="pa1 ba bb b--light-moon-gray fw6 tr">{{v}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td class="pv1a" colspan="2">
            Last visible column:
            <div class="mt1">
              <table class="w-100 collapse" style="font-size: 11px">
                <tbody>
                  <tr v-for="(v, k) in last_visible_column">
                    <td class="pa1 ba bb b--light-moon-gray pr3 w1">{{k}}</td>
                    <td class="pa1 ba bb b--light-moon-gray fw6 tr">{{v}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td class="pv1a pr2">Visible column count:</td>
          <td class="pv1a pl2 fw6 tr">{{metrics.visible_column_count}}</td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
  export default {
    props: {
      'metrics': {
        type: Object,
        default: () => { return {} }
      }
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
