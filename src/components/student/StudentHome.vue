<template>
  <el-container>
    <el-header>
      <span class='fold_menu_text'>{{menuText}}</span>
      <li :class='[menuIcon,"fold_menu_icon"]' @click='menuButton()'></li>
    </el-header>
    <el-aside :class='{isNone:isfoldAside}'>
      <el-menu class='el-menu-vertical-demo' @select='select' :collapse='isfold' router>
        <el-menu-item index='updateUser'>
          <i class='el-icon-user-solid'></i>
          <span slot='title'>修改个人资料</span>
        </el-menu-item>
        <el-menu-item index='callUp'>
          <i class='el-icon-s-promotion'></i>
          <span slot='title'>发起订单</span>
        </el-menu-item>
        <el-menu-item index='myOrder'>
          <i class='el-icon-s-order'></i>
          <span slot='title'>当前订单</span>
        </el-menu-item>
        <el-menu-item index='orederList'>
          <i class='el-icon-s-claim'></i>
          <span slot='title'>历史订单</span>
        </el-menu-item>
        <el-menu-item @click='signOut()'>
          <i class='el-icon-error'></i>
          <span slot='title'>退出登陆</span>
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
    signOut() {
      window.localStorage.clear()
      this.$router.push('login')
    },
    async menuButton() {
      this.isfold = !this.isfold
      // 因为折叠的时间和展示的时间不同，所以需要分开
      if (this.isfoldAside) {
        await setTimeout(() => {
          this.isfoldAside = !this.isfoldAside
        }, 50)
      } else {
        await setTimeout(() => {
          this.isfoldAside = !this.isfoldAside
        }, 300)
      }
    },
    async select(index, indexPath) {
      this.isfold = !this.isfold

      switch (index) {
        case 'updateUser':
          this.menuText = '修改个人资料'
          break
        case 'callUp':
          this.menuText = '发起订单'
          break
        case 'myOrder':
          this.menuText = '当前订单'
          break
        case 'orederList':
          this.menuText = '历史订单'
          break
        default:
          break
      }
      if (this.isfoldAside) {
        await setTimeout(() => {
          this.isfoldAside = !this.isfoldAside
        }, 50)
      } else {
        await setTimeout(() => {
          this.isfoldAside = !this.isfoldAside
        }, 300)
      }
    }
  },
  data() {
    return {
      isfold: true,
      isfoldAside: true,
      menuIcon: 'el-icon-s-unfold',
      menuText: '修改个人资料'
    }
  },
  watch: {
    isfold: async function (val) {
      if (val) {
        this.menuIcon = 'el-icon-s-unfold'
      } else {
        await setTimeout(() => {
          this.menuIcon = 'el-icon-s-fold'
        }, 200)
      }
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
  position: relative;
  background-image: linear-gradient(40deg, #4e43f9, #7c98fd);
  box-shadow: 0 5px 10px rgba(56, 56, 56, 0.397);
  z-index: 5;
  color: white;
  .fold_menu_text {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 5%;
    font-size: 15px;
  }
  .fold_menu_icon {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 10%;
    font-size: 30px;
  }
}

.el-aside {
  position: fixed;
  height: 100%;
  z-index: 10;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 70%;
    i,
    li {
      display: inline-block;
    }
  }

  .el-menu-vertical-demo {
    width: 0;
    box-shadow: 0 5px 5px rgba(56, 56, 56, 0.397);
    min-height: 100%;

    i,
    li {
      display: none;
    }
  }
}

.isNone {
  z-index: 0;
}

.el-main {
  height: 100%;
}
</style>
