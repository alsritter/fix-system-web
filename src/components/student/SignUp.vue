<template>
  <el-container>
    <div class='avatar_box'>
      <div id='image'>
        <span :class='["iconfont image", headIcon]' :style='{color:stateColor}'></span>
      </div>
      <div id='font'>
        <span class='font' :style='{color:stateColor}'>Sign Up</span>
      </div>
    </div>

    <div class='signUp_box'>
      <el-form :model='signUpForm' class='login_form' ref='signUpFormRef' :rules='signUpFormRules'>
        <!-- 用户 id -->
        <el-form-item label-width='0px' prop='userID'>
          <el-input
            back
            v-model.number='signUpForm.userID'
            placeholder='学生账号'
            class='student-signUp'
          ></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label-width='0px' prop='phone'>
          <el-input back v-model.number='signUpForm.phone' placeholder='手机号' class='student-signUp'></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label-width='0px' prop='name'>
          <el-input back v-model='signUpForm.name' placeholder='用户名' class='student-signUp'></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label-width='0px' prop='password'>
          <el-input
            v-model='signUpForm.password'
            show-password
            placeholder='密码'
            class='student-signUp'
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label-width='0px' prop='checkPass'>
          <el-input
            v-model='signUpForm.checkPass'
            show-password
            placeholder='确认密码'
            class='student-signUp'
          ></el-input>
        </el-form-item>
        <!-- 选择性别 -->
        <el-form-item class>
          <el-radio-group v-model='signUpForm.gender'>
            <el-radio border label='男'></el-radio>
            <el-radio border label='女'></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label-width='0px' class='login-code' prop='Ucode'>
          <el-input
            placeholder='请输入验证码'
            @keyup.enter.native='signUpValidate'
            class='login-code-imput student-signUp'
            v-model='signUpForm.Ucode'
          ></el-input>
          <el-image :src='imageURL' class='login-code-img' @click='getUtils'></el-image>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item label-width='50%' class='btns'>
          <el-button type='primary' @click='signUpValidate()'>Sign Up</el-button>
        </el-form-item>
        <!-- 返回登陆 -->
        <el-form-item label-width='50%' class='text-link'>
          <el-link :underline='false' @click='backToLogin()'>Back to login</el-link>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getUtils()
  },
  data() {
    return {
      signUpForm: {
        phone: 13128866666,
        name: '张三',
        checkPass: '1234567890',
        userID: 201825070140,
        password: '1234567890',
        gender: '男',
        Ucode: ''
      },
      signUpFormRules: {
        name: [
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ],
        userID: [
          {
            required: true,
            message: '不要空着噢',
            trigger: 'blur',
            type: 'number'
          },
          { validator: this.isExist, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '不要空着噢',
            trigger: 'blur'
          },
          // trigger: 'blur' 是失去焦点触发，change 是改变后触发
          {
            min: 4,
            max: 20,
            message: '长度在 4 到 20 个字符',
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            min: 4,
            max: 20,
            message: '长度在 4 到 20 个字符',
            trigger: 'blur'
          },
          { validator: this.checkPassword, trigger: 'blur' }
        ],
        Ucode: [{ required: true, message: '不要空着噢', trigger: 'blur' }],
        phone: [
          { required: true, trigger: 'blur' },
          {
            validator: this.checkPhone,
            trigger: 'blur'
          }
        ]
      },
      imageURL: '',
      headIcon: 'icon-dai',
      stateColor: '#fff'
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
    checkPassword(rule, value, callback) {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.signUpForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    isExist(rule, value, callback) {
      this.$http
        .get('utils/is-exist', {
          params: {
            id: value
          }
        })
        .then(response => {
          // fasle 表示用户不存在
          if (!response.data.data) {
            callback()
          } else {
            callback(new Error('当前用户已经存在!'))
          }
        })
        .catch(error => {
          // 出现未知错误也禁止注册
          console.error(error)
          callback(new Error('当前用户已经存在!'))
        })
    },
    backToLogin() {
      this.$router.push('/student/Login')
    },
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
          return this.$message.error('获取验证码错误')
        })
    },
    // 登录验证
    signUpValidate() {
      const that = this
      this.$refs.signUpFormRef.validate(async validate => {
        const uid = sessionStorage.getItem('uuid')

        if (!validate) {
          return this.$message.error('请把信息填写完整！')
        }

        // 发起axios请求
        await that.$http
          .post('student/sign-up', {
            studentId: that.signUpForm.userID, // 表单参数 3个
            password: that.signUpForm.password,
            codevalue: that.signUpForm.Ucode,
            name: that.signUpForm.name,
            phone: that.signUpForm.phone,
            gender: that.signUpForm.gender,
            uuid: uid // 时间戳参数
          })
          .then(res => {
            that.$message.success('注册成功！')
            // 更换为笑脸
            that.stateColor = 'rgb(129 228 100)'
            that.headIcon = 'icon-zhayan'
            window.localStorage.setItem('student-token', res.data.data.token)
            // 等待 0.5 秒再进去
            setTimeout(() => {
              this.$router.push('/student')
            }, 500)
          })
          .catch(error => {
            if (error.response.data.message === 'image code error') {
              return that.$message.error('验证码错误')
            }

            // 更换为失败脸
            that.headIcon = 'icon-kulian1'
            that.stateColor = 'rgb(224 93 93)'
            return that.$message.error('注册失败')
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(40deg, #4e43f9, #7c98fd);
  position: relative;
}

/** 头像区域 */
.avatar_box {
  width: 100%;
  height: 30%;
  position: absolute;
  display: block;
  /** 要解决位置塌陷的问题：元素脱离文档流引发父级边框塌陷问题 */
  #image {
    height: 70%;
    width: 100%;
    position: relative;
    .image {
      position: absolute;
      transform: translate(-50%, 50%);
      left: 50%;
      font-size: 100px;
    }
  }

  #font {
    height: 30%;
    width: 100%;
    position: relative;
    .font {
      position: absolute;
      transform: translate(-50%, 0);
      left: 50%;
      top: 10%;
      font-size: 25px;
    }
  }
}

/** 样式需要穿透，否则无法更改： https://zhuanlan.zhihu.com/p/29266022 */
.signUp_box {
  width: 100%;
  height: 70%;
  position: absolute;
  bottom: 0%;
  .login_form {
    bottom: 0;
    width: 80%;
    height: 100%;
    position: absolute;
    left: 10%;
    .el-form-item {
      margin-bottom: 12px;
    }
  }

  .login-code {
    width: 50%;
    position: relative;

    .login-code-img {
      position: absolute;
      margin-left: 20%;
      width: 80%;
      height: 50px;
      border-radius: 5px;
    }
  }

  .btns {
    margin-bottom: 5px;
    height: 10%;
    width: 100%;
    position: relative;
    .el-button {
      position: absolute;
      transform: translate(-50%, 0);
      left: 50%;
      width: 300px;
      height: 50px;
      background-color: white;
      color: #4e43f9;
      bottom: 15%;
      box-shadow: 0 5px 5px rgba(56, 56, 56, 0.397);
    }
  }

  .text-link {
    .el-link {
      transform: translate(-50%, -50%);
      color: white;
    }
  }

  .el-radio {
    background-color: #ffffff33;
    color: #606266;
    margin-right: 0;
  }
}
</style>
