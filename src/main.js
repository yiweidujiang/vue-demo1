// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入animated css
import '@/assets/animate.min.css'
// vuex
import store from './store/index'
// request 
import request from './utils/request'
// element-ui
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 用户权限
import './permission'

Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.use(elementUi)
// element ui 公共方法
import './utils/element'
import {hasPermission} from './utils/element'
Vue.prototype.hasPer = hasPermission
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
