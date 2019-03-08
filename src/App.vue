<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'app',
  created(){
    let code = this.getQuery('code');
    this.$store.commit('SET_CODE',code)
    
  }
}
</script>

<style lang="scss">
@import "./styles/reset.scss";
#app {
  height: 100%;
}
</style>
<style lang="css">
@import "./assets/iconfont.css";
</style>



