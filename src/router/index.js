import Vue from 'vue'
import VueRouter from 'vue-router'
// 管理员页面
import AdminLogin from '@/components/admin/Login'
import AdHome from '@/components/admin/AdHome'
import Info from '@/components/admin/Info'
import Imployee from '@/components/admin/Imployee'
import Order from '../components/admin/Order.vue'
import SelfCenter from '@/components/admin/SelfCenter'
import Statistics from '@/components/admin/Statistics'
import Student from '@/components/admin/Student'
import Tools from '@/components/admin/Tools'
import OrderInProgress from '../components/admin/OrderInProgress.vue'
import Announcement from '../components/admin/Announcement.vue'
// 学生页面
import StudentLogin from '@/components/student/StudentLogin'
import StudentHome from '@/components/student/StudentHome'

Vue.use(VueRouter)
const routes = [
  { path: '/admin/Login', component: AdminLogin },
  { path: '/student/Login', component: StudentLogin },
  {
    // 管理员路由注册
    path: '/admin',
    component: AdHome,
    redirect: '/admin/Login',
    children: [
      {
        path: '/Info',
        component: Info
      }, {
        path: '/Order',
        component: Order
      }, {
        path: '/OrderFinished',
        component: Imployee
      }, {
        path: '/OrderInProgress',
        component: OrderInProgress
      }, {
        path: '/Imployee',
        component: Imployee,
        children: [{
            path: '/ImployeeDetail',
            component: Imployee
        }]
      }, {
        path: '/SelfCenter',
        component: SelfCenter
      }, {
        path: '/Statistics',
        component: Statistics
      }, {
        path: '/Student',
        component: Student
      }, {
        path: '/Tools',
        component: Tools
      }, {
        path: '/Announcement',
        component: Announcement
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
// TODO:等待学生端实现，合并分支后需要调整路由注册规则
