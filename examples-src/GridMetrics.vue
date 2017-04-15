<template>
  <div>
    <div class="f5 pa2 mid-gray bg-near-white bb b--light-gray">Metrics</div>
    <table class="w-100 pv1 ph2 f6 dark-gray">
      <tbody>
        <tr>
          <td class="pv1 pr2">Scroll top:</td>
          <td class="pv1 pl2 tr">{{metrics.scroll_top}}</td>
        </tr>
        <tr>
          <td class="pv1 pr2">Scroll left:</td>
          <td class="pv1 pl2 tr">{{metrics.scroll_left}}</td>
        </tr>
        <tr>
          <td class="pv1 pr2">Rendered row count:</td>
          <td class="pv1 pl2 tr">{{metrics.rendered_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1 pr2">Cached row count:</td>
          <td class="pv1 pl2 tr">{{metrics.cached_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1 pr2">Total row count:</td>
          <td class="pv1 pl2 tr">{{metrics.total_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1 pr2">First visible row:</td>
          <td class="pv1 pl2 tr">{{metrics.first_visible_row}}</td>
        </tr>
        <tr>
          <td class="pv1 pr2">Last visible row:</td>
          <td class="pv1 pl2 tr">{{metrics.last_visible_row}}</td>
        </tr>
        <tr>
          <td class="pv1 pr2">Visible row count:</td>
          <td class="pv1 pl2 tr">{{metrics.visible_row_count}}</td>
        </tr>
        <tr>
          <td class="pv1" colspan="2">
            First visible column:
            <div class="mt2">
              <table class="w-100 collapse" style="font-size: 11px">
                <tbody>
                  <tr v-for="(v, k) in first_visible_column">
                    <td class="pa1 ba bb b--light-silver pr3 w1">{{k}}</td>
                    <td class="pa1 ba bb b--light-silver tr">{{v}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td class="pv1" colspan="2">
            Last visible column:
            <div class="mt2">
              <table class="w-100 collapse" style="font-size: 11px">
                <tbody>
                  <tr v-for="(v, k) in last_visible_column">
                    <td class="pa1 ba bb b--light-silver pr3 w1">{{k}}</td>
                    <td class="pa1 ba bb b--light-silver tr">{{v}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td class="pv1 pr2">Visible column count:</td>
          <td class="pv1 pl2 tr">{{metrics.visible_column_count}}</td>
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
