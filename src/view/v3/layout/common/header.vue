<template>
    <div class="header">
      <div class="top-nav">
        <div class="container clearfix">
          <div class="layout-l">
            让每一个孩子享受平等的教育
          </div>
          <div class="layout-r">
            <div class="user-msg fr">
              <span><span>张老师</span> .你好  | </span>
              <span @click="userOut()" class="out">退出</span>
              <div class="user-icon">
                <img src="@/assets/logo.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-nav">
        <div class="container">
          <div class="layout-l">
            <div class="logo">
              <img src="@/assets/white_logo_03.png" alt="">
            </div>
            <h1>智慧课堂备课系统</h1>
          </div>
          <ul class="nav-bar">
            <li>
              <router-link to="/preparation/home" active-class="active">首页</router-link>
            </li>
            <li>
              <router-link to="/preparation/beike" active-class="active">备课</router-link>
            </li>
            <li>
              <router-link to="/preparation/jibei" active-class="active">集体备课</router-link>
            </li>
            <li>
              <router-link to="/preparation/myself" active-class="active">个人中心</router-link>
            </li>

          </ul>

        </div>
      </div>

    </div>
</template>

<script>

export default {
  name: 'v-header',
 
  methods: {
    userOut () {
      this.$Cookies.remove('admin')
      this.$router.push('/login')
      sessionStorage.setItem('chapterId', '')
    }
  }                                       
}
</script>

<style scoped>

</style>
