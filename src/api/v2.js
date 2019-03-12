
import request from '@/utils/request'
import store from '../store';





// 获取列表
export function bookVersionList(data){
    return request({
        url:'/v2/manage/bookVersion/list',
        method:'post',
        params:data
    })
}

// 编辑
export function bookVersionUpdate(data){
    return request({
        url:'/v2/manage/bookVersion/list',
        method:'post',
        params:data
    })
}

// 新加
export function bookVersionAdd(data){
    return request({
        url:'/v2/manage/bookVersion/list',
        method:'post',
        params:data
    })
}


// 删除
export function bookVersionDelete(data){
    return request({
        url:'/v2/manage/bookVersion/list',
        method:'post',
        params:data
    })
}

/**
 * 
 * 班级口号
 */
// 列表
export function SlognsList(data){
    return request({
        url:'/v2/manage/class/slogans/list',
        method:"get",
        params:data
    })
}
// 删除
export function SlognsDelete(data){
    return request({
        url:'/v2/manage/class/slogans/delete',
        method:"post",
        params:data
    })
}
export function SlognsAdd(data){
    return request({
        url:'/v2/manage/class/slogans/create',
        method:"post",
        data:data
    })
}
export function SlognsUpdate(data){
    return request({
        url:'/v2/manage/class/slogans/update',
        method:"post",
        params:data
    })
}



// 手抄报









 

 
