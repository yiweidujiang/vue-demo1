import router from './router'
import store from './store'
import { getToken,setAppid,getAppid } from './utils/auth'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    if (getToken()) {
        //console.log(!store.getters.roleId)
        if (to.path == '/login') {
            next({ path: '/' })
        } else if (!store.getters.secret) {
            store.dispatch('getSystemList').then((res) => {
                if(getAppid()){
                    let app = JSON.parse(getAppid());
                    store.dispatch('GetPermission',app).then(res =>{
                        store.dispatch('GererateRouter',res).then(res =>{
                            router.addRoutes(store.getters.routers)
                        })
                    })     
                }else{
                    let arr = res.data.rows;
                    setAppid(JSON.stringify({appid:arr[0].appid,secret:arr[0].secret}))
                    let data =  {appid:arr[0].appid,secret:arr[0].secret}
                    store.dispatch('GetPermission',data).then(res =>{
                        store.dispatch('GererateRouter',res).then(res =>{
                            router.addRoutes(store.getters.routers)
                        })
                    })     
                }
               
                next({...to})
            })
        } else {

          
            next()
        }
    }  else {
        if (whiteList.indexOf(to.path) != -1) {
            next()
        } else {
            next({ path: '/login' })
        }

    }
})



