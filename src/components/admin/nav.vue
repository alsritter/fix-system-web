
<template>
    <div id="menu">
     <ul>
       <img src="C:\Users\86180\front_end_match_project\fix-system-web\src\assets\hua.jpg" alt="">
       <li id="admin">管理员</li>
       <li>用户管理</li>
       <li>工人管理</li>
       <li>耗材管理</li>
       <li>进行中的订单</li>
       <li>待处理的订单</li>
       <li>已完成的订单</li>
       <li>统计</li>
     </ul>
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
 ul li{
   border: 10px;
  color: white;
  list-style-type: none;
  margin-bottom: 70px;
  margin-left: 20%;
 }
 ul li:hover{
   color: pink;
   transform: translate(0px,-10px);
   transition-duration: 0.5s;
 }
 #admin{
   margin-left: 50%;
   margin-top: 40%;
 }
 #menu ::after{
   content:'';
    display:block;
    clear:both;
 }
ul >li{
  border: 10px;
}
</style>
