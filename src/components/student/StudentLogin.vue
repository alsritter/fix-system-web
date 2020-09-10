<template>
  <el-container>
    <div class="avatar_box">
      <div id="image">
        <span class="iconfont icon-putong image"></span>
      </div>
      <div id="font">
        <span class="font">Login</span>
      </div>
    </div>

    <div class="login_box">
      <el-form :model="loginForm" class="login_form">
        <!-- 用户名 -->
        <el-form-item label-width="0px" prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            back
            v-model="loginForm.username"
            placeholder="学生账号"
            class="student-login"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label-width="0px" prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            show-password
            placeholder="密码"
            class="student-login"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label-width="0px" class="login-code">
          <el-input placeholder="请输入验证码" class="login-code-imput student-login" v-model="loginForm.code"></el-input>
          <img :src="imageURL" class="login-code-img"/>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item label-width="50%" class="btns">
          <el-button type="primary">Login</el-button>
        </el-form-item>
        <!-- 忘记密码 -->
        <el-form-item label-width="50%" class="text-link">
          <el-link :underline="false">Forgot password?</el-link>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      imageURL: ''
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
      color: white;
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
      color: white;
    }
  }
}

/** 样式需要穿透，否则无法更改： https://zhuanlan.zhihu.com/p/29266022 */
.login_box {
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
      width: 30%;
      height: 60px;
      border: 1px solid red;
    }
  }

  .btns {
    margin-bottom: 5px;
    height: 230px;
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
}
</style>
