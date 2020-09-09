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
          <img :src="imageURL" id="count" @click="getUtils" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '201825070129',
        password: '1234567890',
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
    // 登录验证
    loginValidate() {
      const that = this

      this.$refs.loginFormRef.validate(async (validate) => {
        const uid = sessionStorage.getItem('uuid')
        // const that = this
        if (!validate) return // 发起axios请求

        await that.$http
          .post('student/login', {
            studentId: that.loginForm.username, // 表单参数 3个
            password: that.loginForm.password,
            codevalue: that.loginForm.Ucode,
            uuid: uid // 时间戳参数
          })
          .then((res) => {
            console.log(res) // 要运行到这里
            if (res.data.code !== 200) return that.$message.error('登录失败')
            that.$message.success('登录成功')
            window.localStorage.setItem('token', res.data.data.token)
          })
      })
    },
    getUtils() {
      const that = this
      const uuid = new Date().getTime()
      sessionStorage.setItem('uuid', uuid)
      async function getCode() {
        await that.$http
          .get('utils/code', {
            params: {
              uuid: uuid
            },
            responseType: 'blob'
          })
          .then((response) => {
            that.imageURL = window.webkitURL.createObjectURL(response.data)
          })
      }
      getCode()
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
#count{
  margin-left: 10px;
}
</style>
