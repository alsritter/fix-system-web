
<template>
  <el-container class="home-container">
    <el-aside>
      <el-col :span="12">
        <h5>管理员</h5>
        <el-menu
          default-active="2"
          @open="handleOpen"
          @close="handleClose"
          text-color="#ffffff"
          active-color="#ff80aa"
          background-color="#0000"
          unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单</span>
            </template>
            <el-menu-item-group title="订单">
              <el-menu-item index="1-1" >
              <i class="el-icon-loading"></i>
              待处理的订单</el-menu-item>
              <el-menu-item index=" '/' + path " >
              <i class="el-icon-timer"></i>进行中的订单</el-menu-item>
              <el-menu-item index="1-3" >
              <i class="el-icon-document-checked"></i>已完成的订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <span slot="title" id="sub5">学生管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-custom"></i>
            <span slot="title" id="sub5">工人管理</span>
          </el-menu-item>
            <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title" id="sub6">耗材管理</span>
          </el-menu-item>
            <el-menu-item index="6">
            <i class="el-icon-data-analysis"></i>
            <span slot="title" id="sub7">统计</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-main>
    <div id="pink">
    <router-view></router-view>
    </div>
    </el-main>
  </el-container>
</template>

<script>
export default {}
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
h5 {
  color: white;
}
#pink{
  background-color: pink;
  height: 100%;
  width: 100%;
  padding: 0px;
}
.el-main{
  padding: 0px;
}
</style>
TODO:黑马从178看到187，做完每个页面的跳转
