import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

// 把 element 组件的消息组件挂载到原型上，以后直接调用 Vue 的 $massage 对象就行了
Vue.prototype.$massage = Element.Massage
