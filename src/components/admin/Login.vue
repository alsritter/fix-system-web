<template>
  <div class="Login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="/src/assets/img/hua.jpg" alt />
      </div>
      <!--表单登录区-->
      <el-form
        :model="loginForm"
        label-width="80px"
        class="login-form"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!--输入框-->
        <el-form-item label="用户名" prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="Ucode">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.Ucode"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="loginValidate">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
          <el-button type="success">注册</el-button>
          <el-button type="info" @click="getUtils">获取验证码</el-button>
        </el-form-item>
        <img :src="filePath" alt="">
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        Ucode: '',
        filePath: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    loginValidate() {
      this.$refs.loginFormRef.validate(async (validate) => {
        if (validate) return
        const { data: res } = await this.$http.post(
          'student/login',
          this.loginForm
        )
        if (res.meta !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        window.localStorage.setItem('token', res.token)
      })
    },
    getUtils() {
      const that = this
      const uuid = new Date().getTime()
      async function getCode() {
        const res1 = await that.$http.get('utils/code', {
          params: {
            uuid: uuid
          }
        })
        this.filePath = 'data:image/jpeg;base64,' + res1
      }
      getCode()
    }
  }
}
</script>

<style>
.btns {
  display: flex;
  justify-content: flex-end;
}
.login-form {
  position: absolute;
  width: 40%;
}
</style>
TODO:获取到登录后的数据
TODO2:获得正确的账号密码，想办法使axios请求生效
