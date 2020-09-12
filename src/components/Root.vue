<template>
  <el-button-group>
    <el-button type='primary' @click="pushToStudent()">学生页面</el-button>
    <el-button type='primary' @click="pushToAdmin()">管理员页面</el-button>
    <el-button type='primary'>工人页面</el-button>
  </el-button-group>
</template>

<script>
export default {
  // 选择跳转到哪个页面
  methods: {
    pushToStudent() {
      this.$router.push('/student')
    },
    pushToAdmin() {
      this.$router.push('admin/Login')
    }
  }
}
</script>

<style scoped>
</style>
