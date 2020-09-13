<template>
  <el-form ref='form' :model='updateFrom' label-width='80px' size='mini'>
    <el-form-item label='手机号'>
      <el-input v-model='updateFrom.phone' size='medium'></el-input>
    </el-form-item>
    <el-form-item label='性别'>
      <el-radio-group v-model='updateFrom.gender' size='medium'>
        <el-radio border label='男'></el-radio>
        <el-radio border label='女'></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item size='large'>
      <el-button type='primary' @click='onSubmit'>提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      updateFrom: {
        phone: '13128863333',
        gender: '男'
      }
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style scoped>
</style>
