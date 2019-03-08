import {getSystem,getPermission} from '../../api/login'
import { stat } from 'fs';
function menuList(data){
  if(! (data instanceof Array)){
      alert("必须为数组格式数据")
  }
  let menuList = []
 let arr1 =  data.filter(item=>{
  if(item.permissionValue&&item.permissionValue!=""){
     if(item.permissionValue.indexOf('read')>-1){
         return true
     }
  }
})
arr1.forEach(item =>{
  menuList.push(item.permissionValue) 
})
return menuList
}

function permissionList(data){
  if(!( data instanceof Array)){
      alert("必须为数组格式数据")
  }
  let menuList = []
 let arr1 =  data.filter(item=>{
  if(item.permissionValue&&item.permissionValue!=""){
     return true
  }
})
arr1.forEach(item =>{
  menuList.push(item.permissionValue) 
})
return menuList
}

const state={
    slidebar:{
      collapse:false
    },
    code:'1111',
    appid:'',
    secret:'',
    systemName:'',
    systemList:[],
    permissionList:[],
    menuList:[],
    // 用户信息部分
    name:'',
    avatar: 'https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028?imageView2/1/w/80/h/80',
    userId:null


  };
  const mutations={
    TOGGLE_SLIDEBAR:(state,res)=>{
      if(state.slidebar.collapse){
        state.slidebar.collapse=false
      }else{
        state.slidebar.collapse=true
      }
    },
    SET_CODE:(state,res)=>{
      state.code = res
    },
    //
    SET_APPID:(state,res)=>{
      state.appid = res
    },
    SET_SECRET:(state,res)=>{
      state.secret = res
    },
    SET_SYSTEMLIST:(state,res)=>{
      state.systemList = res
    },
    SET_MENULIST:(state,res)=>{
      state.menuList = res
    },
    SET_PERMISSIONLIST:(state,res)=>{
      state.permissionList = res
    },
    SET_NAME:(state,res)=>{
      state.name = res
    },
    SET_USERID:(state,res)=>{
      state.userId = res
    }

  };
  const actions={
    ToggleSlideBar({commit}){
      commit('TOGGLE_SLIDEBAR')
    },
    // 获取系统列表
    getSystemList({commit}){
      return new Promise((resolve,reject)=>{
        getSystem().then(res=>{
          let arr = res.data.rows;
          commit('SET_APPID',arr[0].appid)
          commit('SET_SECRET',arr[0].secret)
          commit('SET_SYSTEMLIST',arr)
          // 获取用户信息
          let userInfo= res.data.userInfo
          commit('SET_NAME',userInfo.nickName)
          commit('SET_USERID',userInfo.userId)
          
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    GetPermission({ commit ,state},data) {
        commit('SET_APPID',data.appid)
        commit('SET_SECRET',data.secret)
      return new Promise((resolve, reject) => {
          getPermission(data).then(res => {
              if (res.code == 1) {
                  let data = res.data.upmsPermissions
                  let obj = {};
                  obj['menuList'] = menuList(data)
                  obj['permissionList'] = permissionList(data);
                  commit('SET_MENULIST',menuList(data))
                  commit('SET_PERMISSIONLIST',permissionList(data))
                  resolve(obj)
              } 
          }).catch(err => {
              reject(err)
          })
      })
  },




  };
  export default {
    state,
    mutations,
    actions
  }