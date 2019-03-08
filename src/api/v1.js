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
        data
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