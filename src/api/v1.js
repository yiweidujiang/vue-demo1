/**
 * 组织类型管理
 * 
 */
import request from '@/utils/request'
import store from '../store';
//组织类型
export function organizationTypeList(data){
    return request({
        url:'/v1/manage/organizationType/list?&sort=ctime&order=DESC',
        method:'get',
        params:data
    })
}
// 组织管理

export function organizationList(data){
    return request({
        url:'/v1/manage/organization/listTree/'+data.id,
        method:'get',
    })
}

export function roleList(data){
    return request({
        url:'/v1/manage/role/list',
        method:'get',
        params:data
    })
}
//获取权限雷彪
export function getPermission(data){
    return request({
        url:'/v1/manage/role/permission',
        method:'get',
        params:data
    })
}
// 角色授权
export function addPermission(data){
    return request({
        url:'/v1/manage/role/permission/',
        method:'post',
        params:data
    })
}
// 根据组织获取用户
export function getUsers(data){
    return request({
        url:'/v1/manage/organization/userlist/'+data.id,
        method:'get',
        params:data
    })
}
// 获取菜单列表
export function menuList(data){
    data.systemId=store.getters.appid
    return request({
        url:'/v1/manage/permission/list',
        method:"get",
        params:data
    })
}
// 菜单状态
export function menuStatus(data){
    return request({
        url:'/v1/manage/permission/update/'+data.id,
        method:'post',
        data:{
            status:data.status,
            name:data.name
        }
    })
}
// 系统列表
export function SystemList(data){
    return request({
        url:"/v1/manage/system/list",
        method:"get",
        params:data
    })
}
// 禁用系统
export function SystemDelete(data){
    return request({
        url:'/v1/manage/system/delete/'+data.id,
        method:"get",
    })
}
export function SystemOne(e){
    let data = null;
    return new Promise((resolve)=>{
        data = e;
        resolve(data)
    })
}
// 新加系统
export function SystemAdd(e){
    return request({
        url:'/v1/manage/system/create',
        method:'post',
       headers:{
           "Content-Type":"application/json"
       },
        data:JSON.stringify(e)

    })
}
export function LogList(data){
    return request({
        url:'/v1/manage/log/list',
        method:'get',
        params:data
    })
}
// 删除日志
export function LogDelete(data){
    return request({
        url:"/v1/manage/log/delete/"+data.id,
        method:"get"
    })
}
// 角色列表
export function RoleList(data){
    return request({
        url:'/v1/manage/user/role',
        method:"post",
        params:data
    })
}
export function updateUser(data){
    return request({
        url:'/v1/manage/user/roleUpdate',
        method:'post',
        params:data
    })
}