<template>
  <div>
    <div class="f6 b pv2 ph2 ttu mid-gray bg-near-white bt bb b--black-10" style="font-size: 11px">Options</div>
    <table class="w-100 pv1 ph2 f6 dark-gray">
      <tr>
        <td class="pv1 pr2">
          <label ref="live-scroll-checkbox" option-name="live_scroll" @click="toggleLiveScroll">
              <input type="checkbox" :value="liveScroll"> Live scroll
          </label>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      'live-scroll': {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleLiveScroll() {
        var option_name = this.$refs['live-scroll-checkbox'].getAttribute('option-name')
        this.$emit('option-change', option_name, !this.liveScroll)
      }
    }
  }
</script>
