import {request} from '../utils/request.js'
// 用户登录
export function LoginA(data){
    return request({
        url:'/api/admin/login',
        method:'post',
        data:data,
    })
}
// 获取用户详情
export function GetUserInfoA(id){
    return request({
        url:'/api/admin/userInfo',
        method:'post',
        data:{
            id
        }
    })
}
// 用户退出
export function LoginOut(token){
    return request({
        url:'/auth/oauth/logout',
        method:'get',
        data:{
            token 
        }
    })
}
// 获取系统列表
export function getSystem(){
    return request({
     url:'/auth/oauth/getSystem',
     method:'get'
   })
 }
// 获取当前系统下用户信息
export function getPermission(data){
    return request({
     url:'/auth/oauth/getPermission',
     method:'post',
     params:data
   })
 }
