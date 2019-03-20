<template>
  <div class="index-right fl">
    <v-hotsource></v-hotsource>
    <v-recommendsource></v-recommendsource>
  </div>
</template>

<script>
  import HotSource from './hotSource'
  import RecommendSource from './recommendSource'
  export default {
    name: 'indexRight',
    components: {
      'v-hotsource': HotSource,
      'v-recommendsource': RecommendSource
    }
  }
</script>

<style scoped>

</style>
