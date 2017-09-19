<template>
  <span class="vg-metric-value" :class="cls">{{val}}</span>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: {
      'val': {
        required: true
      }
    },
    watch: {
      val(val, old_val) {
        this.cls = 'vg-metric-value-changed'
        this.resetStyles()
      }
    },
    data() {
      return {
        cls: 'vg-metric-value-static'
      }
    },
    mounted() {
      this.resetStyles = _.debounce(function() {
        this.cls = 'vg-metric-value-static'
      }, 100)
    }
  }
</script>

<style>
  .vg-metric-value {
    padding: 0 2px;
  }

  .vg-metric-value-static {
    padding: 0 2px;
    background: inherit;
    color: inherit;
    transition: all 0.9s ease-out;
  }

  .vg-metric-value-changed {
    background-color: #4488ff;
    color: #fff;
  }
</style>
