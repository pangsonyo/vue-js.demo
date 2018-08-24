import Vue from 'vue'
import VueRouter from "vue-router"
import HelloWorld from '@/components/HelloWorld'
import DealCenter from '@/components/DealCenter'
import Register from '@/components/Login'
Vue.use(VueRouter)


let routes = [
    {
      path: '/',
      name: 'HelloWorld',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: HelloWorld
    },
    {
      path: '/dealCenter',
      name: 'DealCenter',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: DealCenter
    },
    {
      path: '/Register',
      name: 'Register',
      component:Register
    }
  ];

var router = new VueRouter({
  routes
})
export default router;
//  判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//     if (localStorage.getItem('username')) {// 判断是否登录
//       next()
//     } else {// 没登录则跳转到登录界面
//       next({
//         path: '/Register',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })
