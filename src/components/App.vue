<template>
  <div id="app" class="flex flex-column fixed absolute--fill overflow-hidden">
    <biggrid></biggrid>
  </div>
</template>

<script>
  import Biggrid from './Grid.vue'

  export default {
    name: 'app',
    components: {
      Biggrid
    }
  }
</script>
