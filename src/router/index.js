import Vue from 'vue'
import VueRouter from "vue-router"
import Home from '@/views/Home.vue'
import Main from '@/views/PeopleManage.vue'
import DealCenter from '@/components/DealCenter'
import Register from '@/components/Login'
import TableTest from '@/views/tableTest'
import Form from '@/views/UserManage'
import Table from '@/views/Table'
Vue.use(VueRouter)


let routes = [
  {
    path: '/',
    component: Home,
    name: '系统管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
       { path: '/main', component: Main, name: '人员管理'},
      { path: '/table', component: Table, name: '科室注册' },
       { path: '/form', component: Form, name: '用户管理' }
    ]
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
      path: '/tableTest',
      name: 'TableTest',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: TableTest
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
