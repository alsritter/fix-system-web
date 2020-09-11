import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import axios from 'axios'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import qs from 'qs'
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
// vue相关配置
Vue.use(ElementUI)
Vue.config.productionTip = false
// axios相关配置
axios.defaults.baseURL = 'http://47.103.192.147:8080/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})
Vue.prototype.$value = new Vue()
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
