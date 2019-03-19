
import { request } from '@/utils/request'
import store from '../store';



/* 班级文化---start */



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
        url:'/v2/manage/class/slogans/delete/' + data.id,
        method:"post"
    })
}
// 新增
export function SlognsAdd(data){
    return request({
        url:'/v2/manage/class/slogans/create',
        method:"post",
        data:data
    })
}
// 更新

export function SlognsUpdate(data){
    return request({
        url:'/v2/manage/class/slogans/update/' + data.id,
        method:"post",
        data:data
    })
}



// 手抄报
// 列表
export function HandPaperList(data){
    return request({
        url:'/v2/manage/class/handPaper/list',
        method:"get",
        params:data
    })
}
// 删除
export function HandPaperDelete(data){
    return request({
        url:'/v2/manage/class/handPaper/delete/{id}',
        method:"post",
        params:data
    })
}
// 新增
export function HandPaperAdd(data){
    return request({
        url:'/v2/manage/class/handPaper/create',
        method:"post",
        data:data
    })
}
// 更新

export function HandPaperUpdate(data){
    return request({
        url:'/v2/manage/class/handPaper/update/' + data.id,
        method:"post",
        data:data
    })
}


// 班级相册
// 列表
export function PhotoList(data){
    return request({
        url:'/v2/manage/class/photo/list',
        method:"get",
        params:data
    })
}
// 通过id查询信息
export function PhotoSelect(data){
    return request({
        url:'/v2/manage/class/photo/listPic',
        method:"get",
        params:data
    })
}
// 删除
export function PhotoDelete(data){
    return request({
        url:'/v2/manage/class/photo/delete/' + data.id,
        method:"post"
    })
}
// 新增
export function PhotoAdd(data){
    return request({
        url:'/v2/manage/class/photo/create',
        method:"post",
        data
    })
}
// // 更新

export function PhotoUpdate(data){
    return request({
        url:'/v2/manage/class/photo/update/' + data.id,
        method:"post",
        data:data
    })
}

/* 班级文化---start */

/* 信息发布 ---start*/

// 局通知

// 局通知列表
export function CompanyList(data){
    return request({
        url:'/v2/manage/notice/eduNotice',
        method:"get",
        params:data
    })
}
// 删除
export function CompanyDelete(data){
    return request({
        url:'/v2/manage/notice/delete/' + data.id,
        method:"get"
    })
}
// 新增
export function CompanyAdd(data){
    return request({
        url:'/v2/manage/notice/create',
        method:"post",
        data:data
    })
}
// 更新

export function CompanyUpdate(data){
    return request({
        url:'/v2/manage/notice/update/' + data.id,
        method:"post",
        data:data
    })
}

// 校通知
// 列表
export function SchoolList(data){
    return request({
        url:'/v2/manage/notice/list',
        method:"get",
        params:data
    })
}

// 班级荣誉

// 列表
export function HonorList(data){
    return request({
        url:'/v2/manage/class/honor/list',
        method:"get",
        params:data
    })
}
// 删除
export function HonorDelete(data){
    return request({
        url:'/v2/manage/class/honor/delete/' + data.id,
        method:"post"
    })
}
// 新增
export function HonorAdd(data){
    return request({
        url:'/v2/manage/class/honor/create',
        method:"post",
        data:data
    })
}
// 更新

export function HonorUpdate(data){
    return request({
        url:'/v2/manage/class/honor/update/' + data.id,
        method:"post",
        data:data
    })
}


// 班级通报

// 列表
export function LiveIndexList(data){
    return request({
        url:'/v2/manage/studioConfig/list',
        method:"get",
        params:data
    })
}
// 删除
export function LiveIndexDelete(data){
    return request({
        url:'/v2/manage/studioConfig/delete/' + data.id,
        method:"get"
    })
}
// 新增
export function LiveIndexAdd(data){
    return request({
        url:'/v2/manage/studioConfig/create',
        method:"post",
        data:data
    })
}
// 更新

