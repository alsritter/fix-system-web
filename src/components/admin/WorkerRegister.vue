<template>
    <div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="工号" prop="workId">
    <el-input v-model="ruleForm.workId"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pwd">
    <el-input v-model="ruleForm.pwd"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="gender">
      <el-radio v-model="ruleForm.gender" label="男" border>男</el-radio>
      <el-radio v-model="ruleForm.gender" label="女" border>女</el-radio>
  </el-form-item>
  <el-form-item label="详细信息" prop="details">
    <el-input type="textarea" v-model="ruleForm.details"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '冯谭雅',
          pwd: '1234',
          workId: '2018250705646',
          phone: '13128863336',
          gender: '女',
          details: '一名来自德意志的军官'
        },
        rules: {
          workId: [
            { required: true, message: '不要空着哦', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '不要空着哦', trigger: 'change' }
          ],
          name: [
            { type: 'date', required: true, message: '不要空着哦', trigger: 'change' }
          ],
          phone: [
              { min: 11, max: 11, message: '号码长度不对噢', trigger: 'blur' },
            { type: 'date', required: true, message: '不要空着哦', trigger: 'change' }
          ],
          gender: [
            { type: 'array', required: true, message: '不要空着哦', trigger: 'change' }
          ],
          details: [
            { required: true, message: '不要空着哦', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        const that = this
      async function seeWorker() {
        await that.$http
          .post('admin/sign-up-w', {
                name: that.ruleForm.name,
                password: that.ruleForm.pwd,
                workId: that.ruleForm.workId,
                phone: that.ruleForm.phone,
                gender: that.ruleForm.gender,
                details: that.ruleForm.details

          })
          .then(response => {
            that.$message.success('录入工人成功')
          })
          .catch(() => {
            return that.$message.error('该工人已存在')
          })
      }
      seeWorker()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
TODO:表单规则验证工号 手机号 名字是否已存在
