import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 把 element 组件的消息组件挂载到原型上，以后直接调用 Vue 的 $message 对象就行了
Vue.prototype.$message = ElementUI.Message
