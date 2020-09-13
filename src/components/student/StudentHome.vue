<template>
  <el-container>
    <el-header>
      <li class='el-icon-s-unfold fold_menu' @click='isfold = !isfold'></li>
    </el-header>
    <el-aside>
      <el-menu
        default-active='1-4-1'
        class='el-menu-vertical-demo'
        @open='handleOpen'
        @close='handleClose'
        :collapse='isfold'
      >
        <el-menu-item index='1'>
          <i class='el-icon-menu'></i>
          <span slot='title'>导航一</span>
        </el-menu-item>
        <el-menu-item index='2'>
          <i class='el-icon-menu'></i>
          <span slot='title'>导航二</span>
        </el-menu-item>
        <el-menu-item index='3' disabled>
          <i class='el-icon-document'></i>
          <span slot='title'>导航三</span>
        </el-menu-item>
        <el-menu-item index='4'>
          <i class='el-icon-setting'></i>
          <span slot='title'>导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  data() {
    return {
      isfold: true
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  width: 100%;
}

.el-header {
  border: 1px #000 solid;
  .fold_menu {
    position: absolute;
    right: 10%;
    font-size: 50px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 70%;
  min-height: 100%;
  i,
  li {
    display: inline-block;
  }
}

.el-menu-vertical-demo {
  width: 0;
  i,
  li {
    display: none;
  }
}

.el-menu-vertical-demo {
  min-height: 100%;
  border: 1px blue solid;
}

.el-aside {
  position: fixed;
  height: 100%;
}

.el-main {
  border: 1px red solid;
  height: 100%;
}
</style>
