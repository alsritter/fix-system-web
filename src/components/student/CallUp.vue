<template>
  <el-form :model='orderForm' label-width='100px' :rules='orderFormRules'>
    <!-- 联系人名称 -->
    <el-form-item label='联系人名称' prop='contacts'>
      <el-input v-model='orderForm.contacts'></el-input>
    </el-form-item>
    <!-- 选择报修类型 -->
    <el-form-item label='报错类型' prop='faultClass'>
      <el-select v-model='orderForm.faultClass' placeholder='请选择报错类型'>
        <el-option v-for='(item, index) in faultList' :key='index' :label='item' :value='item'></el-option>
      </el-select>
    </el-form-item>
    <!-- 详细地址 -->
    <el-form-item label='详细地址' prop='address'>
      <el-input v-model='orderForm.address'></el-input>
    </el-form-item>
    <!-- 手机号 -->
    <el-form-item label='手机号' prop='phone'>
      <el-input v-model='orderForm.phone' size='medium'></el-input>
    </el-form-item>
    <!-- 错误描述 label-width='0px' 可以使之无左边描述 -->
    <el-form-item label-width='0px' prop='faultDetails'>
      <el-input type='textarea' v-model='orderForm.faultDetails' placeholder='错误描述'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click='submitForm()'>提交</el-button>
      <el-button @click='resetForm()'>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  created() {
    this.getFaultClass()
  },
  data() {
    return {
      orderFormRules: {
        contacts: [
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          {
            validator: this.checkPhone,
            trigger: 'blur'
          }
        ]
      },
      orderForm: {
        phone: '13128863333',
        address: '18 栋 401',
        contacts: '张三',
        faultClass: '',
        faultDetails: ''
      },
      faultList: []
    }
  },
  methods: {
    checkPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    },
    getFaultClass() {
      this.$http
        .get('utils/fault-class')
        .then(res => {
          // 因为数组不是响应式更新，所以需要手动
          this.faultList = res.data.data
        })
        .catch(() => {
          return this.$message.error('取得错误列表失败！')
        })
    },
    resetForm() {
      this.orderForm.phone = ''
      this.orderForm.address = ''
      this.orderForm.contacts = ''
      this.orderForm.faultClass = ''
      this.orderForm.faultDetails = ''
    },
    submitForm() {
      this.$http
        .post('student/order', {
          studentPhone: this.orderForm.phone,
          address: this.orderForm.address,
          contacts: this.orderForm.contacts,
          faultClass: this.orderForm.faultClass,
          faultDetails: this.orderForm.faultDetails
        })
        .then(res => {
          this.$message.success('提交订单成功')
        })
        .catch(() => {
          return this.$message.error('取得错误列表失败！')
        })
    }
  }
}
</script>

<style scoped>
</style>
