<template>
  <div class="home">
    <div class="layout clearfix">
      <v-tree  setData="beike"></v-tree>
      <v-list></v-list>
    </div>
  </div>
</template>
<script>
  import Tree from '../common/listTree'
  import List from '../common/List'
  export default {
    name: 'myClass',
    components: {
      'v-tree': Tree,
      'v-list': List
    },
  }
</script>

<style scoped>

</style>
