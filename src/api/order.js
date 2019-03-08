
import  request from '@/utils/request.js'
/**
 * 权限管理
 * 
 */
// 获取权限列表

export function getOrderListA(data){
    return request({
        url:'/api/admin/order/new',
        method:'get',
    })
}
export function getOrderList(data){
    return request({
        url:'/api/admin/order',
        method:'get',
        params:data
    })
}
// 新加权限
export function createOrder(data){
    return request({
        url:'/api/admin/order',
        method:'post',
        data
    })
}
// 根据权限id 获取权限
export function getOrder(data){
    return request({
        url:'/api/admin/order/'+data+'/edit',
        method:'get',
    })
}
// 根据权限id 获取角色
export function editOrder(id,data){
    return request({
        url:'/api/admin/order/'+id,
        method:'put',
        data
    })
}
// 根据id 删除角色

export function deleteOrder(data){
    console.log(data)
    return request({
        url:'/api/admin/order/'+data,
        method:'delete',
    })
}

/**
 * 设备类型管理
 * 
 */
// 获取权限列表

export function getEquipmentListA(data){
    return request({
        url:'/api/admin/equipment/new',
        method:'get',
    })
}
export function getEquipmentList(data){
    return request({
        url:'/api/admin/equipment',
        method:'get',
        params:data
    })
}
// 新加权限
export function createEquipment(data){
    return request({
        url:'/api/admin/equipment',
        method:'post',
        data
    })
}
// 根据权限id 获取权限
export function getEquipment(data){
    return request({
        url:'/api/admin/equipment/'+data+'/edit',
        method:'get',
    })
}
// 根据权限id 获取角色
export function editEquipment(id,data){
    return request({
        url:'/api/admin/equipment/'+id,
        method:'put',
        data
    })
}
// 根据id 删除角色

export function deleteEquipment(data){
    console.log(data)
    return request({
        url:'/api/admin/equipment/'+data,
        method:'delete',
    })
}


