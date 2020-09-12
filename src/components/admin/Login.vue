<template>
  <div class='Login_container'>
    <div class='login_box'>
      <div class='avatar_box'>
        <img src='/src/assets/img/hua.jpg' alt />
      </div>
      <!--表单登录区-->
      <el-form
        :model='loginForm'
        label-width='80px'
        class='login-form'
        :rules='loginFormRules'
        ref='loginFormRef'
      >
        <!--输入框-->
        <el-form-item label='工号' prop='userID'>
          <el-input
            prefix-icon='el-icon-user'
            v-model='loginForm.userID'
            @keyup.enter.native='loginValidate'
          ></el-input>
        </el-form-item>
        <el-form-item label='密码' prop='password'>
          <el-input
            prefix-icon='el-icon-lock'
            type='password'
            v-model='loginForm.password'
            @keyup.enter.native='loginValidate'
          ></el-input>
        </el-form-item>
        <el-form-item label='验证码' prop='Ucode'>
          <el-input
            prefix-icon='el-icon-lock'
            v-model='loginForm.Ucode'
            @keyup.enter.native='loginValidate'
          ></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class='btns'>
          <el-button type='primary' @click='loginValidate'>登录</el-button>
          <el-button @click='resetLoginForm'>重置</el-button>
          <el-button type='info' @click='getUtils'>获取验证码</el-button>
          <el-image :src='imageURL' id='count' @click='getUtils'></el-image>
        </el-form-item>
        <!-- 其它小功能 -->
        <!-- TODO: 功能还没做 -->
        <el-form-item>
          <el-radio>保持登陆</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio>忘记密码</el-radio>
        </el-form-item>
        <el-form-item>
         <el-link target="_blank">还没账号？立即登陆</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getUtils()
  },
  data() {
    return {
      loginForm: {
        userID: '201835070344',
        password: '12342121',
        Ucode: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '不要空着噢', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        Ucode: [{ required: true, message: '不要空着噢', trigger: 'blur' }]
      },
      imageURL: ''
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 获取验证码
    getUtils() {
      const uuid = new Date().getTime()
      sessionStorage.setItem('uuid', uuid)
      this.$http
        .get('utils/code', {
          params: {
            uuid: uuid
          },
          responseType: 'blob'
        })
        .then(response => {
          this.imageURL = window.webkitURL.createObjectURL(response.data)
        })
        .catch(error => {
          console.error(error)
          this.$message.error('获取验证码错误')
          return this.resetLoginForm()
        })
    },
    // 登录验证
    loginValidate() {
      const that = this

      this.$refs.loginFormRef.validate(async validate => {
        const uid = sessionStorage.getItem('uuid')
        if (!validate) {
          return this.$message.error('请把信息填写完整！')
        }
        // 发起axios请求
        await that.$http
          .post('admin/login', {
            workId: that.loginForm.userID, // 表单参数 3个
            password: that.loginForm.password,
            codevalue: that.loginForm.Ucode,
            uuid: uid // 时间戳参数
          })
          .then(res => {
            if (res.data.code !== 200) return that.$message.error('登录失败')
            that.$message.success('登录成功')
            window.localStorage.setItem('admin-token', res.data.data.token)
            this.$router.push('SelfCenter')
          })
          .catch((error) => {
            if (error.response.data.message === 'image code error') {
              return that.$message.error('验证码错误')
            }
            return that.$message.error('登录失败')
          })
      })
    }
  }
}
</script>

<style>
.btns {
  display: flex;
  justify-content: flex-start;
}
.login-form {
  position: absolute;
  width: 40%;
}
#count {
  margin-left: 10px;
}
</style>
