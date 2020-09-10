import Vue from 'vue'
import VueRouter from 'vue-router'
// 管理员页面
import AdminLogin from '@/components/admin/Login'
import AdHome from '@/components/admin/AdHome'
import Mission from '@/components/admin/Mission'
import Info from '@/components/admin/Info'
// 学生页面
import StudentLogin from '@/components/student/StudentLogin'
import StudentHome from '@/components/student/StudentHome'

Vue.use(VueRouter)
const routes = [
  { path: '/admin/Login', component: AdminLogin },
  { path: '/student/Login', component: StudentLogin },
  {
    path: '/admin',
    component: AdHome,
    redirect: '/admin/Login',
    children: [
      {
        path: '/Info',
        component: Info
      }, {
        path: '/Mission',
        component: Mission
      }
    ]
  },
  {
    path: '/student',
    component: StudentHome,
    redirect: '/student/Login',
    children: []
  }
]
const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  // 几个特殊的路由运行通过就好了
  if (to.path === '/admin/Login') return next()
  if (to.path === '/student/Login') return next()

  // 先截取路径前缀（动态获取根路径）
  const pathStr = to.path.substring(1, to.path.substr(1).indexOf('/') + 1)

  console.log('根路径为：' + pathStr)

  // 获取token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next(`/${pathStr}/Login`)
  next()
})
export default router
