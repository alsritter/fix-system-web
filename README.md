# FixSystemWeb

#### 介绍
前端远程库

# 使用规范

我已配置好环境，需要先拉取我的代码

具体拉取方式参考我的文档

<<<<<<< HEAD
<<<<<<< HEAD
1.  test
2.  xxxx
3.  xxxx
=======
1.  克隆项目后需要使用命令`npm install`来下载node模块
2.  下载完成后启动vue的GUI界面 全局命令为`vue ui`
3.  在任务管理界面选择到项目文件夹，然后从此处导入
4.  找到 serve字段任务，点击启动
>>>>>>> a71711b932989ef55e061c9c789844c69f5dbb15
=======
之后请各自在自己的分支上进行开发
>>>>>>> LUO_dev

# 使用方式

<<<<<<< HEAD
1.  请勿随意提交到master分支！
2.  请勿随意与master分支合并！
3.  请先在自己的分支进行开发，再进行合并
=======
elementUI已经导入，无需再次导入，直接复制粘贴代码即可
>>>>>>> LUO_dev

比如这里，是我的自己的Nav组件，复制了代码

[![wVv4VH.jpg](https://s1.ax1x.com/2020/09/05/wVv4VH.jpg)](https://imgchr.com/i/wVv4VH)

然后到`App.vue`组件里面导入，注册，使用即可

1. 导入组件，路径要检查正确
2. 注册组件
3. 在html区使用，名字即为你组件的名字

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