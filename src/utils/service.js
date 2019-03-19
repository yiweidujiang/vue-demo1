let SERVICEURL = {
    baseUrl:''
}
// 开发环境下的服务器地址
if(process.env.NODE_ENV.toLowerCase()=="development"){
    SERVICEURL.baseUrl = "http://192.168.17.216:10000" 
    SERVICEURL.baoUrl='http://192.168.18.113:3001'
    SERVICEURL.laochaoURL= 'http://192.168.17.168:8088'
    SERVICEURL.serviceUrl="http://192.168.17.146:8100"
}else{
    // 在生产环境下的服务器地址
    SERVICEURL.baseUrl = "http://localhost:7001" // 后台api服务器地址
    SERVICEURL.baoUrl='http://192.168.18.113:3001' // 资源中心服务器
    SERVICEURL.laochaoURL= 'http://192.168.17.168:8088' // 浪潮服务器地址
    SERVICEURL.serviceUrl="http://192.168.18.101:8100" // 前台服务地址

}
export default SERVICEURL