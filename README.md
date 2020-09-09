# FixSystemWeb

#### 介绍
前端远程库

# 使用规范

我已配置好环境，需要先拉取我的代码

具体拉取方式参考我的文档

之后请各自在自己的分支上进行开发

# 使用方式

elementUI已经导入，无需再次导入，直接复制粘贴代码即可

下面讲组件的注册和使用

比如这里，是我的自己的Nav组件，复制了代码

![weJm3d.jpg](https://s1.ax1x.com/2020/09/06/weJm3d.jpg)

然后到`index.js`组件里面注册

先导入该组件

```js
import Temp from '@/components/admin/Temp'
```

[![weGrpd.jpg](https://s1.ax1x.com/2020/09/06/weGrpd.jpg)](https://imgchr.com/i/weGrpd)

这个routes变量存储我们所有的组件注册

```js
components: Temp
```

如果有嵌套组件，则需要使用嵌套路由

```js
component: Temp ,children: [
        {path: '/admin',component: tab1}
    ]
```

# 使用上的细节

### 使用for循环

在循环的时候，要绑定index

```html
<ul>
   <li v-for="user in users" :key="user">{{user}}</li>
</ul>
```



## 导入组件和使用组件

把写好的组件导入，注册即可

```js
import nav from './components/admin/nav'
export default {
  name: 'App',
  components: {
    nav
  }
}
```

## 组件命名问题

对于组件名字，一定要大写!!!

`Components.vue`

一定要！！！！

# 
