<template>
  <el-form
    :model='orderForm'
    ref='orderForm'
    label-width='100px'
    class='demo-ruleForm'
  >
    <!-- 联系人名称 -->
    <el-form-item label='联系人名称' prop='contacts'>
      <el-input v-model='orderForm.contacts'></el-input>
    </el-form-item>
    <!-- 选择报修类型 -->
    <el-form-item label='报错类型' prop='faultClass'>
      <el-select v-model='orderForm.faultClass' placeholder='请选择报错类型'>
        <!-- TODO: 这里要使用动态传入值 -->
        <el-option label='网络问题' value="网络问题"></el-option>
        <el-option label='一卡通报错' value="一卡通报错"></el-option>
      </el-select>
    </el-form-item>
    <!-- 详细地址 -->
    <el-form-item label='详细地址' prop='address'>
      <el-input v-model='orderForm.address'></el-input>
    </el-form-item>
    <!-- 手机号 -->
    <el-form-item label='手机号'  prop='phone'>
      <el-input back v-model.number='orderForm.phone' placeholder='手机号'></el-input>
    </el-form-item>
    <!-- 错误描述 label-width='0px' 可以使之无左边描述 -->
    <el-form-item label-width='0px' prop='faultDetails'>
      <el-input type='textarea' v-model='orderForm.faultDetails'  placeholder='错误描述'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type='primary'>提交</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      orderForm: {
        phone: '13128863333',
        address: '18 栋 401',
        contacts: '张三',
        faultClass: '网络问题',
        faultDetails: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
