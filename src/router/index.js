import Vue from 'vue'
import VueRouter from 'vue-router'



//多次点击路由是不被允许的
  //push 
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}


// 引入路由
import routes from './routes'
// 使用路由
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  base: process.env.baseURL,
  routes
})

