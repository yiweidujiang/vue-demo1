import { request1 } from "@/utils/request";

// 获取学段列表
export function PhaseList(data){
    return request1({
        url: 'v1/phase/list',
        method:'get',
        params:data
    })
    
}

// 获取学科列表
export function SubjectList(data){
    return request1({
        url:'/v1/book/subjectList/byPhase',
        method:'get',
        params:data
    })
}

// 获取教材版本
export function EditionList(data){
    return request1({
        url:'/v1/book/editionList/byPhaseAndSubject',
        method:'get',
        params:data
    })
}

// 获取课本列表
export function BookList(data){
    return request1({
        url:'/v1/book/list/byEdition',
        method:'get',
        params:data
    })
}