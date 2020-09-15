<template>
  <div id='app'>
    <router-view v-if='isRouterAlive'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      // 下面设置的这些是 vue 刷新当前页面用的 参考：https://blog.csdn.net/qq_16772725/article/details/80467492
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
</style>
