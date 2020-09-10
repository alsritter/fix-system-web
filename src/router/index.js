import Vue from 'vue'
import VueRouter from 'vue-router'
import AdHome from '@/components/admin/AdHome'
import Imployee from '@/components/admin/Imployee'
import Info from '@/components/admin/Info'
import Login from '@/components/admin/Login'
import Order from '../components/admin/Order.vue'
import SelfCenter from '@/components/admin/SelfCenter'
import Statistics from '@/components/admin/Statistics'
import Student from '@/components/admin/Student'
import Tools from '@/components/admin/Tools'
import OrderInProgress from '../components/admin/OrderInProgress.vue'
import Announcement from '../components/admin/Announcement.vue'
// import History from '@/components/worker/History'
// import Home from '@/components/worker/Home'
// import WorkerLogin from '@/components/worker/WorkerLogin'
// import WorkerInfo from '@/components/worker/WorkerInfo'
// import MissonInProgress from '@/components/worker/MissonInProgress'
// import OrderDetail from '@/components/worker/OrderDetail'
// import Register from '@/components/worker/Register'
// import Result from '@/components/worker/Result'
// import Unhandle from '@/components/worker/Unhandle'
// import CallUp from '@/components/student/CallUp'
// import Details from '@/components/student/Details'
// import StudentHome from '@/components/student/StudentHome'
// import InfoCenter from '@/components/student/InfoCenter'
// import StudentLogin from '@/components/student/StudentLogin'
// import SignUp from '@/components/student/SignUp'
// import PasswordReset from '@/components/student/PasswordReset'
// import MyOrder from '@/components/student/MyOrder'

Vue.use(VueRouter)
const routes = [
  {
    // 管理员路由注册
    path: '/admin',
    component: AdHome,
    redirect: '/Login',
    children: [{
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

 }, // 提取出作为单独的页面
  {
    path: '/Login',
    component: Login
  }
]
const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/Login') return next()
  // 获取token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/Login')
  next()
})
export default router
// TODO:修改路由注册排布，使其适合多个终端的需求
