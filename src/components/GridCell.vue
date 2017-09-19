<template>
  <div>
    <div class="h-100 lh-1 vg-td-inner" :class="cls" :style="'width: '+width+'px'">
      <span ref="content">{{value}}</span>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

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
    computed: {
      cls() {
        switch (_.get(this.col, 'type', 'text'))
        {
          case 'bool':
          case 'boolean':
          case 'date':
          case 'datetime':
            return 'tc'
          case 'integer':
          case 'float':
          case 'number':
          case 'numeric':
            return 'tr'
        }

        return ''
      }
    },
    mounted() {
      var el = this.$refs['content']
      this.content_width = el ? el.offsetWidth : 0
      this.$emit('determine-auto-width', this.col, this.content_width)
    }
  }
</script>
