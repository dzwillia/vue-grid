<template>
  <div id="app" class="flex flex-row fixed absolute--fill overflow-hidden">
    <div class="flex-fill ma3" style="border: 1px solid #ddd">
      <grid
        data-url="https://localhost/api/v1/streams/kxj9tvrgdq2r/content"
        @rendered-row-count-change="renderedRowCountChange"
        @cached-row-count-change="cachedRowCountChange"
        @first-visible-row-change="firstVisibleRowChange"
        @last-visible-row-change="lastVisibleRowChange"
        @visible-row-count-change="visibleRowCountChange"
      ></grid>
    </div>
    <div class="flex-none mt3 mr3 mb3 w5">
      <div class="f5 fw6 pb1 mb2 mid-gray bb b--black-10">Metrics</div>
      <table class="w-100 f6 dark-gray">
        <tr>
          <td class="pv1">Rendered row count</td>
          <td class="pv1 tr">{{rrc}}</td>
        </tr>
        <tr>
          <td class="pv1">Cached row count</td>
          <td class="pv1 tr">{{crc}}</td>
        </tr>
        <tr>
          <td class="pv1">First visible row</td>
          <td class="pv1 tr">{{fvr}}</td>
        </tr>
        <tr>
          <td class="pv1">Last visible row</td>
          <td class="pv1 tr">{{lvr}}</td>
        </tr>
        <tr>
          <td class="pv1">Visible row count</td>
          <td class="pv1 tr">{{vrc}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Grid from './Grid.vue'

  export default {
    name: 'app',
    components: {
      Grid
    },
    data() {
      return {
        rrc: 0,
        crc: 0,
        fvr: 0,
        lvr: 0,
        vrc: 0
      }
    },
    methods: {
      renderedRowCountChange(val)       { this.rrc = val  },
      cachedRowCountChange(val)         { this.crc = val  },
      firstVisibleRowChange(val)        { this.fvr = val  },
      lastVisibleRowChange(val)         { this.lvr = val  },
      visibleRowCountChange(val)        { this.vrc = val  }
    }
  }
</script>

<style>
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
