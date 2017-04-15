<template>
  <div id="app" class="flex flex-row fixed absolute--fill overflow-hidden">
    <div class="flex-fill br b--black-20">
      <grid
        data-url="https://test.flex.io/api/v1/streams/f7bmlcz26w1z/content"
        :live-scroll="live_scroll"
        @metrics-change="onGridMetricsChange"
      ></grid>
    </div>
    <div class="flex-none overflow-auto" style="min-width: 240px">
      <grid-metrics class="w-100" :metrics="metrics"></grid-metrics>
      <grid-events class="w-100 bt b--light-gray"></grid-events>
      <grid-options
        class="w-100 bt b--light-gray"
        :live-scroll="live_scroll"
        @option-change="onGridOptionChange"
      >
      </grid-options>
    </div>
  </div>
</template>

<script>
  import Grid from './Grid.vue'
  import GridMetrics from './GridMetrics.vue'
  import GridEvents from './GridEvents.vue'
  import GridOptions from './GridOptions.vue'

  export default {
    name: 'app',
    components: {
      Grid,
      GridMetrics,
      GridEvents,
      GridOptions
    },
    data() {
      return {
        metrics: {},
        live_scroll: false
      }
    },
    methods: {
      onGridMetricsChange(val, old_val) {
        this.metrics = _.assign({}, val)
      },
      onGridOptionChange(option_name, val) {
        this.live_scroll = val
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
