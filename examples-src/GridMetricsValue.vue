<template>
  <span :style="style">{{val}}</span>
</template>

<script>
  export default {
    props: {
      'val': {
        required: true
      }
    },
    watch: {
      val(val, old_val) {
        this.bg_color = '#a849a3'
        this.color = '#fff'
        this.resetStyles()
      }
    },
    data() {
      return {
        color: 'inherit'
      }
    },
    computed: {
      style() {
        return 'transition: all 0.3s ease-out; padding: 0 2px; border-radius: 1px; background-color: '+this.bg_color+'; color: '+this.color
      }
    },
    mounted() {
      this.resetStyles = _.debounce(function() {
        this.bg_color = 'inherit'
        this.color = 'inherit'
      }, 1000)
    }
  }
</script>
