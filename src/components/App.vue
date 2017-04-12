<template>
  <div id="app" class="flex flex-column fixed absolute--fill overflow-hidden">
    <div class="flex-none ml3 mr3 mt3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam ratione alias totam maiores sapiente quisquam repudiandae, obcaecati laboriosam rerum cum enim repellat dolorem nisi in cumque, quo eligendi explicabo corporis!
    </div>
    <div class="flex-fill ma3" style="border: 1px solid #ddd">
      <biggrid
        data-url="https://localhost/api/v1/streams/kxj9tvrgdq2r/content"
      ></biggrid>
    </div>
    <div class="flex-none ml3 mr3 mb3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam ratione alias totam maiores sapiente quisquam repudiandae, obcaecati laboriosam rerum cum enim repellat dolorem nisi in cumque, quo eligendi explicabo corporis!
    </div>
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
