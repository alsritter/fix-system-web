import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/components/admin/Nav'

Vue.use(VueRouter)
const routes = [{ path: '/admin', component: Nav }]

const router = new VueRouter({
  routes
})
export default router
