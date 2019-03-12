const getters = {

  
    //折叠面板
    slidebar: state => state.app.slidebar,
    routers: state => state.permission.routers,
    //code 获取
    code:state=>state.app.code,
    //系统权限获取
    secret: state =>state.app.secret,
    appid: state => state.app.appid,
    systemList:state=>state.app.systemList,
    menuList: state => state.app.menuList,
    permissionList: state => state.app.permissionList,

    // 用户信息
    name:state=>state.app.name,
    avatar:state=>state.app.avatar,
    userId:state=>state.app.userId,
    // 用户组织id
    organId:state=>state.app.organId

}
export default getters