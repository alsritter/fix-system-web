import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// 单独引入消息组件
import { Message } from 'element-ui'
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
import addWorker from '@/components/admin/addWorker.vue'
import addEquipment from '@/components/admin/addEquipment.vue'
import equipmentList from '@/components/admin/equipmentList.vue'
import resourceStatistics from '@/components/admin/resourceStatistics.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/admin/SelfCenter' },
  { path: '/admin/login', component: AdminLogin },
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
      {
        path: 'WorkerManage',
        component: WorkerManage
      },
      { path: 'SelfCenter', component: SelfCenter },
      { path: 'Statistics', component: Statistics },
      { path: 'Student', component: Student },
      { path: 'Tools', component: Tools },
      { path: 'Statistics', component: Statistics },
      { path: 'addWorker', component: addWorker },
      { path: 'addEquipment', component: addEquipment },
      { path: 'equipmentList', component: equipmentList },
      { path: 'resourceStatistics', component: resourceStatistics }
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
  if (to.path === '/utils/**') return next()
  // 获取token
  const tokenStr = window.localStorage.getItem('admin-token')
  if (!tokenStr) return next('/admin/login')
  next()
})

// 这一步需要获取指定的 Token
axios.interceptors.request.use(config => {
  const pathStr = config.url.substring(0, config.url.substr(1).indexOf('/') + 1)
  if (pathStr === 'util') { return config }
  config.headers.Authorization = window.localStorage.getItem('admin-token')
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
    router.push('/admin/login')
  } else {
    return Promise.reject(error)
  }
})
export default router
// TODO:等待学生端实现，合并分支后需要调整路由注册规则
