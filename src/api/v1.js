/**
 * 组织类型管理
 * 
 */
import request from '@/utils/request'
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

