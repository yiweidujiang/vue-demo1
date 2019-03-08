let SERVICEURL = ""
if(process.env.NODE_ENV.toLowerCase()=="development"){
    SERVICEURL = "http://192.168.17.216:10000" // 开发环境下的服务器地址
   // SERVICEURL = "http://localhost:7001"
}else{
    SERVICEURL = "http://localhost:7001" // 在生产环境下的服务器地址
}
export default SERVICEURL