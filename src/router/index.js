import Vue from 'vue'
import VueRouter from 'vue-router'
import Temp from '@/components/admin/Temp'

Vue.use(VueRouter)
const routes = [
  { path: '/admin', component: Temp }]
const router = new VueRouter({
  routes: routes
})
export default router
