<template>
  <div>
    <el-table :data='students' style='width: 100%'>
      <el-table-column prop='studentId' label='学号' width='180'></el-table-column>
      <el-table-column prop='gender' label='男' width='180'></el-table-column>
      <el-table-column prop='phone' label='电话'></el-table-column>
      <el-table-column prop='name' label='姓名'></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {
    this.getStudent()
  },
  data() {
    return {
      students: []
    }
  },
  methods: {
    getStudent() {
      const that = this
      async function seeWorker() {
        await that.$http
          .get('admin/student-list')
          .then(response => {
            that.$message.success('拉取学生成功')
            that.students = response.data.data
          })
          .catch(error => {
            return that.$message.error(error.$message)
          })
      }
      seeWorker()
    }
  }
}
</script>

<style scoped>
</style>
