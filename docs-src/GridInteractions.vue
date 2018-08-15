<template>
  <div class="flex flex-row overflow-hidden">
    <div class="flex-fill br b--black-20">
      <grid
        data-url="https://api.flex.io/v1/me/streams/hv02d7cdw2lv/content"
        :custom-headers="{ 'Authorization': 'Bearer rryrjgqhvtdttzzsjpjr' }"
        :live-scroll="live_scroll"
        @metrics-change="onGridMetricsChange"
      ></grid>
    </div>
    <div class="flex-none overflow-auto" style="min-width: 300px; margin-top: -1px">
      <grid-metrics class="w-100" :metrics="metrics"></grid-metrics>
      <grid-events class="w-100"></grid-events>
      <grid-options
        class="w-100"
        :live-scroll="live_scroll"
        @option-change="onGridOptionChange"
      >
      </grid-options>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Grid from '../src/components/Grid.vue'
  import GridMetrics from './GridMetrics.vue'
  import GridEvents from './GridEvents.vue'
  import GridOptions from './GridOptions.vue'

  export default {
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
