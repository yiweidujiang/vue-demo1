<template>
  <div class="layout1">
    <v-header></v-header>
    <div class="container">
      <transition>
        <keep-alive>
          <router-view :key="new Date().getTime()"></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- <v-loading v-show="showLoading"></v-loading> -->
  </div>
</template>

<script>
  import Header from './common/header'
  import {mapGetters,mapState} from 'vuex'
  import LoadingVue from './common/Loading.vue';
  export default {
    data () {
      const keys = new Date().getTime()
      return{
        keys: keys,
      }
    },
    name: 'layout',
    components: {
      'v-header': Header,
      'v-loading': LoadingVue
    },
    computed:{
      ...mapGetters(['loginOut']),
      ...mapState({
        showLoading:state => state.user.showLoading
      })
    },
    watch:{
      loginOut : function(res){
        this.$message({
          type: 'error',
          message: "登录超时",
        })
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss">

</style>
