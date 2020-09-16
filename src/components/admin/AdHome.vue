
<template>
  <el-container class="home-container">
    <el-aside>
      <el-col :span="12">
        <el-button type="text" @click="toSelfCenter">管理员</el-button>
        <el-menu
          default-active="SelfCenter"
          text-color="#ffffff"
          active-text-color="#ff80aa"
          background-color="#0000"
          :router="true"
        >
          <el-menu-item index="Order">
            <i class="el-icon-user-solid"></i>
            <span slot="title" id="sub4">订单</span>
          </el-menu-item>
           <el-menu-item index="Student">
            <i class="el-icon-user-solid"></i>
            <span slot="title" id="sub5">学生管理</span>
          </el-menu-item>
          <el-menu-item index="WorkerManage">
            <i class="el-icon-s-custom"></i>
            <span slot="title" id="sub5" >工人管理</span>
          </el-menu-item>
            <el-menu-item index="Tools">
            <i class="el-icon-setting"></i>
            <span slot="title" id="sub6" >耗材管理</span>
          </el-menu-item>
            <el-menu-item index="Statistics">
            <i class="el-icon-data-analysis"></i>
            <span slot="title" id="sub7" >统计</span>
          </el-menu-item>

          <el-menu-item index="Info">
            <i class="el-icon-data-analysis"></i>
            <span slot="title" id="sub7" >消息中心</span>
          </el-menu-item>

           <el-menu-item index="Announcement">
            <i class="el-icon-data-analysis"></i>
            <span slot="title" id="sub7" >发布公告</span>
          </el-menu-item>
          <el-menu-item index="WorkerRegister">
            <i class="el-icon-data-analysis"></i>
            <span slot="title" id="sub7" >录入工人</span>
          </el-menu-item>
          <el-menu-item index="Login">
             <el-button @click="signOut">退出登录</el-button>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-main>
    <div id="pink">
      <div id="begies">
        <router-view></router-view>
        </div>
    </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      open: ''
    }
  },
  methods: {
    openindex(c) {
      for (var i = 0; i < this.menuItems.length; i++) {
        for (var j = 0; j < this.menuItems[i].children.length; j++) {
          if (c.replace('/', '') === this.menuItems[i].children[j].name) {
            return `${i}-${j}`
          }
        }
      }
    },
    signOut() {
      window.localStorage.clear()
      this.$router.push('login')
    },

    toSelfCenter() {
      this.$router.push('SelfCenter')
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-aside {
  background-image: linear-gradient(40deg, #8ac6d1, #bbded7);
}
.el-col-12{
  width: 100%;
}

.el-menu {
  border-right: none;
}
h3 {
  color: white;
}
#pink{
  background-color: pink;
  height: 100%;
  width: 100%;
  padding: 0px;
}

/*
#begies{
      width: 90%;
    height: 90%;
    background-color: beige;
     display: block;
    margin: 0 auto;
}
*/
.el-main{
  padding: 0px;
}
</style>