export function LiveIndexUpdate(data){
    return request({
        url:'/v2/manage/studioConfig/update/' + data.id,
        method:"post",
        data:data
    })
}


/* 信息发布---end*/

/*  教务教学 --- start */

// 学年管理

// 列表
export function YearList(data){
    return request({
        url:'/v2/manage/schoolYear/list',
        method:"post"
    })
}



// 教材版本管理
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
        data:data
    })
}


// 作息管理

// 列表
export function SchoolNodesList(data){
    return request({
        url:'/v2/manage/schoolNodes/list',
        method:'post',
        params:data
    })
}

// 新增作息
export function SchoolNodesAdd(data){
    return request({
        url:'/v2/manage/schoolNodes/create?seasonCode=' + data.seasonCode + '&schoolId=' + data.schoolId,
        method:'post',
        data:data.list

    })
}

// 删除作息
export function SchoolNodesDelete(data){
    console.log(data)
    return request({
        url:'/v2/manage/schoolNodes/delete/' + data.ids,
        method:'get'
    })
}

// 课表管理

// 课程列表
export function SchoolScheduleList(data){
    return request({
        url:'/v2/manage/schoolSchedule/list',
        method:'post',
        params:data
    })
}
// 生成模板
export function SchoolScheduleExport(data){
    return request({
        url:'/v2/manage/schoolSchedule/export',
        method:'post',
        params:data
    })
}
// 上传课表
// export function SchoolScheduleUpload(data){
//     return request({
//         url:'/v2/manage/schoolSchedule/upload?schoolId='+data.schoolId,
//         method:'post',
//         params:data
//     })
// }

/*  教务教学  ---- end*/

/*  直播间 --- start */

// 直播室配置

// 列表
export function BriefingList(data){
    return request({
        url:'/v2/manage/class/inspectionNotice/list',
        method:"get",
        params:data
    })
}
// 删除
export function BriefingDelete(data){
    return request({
        url:'/v2/manage/class/inspectionNotice/delete/' + data.id,
        method:"post"
    })
}
// 新增
export function BriefingAdd(data){
    return request({
        url:'/v2/manage/class/inspectionNotice/create',
        method:"post",
        data:data
    })
}
// 更新

export function BriefingUpdate(data){
    return request({
        url:'/v2/manage/class/inspectionNotice/update/' + data.id,
        method:"post",
        data:data
    })
}


// 直播发布

// 列表
export function LivePutList(data){
    return request({
        url:'/v2/manage/studioPublish/list',
        method:"get",
        params:data
    })
}
// 删除
export function LivePutDelete(data){
    return request({
        url:'/v2/manage/studioPublish/delete/' + data.id,
        method:"get"
    })
}
// 新增
export function LivePutAdd(data){
    return request({
        url:'/v2/manage/studioPublish/create',
        method:"post",
        data:data
    })
}
// 更新

export function LivePutUpdate(data){
    return request({
        url:'/v2/manage/studioPublish/update/' + data.id,
        method:"post",
        data:data
    })
}


/*  直播间 --- end  */


/* 影像馆 --- start */

// 列表
export function VideoShopList(data){
    return request({
        url:'/v2/manage/videoShop/list',
        method:"get",
        params:data
    })
}
// 删除
export function VideoShopDelete(data){
    return request({
        url:'/v2/manage/videoShop/delete/' + data.id,
        method:"get"
    })
}
// 新增
export function VideoShopAdd(data){
    return request({
        url:'/v2/manage/videoShop/create',
        method:"post",
        data:data
    })
}
// 更新

export function VideoShopUpdate(data){
    return request({
        url:'/v2/manage/videoShop/update/' + data.id,
        method:"post",
        data:data
    })
}
// 获取图书馆类型列表
export function VideoTypeList(){
    return request({
        url:'/v2/manage/videoShop/type',
        method:'get'
    })
}
/* 影像馆 --- end */






 

 
