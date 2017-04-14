<template>
  <div>
    <div class="f5 fw6 pb1 mb2 mid-gray bb b--black-10">Metrics</div>
    <table class="w-100 f6 dark-gray">
      <tr>
        <td class="pv1">Scroll top</td>
        <td class="pv1 tr">{{metrics.scroll_top}}</td>
      </tr>
      <tr>
        <td class="pv1">Scroll left</td>
        <td class="pv1 tr">{{metrics.scroll_left}}</td>
      </tr>
      <tr>
        <td class="pv1">Rendered row count</td>
        <td class="pv1 tr">{{metrics.rendered_row_count}}</td>
      </tr>
      <tr>
        <td class="pv1">Cached row count</td>
        <td class="pv1 tr">{{metrics.cached_row_count}}</td>
      </tr>
      <tr>
        <td class="pv1">Total row count</td>
        <td class="pv1 tr">{{metrics.total_row_count}}</td>
      </tr>
      <tr>
        <td class="pv1">First visible row</td>
        <td class="pv1 tr">{{metrics.first_visible_row}}</td>
      </tr>
      <tr>
        <td class="pv1">Last visible row</td>
        <td class="pv1 tr">{{metrics.last_visible_row}}</td>
      </tr>
      <tr>
        <td class="pv1">Visible row count</td>
        <td class="pv1 tr">{{metrics.visible_row_count}}</td>
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
