<template>
  <div class="home">
   <div class="layout clearfix">
     <v-tree></v-tree>
     <v-source></v-source>
   </div>
  </div>
</template>
<script>
import Tree from '../common/listTree'
import SourceList from '../common/sourceList'
export default {
  name: 'home',
  components: {
    'v-tree': Tree,
    'v-source': SourceList
  }
}
</script>

<style scoped>

</style>
