<template>
  <div>
    <div class="f5 pa2 mb1 mid-gray bg-near-white bb b--black-10">Grid Metrics</div>
    <table class="w-100 ph2 f6 dark-gray">
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
    }
  }
</script>
