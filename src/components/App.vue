<template>
  <div id="app" class="flex flex-row fixed absolute--fill overflow-hidden">
    <div class="flex-fill br b--black-20">
      <grid
        data-url="https://localhost/api/v1/streams/kxj9tvrgdq2r/content"
        @metrics-change="onGridMetricsChange"
      ></grid>
    </div>
    <div class="flex-none">
      <grid-metrics class="h-100" style="min-width: 240px" :metrics="grid_metrics"></grid-metrics>
    </div>
  </div>
</template>

<script>
  import Grid from './Grid.vue'
  import GridMetrics from './GridMetrics.vue'

  export default {
    name: 'app',
    components: {
      Grid,
      GridMetrics
    },
    data() {
      return {
        grid_metrics: {}
      }
    },
    methods: {
      onGridMetricsChange(val, old_val) {
        this.grid_metrics = _.assign({}, val)
      }
    }
  }
</script>

<style lang="less">
  /* core */

  html, body {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 100%;
  }

  html {
    height:100%;
  }

  body {
    min-height: 100%;
    overflow: hidden;
  }
</style>
