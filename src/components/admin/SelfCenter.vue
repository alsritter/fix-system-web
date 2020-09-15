<template>
  <div>
    <el-form
      :model='ruleForm'
      :rules='rules'
      ref='ruleForm'
      label-width='100px'
      class='demo-ruleForm'
    >
      <div class='demo-input-suffix'>
        <el-form-item label='工号' prop='Id'>
          {{ruleForm.id}}
        </el-form-item>
        <el-form-item label='加入时间' prop='joinDate'>
          {{ruleForm.joinDate}}
        </el-form-item>
        <el-form-item label='电话' prop='phone'>
          <el-input v-model="ruleForm.phone" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label='你哪位？' prop='name'>
          <el-input v-model="ruleForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label='签名' prop='details'>
          <el-input v-model="ruleForm.details" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label='请选择性别' prop='gender'>
          <el-radio v-model='ruleForm.gender' label='男' border>男</el-radio>
          <el-radio v-model='ruleForm.gender' label='女' border>女</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="submitForm('ruleForm')">保存更改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="redirect">放弃</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
      },

      rules: {
        phone: [
          { required: true, message: '不要空着哦', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        gender: [{ required: true, message: '不要空着哦', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    redirect() {
      this.$router.push('Order')
    },
    // 提交更改
    submitForm(formName) {
      const that = this
      async function seeWorker() {
        await that.$http
          .patch('admin/user', {
            phone: that.ruleForm.phone,
            gender: that.ruleForm.gender,
            name: that.ruleForm.name,
            details: that.ruleForm.details
          })
          .then(response => {
            that.$message.success('更新成功')
          })
          .catch(() => {
            return that.$message.error('没更新到噢')
          })
      }
      seeWorker()
    },
    // 充值表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 拉取当前管理员信息
    getInfo() {
      const that = this
      async function seeWorker() {
        await that.$http
          .get('admin/user')
          .then(response => {
            that.$message.success('拉取工具成功')
            var date = new Date(response.data.data.joinDate)
            var year = date.getFullYear() + '-'
            var month =
              (date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1) + '-'
            var dates = date.getDate() + ' '
            var hour = date.getHours() + ':'
            var min = date.getMinutes() + ':'
            var second = date.getSeconds()
            that.ruleForm = response.data.data
            that.ruleForm.joinDate = year + month + dates + hour + min + second
          })
          .catch(() => {
            return that.$message.error('没拉取到工具噢')
          })
      }
      seeWorker()
    }
  }
}
</script>

<style scoped>
</style>
TODO:表单规则 验证数据是否存在
