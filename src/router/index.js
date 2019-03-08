import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../view/layout/index'
Vue.use(Router)
export const constantRouter = [
  {
    path: '/login',
    name: '登陆',
    component: () => import('@/view/login')
  },{
    path: '/',
    component: Layout,
    meta: { title: '功能模块', icon: 'tree' },
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import('@/view/index/index'),
        meta: { title: '首页', icon: 'icon-home' },
        menu: 'article'
      },
    ]
  },
  { path: '/404', component: () => import('../components/Page404.vue'), hidden: true },
]
//异步路由表
export const asyncRouterMap = [
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/map',
    meta: { title: '组织机构管理', icon: 'icon-deliver' },
    children: [
      {
        path: 'map',
        name: '组织类型管理',
        component:() =>  import('@/view/v1/organization/organizationType'),
        meta: { title: '组织类型管理', icon: 'icon-mark' },
        menu: "upms:organizationType:read",
        hidden:false
      },
      {
        path: 'index',
        name: '组织机构管理',
        component:() =>  import('@/view/v1/organization/organization'),
        meta: { title: '组织机构管理', icon: 'icon-information' },
        menu: "upms:organization:read",
        hidden:false
      },
    ]
  },
  // 用户角色权限管理
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    meta: { title: '权限管理', icon: 'icon-deliver' },
    children: [
      {
        path: 'role',
        name: '角色管理',
        component:() =>  import('@/view/v1/permission/role'),
        meta: { title: '角色管理', icon: 'icon-mark' },
        menu: "upms:role:read",
        hidden:false
      },
      {
        path: 'user',
        name: '用户管理',
        component:() =>  import('@/view/v1/permission/user'),
        meta: { title: '用户管理', icon: 'icon-information' },
        menu: "upms:user:read",
        hidden:false
      },
      {
        path: 'menu',
        name: '菜单管理',
        component:() =>  import('@/view/v1/permission/menu'),
        meta: { title: '菜单管理', icon: 'icon-information' },
        menu: "upms:permission:read",
        hidden:false
      },
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    meta: { title: '系统管理', icon: 'icon-deliver' },
    children: [
      {
        path: 'index',
        name: '注册系统',
        component:() =>  import('@/view/v1/organization/organizationType'),
        meta: { title: '注册系统', icon: 'icon-mark' },
        menu: "upms:system:read",
        hidden:false
      },
      {
        path: 'log',
        name: '日志管理',
        component:() =>  import('@/view/v1/organization/organizationType'),
        meta: { title: '日志管理', icon: 'icon-mark' },
        menu: "upms:log:read",
        hidden:false
      },
     
    ]
  },

 /**
  * 备课系统后台
  * 
  */
 // 教务教学
  {
    path: '/teaching',
    component: Layout,
    redirect: '/teaching/index',
    meta: { title: '教务教学', icon: 'icon-deliver' },
    children: [
      {
        path: 'index',
        name: '教材版本管理',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '教材版本管理', icon: 'icon-mark' },
        menu:"cms:bookVersion:read",
        hidden:false
      },
      {
        path: 'year',
        name: '学期学年管理',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '学期学年管理', icon: 'icon-mark' },
        menu:"cms:bookVersion:read",
        hidden:false
      },
      {
        path: 'rest',
        name: '作息管理',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '作息管理', icon: 'icon-mark' },
        menu:"cms:bookVersion:read",
        hidden:false
      },
      {
        path: 'timetable',
        name: '课表管理',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '课表管理', icon: 'icon-mark' },
        menu:"cms:bookVersion:read",
        hidden:false
      },
    ]
  },
   // 班级文化教学
   {
    path: '/message',
    component: Layout,
    redirect: '/class/photo',
    meta: { title: '信息发布', icon: 'icon-deliver' },
    children: [
      {
        path: 'company',
        name: '局通知',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '局通知', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
      {
        path: 'school',
        name: '校通知',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '校通知', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
      {
        path: 'honor',
        name: '班级荣誉',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '班级荣誉', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
      {
        path: 'briefing',
        name: '班级通报',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '班级通报', icon: 'icon-mark' },
        menu:"",
        hidden:false
      }
    ]
  },
  //班级文化
   {
    path: '/class',
    component: Layout,
    redirect: '/class/photo',
    meta: { title: '班级文化', icon: 'icon-deliver' },
    children: [
      {
        path: 'photo',
        name: '班级相册',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '班级相册', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
      {
        path: 'slogans',
        name: '班级口号',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '班级口号', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
      {
        path: 'handPaper',
        name: '手抄报',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '手抄报', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
    ]
  },
  // 影像馆
  {
    path: '/vide',
    component: Layout,
    redirect: '/vide/index',
    meta: { title: '影像馆', icon: 'icon-deliver' },
    children: [
      {
        path: 'index',
        name: '影像馆',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '影像馆', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
    ]
  },
   // 影像馆
   {
    path: '/live',
    component: Layout,
    redirect: '/live/index',
    meta: { title: '直播间', icon: 'icon-deliver' },
    children: [
      {
        path: 'index',
        name: '直播室配置',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '直播室配置', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
      {
        path: 'put',
        name: '直播室发布',
        component:() =>  import('@/view/v2/bookVersion/bookVersion'),
        meta: { title: '直播室发布', icon: 'icon-mark' },
        menu:"",
        hidden:false
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter
})
