
<template>
    <div>
      <el-col id="navi-menu" :span="12">
    <h5>晚上好！管理员123</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
       <el-menu-item index="1" class="navi-child-item">
        <i class="el-icon-menu" ></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="2" class="navi-child-item">
        <i class="el-icon-menu"></i>
        <span slot="title">工人管理</span>
      </el-menu-item>
      <el-menu-item index="3" class="navi-child-item">
        <i class="el-icon-setting"></i>
        <span slot="title">耗材管理</span>
      </el-menu-item>
      <el-menu-item index="4" class="navi-child-item">
        <i class="el-icon-setting"></i>
        <span slot="title">待处理的订单</span>
      </el-menu-item>
       <el-menu-item index="5" class="navi-child-item">
        <i class="el-icon-setting"></i>
        <span slot="title">进行中的订单</span>
      </el-menu-item>
       <el-menu-item index="6" class="navi-child-item">
        <i class="el-icon-setting"></i>
        <span slot="title">已完成的订单</span>
      </el-menu-item>
    </el-menu>
  </el-col>
    </div>
</template>

<script>
export default {
}
</script>

<style>
 .el-menu-vertical-demo {
   background-color: #8AC6D1;
 }
 #navi-menu{
   width: 100%;
   border: none;
 }
 .navi-child-item{
   border: 10px;
  background-color: #BBDED7;
 }
</style>
