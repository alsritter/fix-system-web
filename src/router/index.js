import Vue from 'vue'
import VueRouter from 'vue-router'
import AdHome from '@/components/admin/AdHome'
// import Imployee from '@/components/admin/Imployee'
import Info from '@/components/admin/Info'
import Login from '@/components/admin/Login'
// import Mission from '@/components/admin/Mission'
// import SelfCenter from '@/components/admin/SelfCenter'
// import Statistics from '@/components/admin/Statistics'
// import Student from '@/components/admin/Student'
// import Tools from '@/components/admin/Tools'
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
    // 用AdHome组件承载管理员其余的全部组件
 path: '/admin',
  component: AdHome,
  redirect: '/Login',
  children: [{
    path: '/Info',
    component: Info
  }, {
    path: '/Login',
    component: Login
  }]

 }]
const router = new VueRouter({
  routes: routes
})
export default router
