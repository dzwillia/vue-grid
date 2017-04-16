<template>
  <div>
    <div class="h-100 lh-1 vg-td-inner" :style="'width: '+width+'px'">
      <span ref="content">{{value}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'col': {
        type: Object,
        required: true
      },
      'value': {
        required: true
      },
      'width': {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        content_width: 0
      }
    },
    mounted() {
      var el = this.$refs['content']
      this.content_width = el ? el.offsetWidth : 0
      this.$emit('initialize-content-width', this.content_width, this.col)
    }
  }
</script>
