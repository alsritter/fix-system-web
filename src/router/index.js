import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// 单独引入消息组件
import { Message } from 'element-ui'
// 根页面，用来选择是哪种用户
import Root from '../components/Root.vue'
// 管理员页面
import AdminLogin from '@/components/admin/Login'
import AdHome from '@/components/admin/AdHome'
import Info from '@/components/admin/Info'
import WorkerManage from '@/components/admin/WorkerManage'
import Order from '../components/admin/Order.vue'
import SelfCenter from '@/components/admin/SelfCenter'
import Statistics from '@/components/admin/Statistics'
import Student from '@/components/admin/Student'
import Tools from '@/components/admin/Tools'
import Announcement from '../components/admin/Announcement.vue'
// 学生页面
import StudentLogin from '@/components/student/StudentLogin'
import StudentSignUp from '../components/student/SignUp.vue'
import StudentHome from '@/components/student/StudentHome'
import UpdateUser from '../components/student/UpdateUser.vue'
import CallUp from '../components/student/CallUp.vue'
import MyOrder from '../components/student/MyOrder.vue'
import OrderList from '../components/student/OrderList.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/', component: Root },
  { path: '/student/Login', component: StudentLogin },
  { path: '/student/signUp', component: StudentSignUp },
  { path: '/admin/Login', component: AdminLogin },
  {
    // 管理员路由注册
    path: '/admin',
    component: AdHome,
    // 这个坑有点神奇，要有子路由必须先重定向到某个子路由里
    redirect: '/admin/Order',
    // 这里有个坑，就是子路由的地址前面不要写 /
    children: [
      { path: 'Info', component: Info },
      { path: 'Order', component: Order },
      { path: 'WorkerManage', component: WorkerManage },
      { path: 'SelfCenter', component: SelfCenter },
      { path: 'Statistics', component: Statistics },
      { path: 'Student', component: Student },
      { path: 'Tools', component: Tools },
      { path: 'Announcement', component: Announcement }
    ]
  },
  {
    path: '/student',
    component: StudentHome,
    redirect: '/student/updateUser',
    children: [
      { path: 'updateUser', component: UpdateUser },
      { path: 'callUp', component: CallUp },
      { path: 'myOrder', component: MyOrder },
      { path: 'orederList', component: OrderList }
    ]
  }
]

// 重写下 Router 原型链上的 push、replace 方法
// 拦截器的重定向会和上面子路由的重定向引起 vue-router 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  // from 当前导航正要离开的路由
  // to 即将要进入的目标 路由对象

  if (to.path === '/') return next()
  // 几个特殊的路由运行通过就好了
  if (to.path === '/admin/login') return next()
  if (to.path === '/student/login') return next()
  if (to.path === '/student/signUp') return next()
  if (to.path === '/utils/**') return next()

  // 先截取路径前缀（动态获取根路径）
  const pathStr = to.path.substring(1, to.path.substr(1).indexOf('/') + 1)
  // 获取token
  const tokenStr = window.localStorage.getItem(`${pathStr}-token`)
  if (!tokenStr) return next(`/${pathStr}/login`)
  next()
})

// 这一步需要获取指定的 Token
axios.interceptors.request.use(config => {
  const pathStr = config.url.substring(0, config.url.substr(1).indexOf('/') + 1)
  if (pathStr === 'util') { return config }
  config.headers.Authorization = window.localStorage.getItem(`${pathStr}-token`)
  return config
})

// 拦截到 401 Token 错误就返回登陆
axios.interceptors.response.use(response => {
  return response
}, async error => {
  // 对响应错误做处理
  if (error.response.data.code === 401) {
    // Vue.$message.error
    Message.error('登录过期了，请重新登陆')
    const pathStr = error.response.config.url.substring(0, error.response.config.url.substr(1).indexOf('/') + 1)
    router.push(`/${pathStr}/login`)
  } else {
    return Promise.reject(error)
  }
})
export default router
// TODO:等待学生端实现，合并分支后需要调整路由注册规则
