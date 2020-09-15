<template>
  <el-form
    ref='updateFromRules'
    :model='updateFrom'
    label-width='80px'
    size='mini'
    :rules='updateFromRules'
  >
    <el-form-item label='名称' prop='name'>
      <el-input v-model='updateFrom.name' size='medium'></el-input>
    </el-form-item>
    <el-form-item label='手机号' prop='phone'>
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
  created() {
    this.getSelf()
  },
  data() {
    return {
      updateFromRules: {
        name: [
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          {
            validator: this.checkPhone,
            trigger: 'blur'
          }
        ]
      },
      updateFrom: {
        name: '',
        phone: '',
        gender: ''
      }
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
    getSelf() {
      this.$http
        .get('student/user')
        .then(res => {
          this.updateFrom.name = res.data.data.name
          this.updateFrom.phone = res.data.data.phone
          this.updateFrom.gender = res.data.data.gender
        })
        .catch(() => {
          return this.$message.error('更新个人资料失败！')
        })
    },
    onSubmit() {
      const that = this
      this.$refs.updateFromRules.validate(async validate => {
        if (!validate) {
          return this.$message.error('请把信息填写完整！')
        }

        // 发起axios请求
        await that.$http
          .patch('student/user', {
            name: that.updateFrom.name,
            phone: that.updateFrom.phone,
            gender: that.updateFrom.gender
          })
          .then(res => {
            that.$message.success('修改数据成功')
            // TODO: 刷新当前的页面
            this.getSelf()
          })
          .catch(() => {
            return that.$message.error('修改个人资料错误')
          })
      })
    }
  }
}
</script>

<style scoped>
</style>
