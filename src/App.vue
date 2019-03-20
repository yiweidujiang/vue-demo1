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
body{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  font-size:14px;
}
</style>
<style lang="css">
@import "./assets/iconfont.css";
</style>



