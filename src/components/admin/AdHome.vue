
<template>
  <el-container class="home-container">
    <el-header class="header">
      <el-row class="headerBox">
        <el-col :span="1">
          <el-image
            :src="require('@/assets/img/log.jpg')"
            style="width: 50px; height: 50px"
            class="headerLog"
          ></el-image
        ></el-col>
        <el-col :span="10"><div class="headerTitle">Fix System</div></el-col>
        <el-col :span="1" class="document">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击进入 Api 文档"
            placement="bottom"
          >
            <el-link
              :underline="false"
              href="http://alsritter.icu/2020/10/14/api%20%E6%96%87%E6%A1%A3/"
              target="_blank"
              ><i class="el-icon-s-management"></i
            ></el-link>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="isCollapse" @click="isCollapse = !isCollapse">
          <div>{{ isCollapse ? '展开' : '折叠' }}</div>
        </div>
        <el-menu
          text-color="#909399"
          active-text-color="#ff80aa"
          :collapse-transition="false"
          background-color=" #dae47d"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>人员管理</span>
            </template>
            <el-menu-item index="SelfCenter" @click="select('SelfCenter')">
              <i class="el-icon-info"></i>
              <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="Student" @click="select('Student')">
              <i class="el-icon-user-solid"></i>
              <span>学生管理</span>
            </el-menu-item>
            <el-menu-item index="WorkerManage" @click="select('WorkerManage')">
              <i class="el-icon-s-custom"></i>
              <span>工人管理</span>
            </el-menu-item>
            <el-menu-item index="addWorker" @click="select('addWorker')">
              <i class="el-icon-circle-plus"></i>
              <span>添加工人</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>统计页</span>
            </template>
            <el-menu-item index="Statistics" @click="select('Statistics')">
              <i class="el-icon-s-claim"></i>
              <span>报修统计</span>
            </el-menu-item>
            <el-menu-item
              index="resourceStatistics"
              @click="select('resourceStatistics')"
            >
              <i class="el-icon-s-data"></i>
              <span>资源统计</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>资源管理</span>
            </template>
            <el-menu-item index="Order" @click="select('Order')">
              <i class="el-icon-s-order"></i>
              <span>报修管理</span>
            </el-menu-item>

            <el-menu-item index="Tools" @click="select('Tools')">
              <i class="el-icon-s-tools"></i>
              <span>耗材管理</span>
            </el-menu-item>
            <el-menu-item index="addEquipment" @click="select('addEquipment')">
              <i class="el-icon-s-cooperation"></i>
              <span>添加设备</span>
            </el-menu-item>
            <el-menu-item
              index="equipmentList"
              @click="select('equipmentList')"
            >
              <i class="el-icon-s-home"></i>
              <span>设备列表</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="Info" @click="select('Info')">
            <i class="el-icon-message-solid"></i>
            <span>消息中心</span>
          </el-menu-item>
          <el-menu-item @click="signOut()">
            <i class="el-icon-error"></i>
            <span>退出登陆</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧粉色主体 -->
      <el-main class="main">
        <el-container class="interior-container">
          <el-header class="interior-header">
            <div class="title">{{ menuText }}</div>
          </el-header>
          <el-main class="interior-main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuText: ''
    }
  },
  methods: {
    signOut() {
      window.localStorage.setItem('admin-token', null)
      this.$router.push('login')
    },
    async select(index) {
      switch (index) {
        case 'SelfCenter':
          this.menuText = '个人中心'
          break
        case 'Student':
          this.menuText = '学生列表'
          break
        case 'WorkerManage':
          this.menuText = '工人管理'
          break
        case 'addWorker':
          this.menuText = '添加工人'
          break
        case 'Order':
          this.menuText = '报修管理'
          break
        case 'Tools':
          this.menuText = '耗材管理'
          break
        case 'addEquipment':
          this.menuText = '添加设备'
          break
        case 'equipmentList':
          this.menuText = '设备列表'
          break
        case 'Statistics':
          this.menuText = '报修统计'
          break
        case 'resourceStatistics':
          this.menuText = '资源统计'
          break
        case 'Info':
          this.menuText = '消息中心'
          break
        default:
          break
      }
      this.$router.push(index)
    }
  }
}
</script>

<style  lang='less' scoped>
.home-container {
  height: 100%;
  .header {
    background-color: #c1d730;
    .headerBox {
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
    }
    .headerTitle {
      margin-left: 20px;
      font-size: 30px;
      color: white;
      transform: translate(0, 10%);
    }

    .document {
      transform: translate(0, 20%);
      float: right;
      i {
        font-size: 40px;
      }
    }
  }
}

/* background-image: linear-gradient(40deg, #8ac6d1, #bbded7); */
.el-aside {
  background-color: #dae47d;
  border-radius: 0 0 60px 0;
  box-shadow: 2px 0 12px 0 rgba(0, 0, 0, 0.1);
  height: 100%;
  .isCollapse {
    width: 100%;
    height: 50px;
    color: #909399;
    text-align: center;
    font-weight: bold;
    div {
      display: block;
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  .isCollapse:hover {
    background-color: #f7f8df !important;
    cursor: pointer;
  }
  .el-menu-item:hover {
    background-color: #f7f8df !important;
  }
}

.main {
  width: 100%;
  height: 99%;
  padding: 0;
  .interior-container {
    width: 100%;
    height: 99%;
    .interior-header {
      width: 100%;
      background-color: #f7f8df;
      border-bottom-style: dashed;
      border-bottom-width: 1px;
      border-bottom-color: #909399;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .title {
        position: relative;
        color: #909399;
        width: 20%;
        height: 100%;
        left: 5%;
        bottom: 50%;
        transform: translate(0, 70%);
        font-size: 20px;
      }
    }
  }
}

.el-menu {
  border-right: none;
}
</style>
