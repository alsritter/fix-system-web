<template>
  <div class="Login_container">
    <div class="login_box">
      <div class="log_box"></div>
      <!--表单登录区  修改了label-width='80px'-->
      <div class="login">
        <div class="login1">登录</div>
        <div class="login2">
          <el-form
            :model="loginForm"
            label-width="0px"
            :rules="loginFormRules"
            ref="loginFormRef"
            class="login-form"
          >
            <!--输入框-->
            <!-- 这里删掉了el-form-item的label='工号'，写了个label  -->
            <el-form-item class="txt">
              <el-form-item prop="userID" class="data">
                <label>用户名</label>
                <el-input
                  prefix-icon="el-icon-user"
                  v-model="loginForm.userID"
                  @keyup.enter.native="loginValidate"
                ></el-input>
              </el-form-item>
              <!-- 写了label='密码' -->
              <el-form-item prop="password" class="data">
                <label>密码</label>
                <el-input
                  prefix-icon="el-icon-lock"
                  type="password"
                  v-model="loginForm.password"
                  @keyup.enter.native="loginValidate"
                ></el-input>
              </el-form-item>
              <!-- 写了label='验证码' -->
              <el-form-item prop="Ucode" class="data ucode">
                <label>验证码 :</label>
                <!-- 这个是验证码图像，原本在按钮class='btns'里面的 -->
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="loginForm.Ucode"
                  @keyup.enter.native="loginValidate"
                ></el-input>
                <el-image
                  :src="imageURL"
                  id="count"
                  @click="getUtils"
                ></el-image>
              </el-form-item>
              <el-checkbox v-model="remember" style="color: white"
                >记住密码</el-checkbox
              >
            </el-form-item>

            <!--按钮-->
            <el-form-item class="btns">
              <el-button type="primary" @click="loginValidate">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const userID = window.localStorage.getItem('userID')
    const password = window.localStorage.getItem('password')
    if (userID !== null && password !== null) {
      this.loginForm.userID = userID
      this.loginForm.password = password
    }
    this.getUtils()
  },
  data() {
    return {
      remember: true,
      loginForm: {
        userID: 'admin',
        password: 'admin',
        Ucode: ''
      },
      loginFormRules: {
        userID: [
          { required: true, message: '不要空着噢', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        Ucode: [{ required: true, message: '不要空着噢', trigger: 'blur' }]
      },
      imageURL: ''
    }
  },
  watch: {
    remember: function (val) {
      if (val) {
        // 保存密码
        window.localStorage.setItem('password', this.loginForm.password)
        window.localStorage.setItem('userID', this.loginForm.userID)
        console.log('记住')
      } else {
        window.localStorage.setItem('password', null)
        window.localStorage.setItem('userID', null)
      }
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
            that.$message.success('登录成功')
            window.localStorage.setItem('admin-token', res.data.data.token)
            this.$router.push('SelfCenter')
            sessionStorage.clear()
          })
          .catch(error => {
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
<style lang="less" scoped>
.Login_container {
  height: 100%;
  width: 100%;
  // background-image: url('../../assets/img/cover9.jpg');
  // background-image: linear-gradient(40deg, #c1d730, #dae47d);
  background-image: url('../../assets/img/bg02.png');
}

.log_box {
  height: 500px;
  width: 500px;
  background-image: url('../../assets/img/xcd.png');
  background-size: 500px;
  position: relative;
  transform: translate(30%, 50%);
}

/* 登录和蓝色框 */
.login {
  position: absolute;
  top: 20%;
  left: 70%;
  text-align: center;
}
/* 登录框 */
.login1 {
  font-size: 25px;
  font-family: 微软雅黑;
  height: 45px;
  text-align: center;
  color: white;
}
/* 下面那个蓝色框 */
.login-form {
  border-radius: 20px;
  height: 50%;
  background-color: #c4d0d1cc;
  box-shadow: 0 5px 10px rgba(56, 56, 56, 0.397);
  padding: 25px;
}
/* 蓝色框里面的字体 */
.data {
  font-size: 14px;
  color: rgb(255, 255, 255);
  text-align: left;
  font-family: 宋体;
}
.btns {
  border-radius: 10px;
}

/deep/ .el-form-item__error {
  color: #ff0000;
}

.btns /deep/ .el-button {
  // border-style : none;
  box-shadow: 0 2px 5px rgba(56, 56, 56, 0.397);
  // background-color: #e8bd65;
  width: 80%;
}

.ucode {
  position: relative;
  label {
    display: block;
  }
  .el-input {
    width: 50%;
  }

  .el-image {
    margin-left: 10px;
    height: 40px;
    width: 40%;
    border-radius: 5px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
