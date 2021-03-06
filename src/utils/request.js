import axios from 'axios'
import serviceUrl from './service'
import store from '../store/index'
import router from '../router'
import { getToken, removeToken } from './auth'
const request = axios.create({
    baseURL: serviceUrl.baseUrl,
    timeout: 3000,
})
request.interceptors.request.use(config => {
    if (getToken()) {
        config.headers = {
            "Authorization": getToken(),
            // "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
              "Content-Type":"application/json; charset=UTF-8"
        }
    }
    return config
}, err => {
    return Promise.reject(err)
})
request.interceptors.response.use(res => {
    return res.data
}, err => {
    if(err.code=="ECONNABORTED"){
        // 连接不上服务器处理
        alert('服务器未响应')
    }else{
        if(err.response.data.code==401){
            // 会话过期处理
            removeToken();
            //window.location.reload()
        }
        else{
            // 其他code错误处理
            alert(err.response.data.message)
        }
    }
   
    return Promise.reject(err)
})

// 192.168.18.113:3001---资源中心
const request1 = axios.create({
     baseURL:serviceUrl.baoUrl,
    timeout:3000
})

request1.interceptors.request.use(config => {
    return config
},err => {
    return Promise.reject(err)
})

request1.interceptors.response.use(res=>{
    console.log(res)
    return res.data
},err => {
    return Promise.reject(err)
})

export  {
    request,
    request1
}


