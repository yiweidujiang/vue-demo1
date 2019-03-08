import Cookies from 'js-cookie'
const AdminToken = "AdminToken"
const appid = 'App'
export function getToken(){
    return  Cookies.get(AdminToken)
}
export function setToken(d){
    return Cookies.set(AdminToken,d)
}
export function removeToken(){
    return Cookies.remove(AdminToken)
}
// 系统id 获取
export function getAppid(){
    return Cookies.get(appid)
}
// 系统id 设置
export function setAppid(data){
    return Cookies.set(appid,data)
}

// 系统id 移除
export function removeAppid(){
    return Cookies.remove(appid)
}

