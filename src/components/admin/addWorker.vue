<template>
  <div class="user-box">
    <el-card class="box-card">
      <el-form
        label-position="right"
        label-width="80px"
        :model="subForm"
        :rules="rules"
        ref="subForm"
        class="inputFromBox"
      >
        <el-row>
          <el-col :span="8" class="top-item">
            <el-form-item prop="id" label="工号">
              <div>
                <el-input
                  v-model="subForm.id"
                  placeholder="请输入内容"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="top-item">
            <el-form-item prop="name" label="用户名">
              <div>
                <el-input
                  v-model="subForm.name"
                  placeholder="请输入内容"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="top-item">
            <el-form-item label="所属部门">
              <div>
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="subForm.department"
                >
                  <el-option
                    v-for="item in ['信息办', '系统管理员', '财务部']"
                    :key="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="phone" label="手机号码">
              <div>
                <el-input
                  v-model="subForm.phone"
                  placeholder="请输入内容"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="gender" label="选择性别">
              <div>
                <el-select
                  v-model="subForm.gender"
                  placeholder="请选择"
                  style="width: 90%"
                >
                  <el-option
                    v-for="item in ['男', '女']"
                    :key="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="email">
              <div>
                <el-input placeholder="邮箱" v-model="subForm.email"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="籍贯">
              <div>
                <el-input
                  placeholder="籍贯"
                  v-model="subForm.place"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证" prop="idnumber">
              <div>
                <el-input
                  placeholder="身份证号码"
                  v-model="subForm.idnumber"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位">
              <div>
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="subForm.ground"
                >
                  <el-option
                    v-for="item in ['后勤部老师', '系统管理员', '财务部老师']"
                    :key="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="家庭住址">
              <div>
                <el-input
                  placeholder="家庭住址"
                  v-model="subForm.address"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码" prop="password">
              <div>
                <el-input
                  placeholder="请输入密码"
                  v-model="subForm.password"
                  type="password"
                  style="width: 100%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <div class="input-textarea">
                <el-input
                  v-model="subForm.details"
                  placeholder="请输入内容"
                  type="textarea"
                  :rows="5"
                  maxlength="300"
                  show-word-limit
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传头像">
          <el-upload
            drag
            multiple
            :action="uploadUrl"
            :limit="1"
            accept="image/jpeg,image/png"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将图片拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过 2M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <el-button
              type="primary"
              class="btnbc"
              @click="submitForm(subForm)"
              round
              >提交</el-button
            >
            <el-button class="btncz" @click="resetForm(subForm)" round
              >重置</el-button
            >
          </div>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark"></div
          ></el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subForm: {
        id: '',
        joinDate: new Date(),
        name: '',
        phone: '',
        gender: '男',
        department: '',
        password: '',
        email: '',
        place: '',
        idnumber: '',
        ground: '',
        address: '',
        details: '',
        url: ''
      },
      uploadUrl: `${this.$http.defaults.baseURL}admin/upload`,
      rules: {
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        id: [
          {
            required: true,
            message: '工号不能为空',
            trigger: 'blur'
          },
          {
            validator: this.isExist,
            trigger: 'blur'
          },
          { min: 8, max: 17, message: '长度在 8 到 17 个字符', trigger: 'blur' }
        ],
        phone: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        gender: [{ required: true, message: '不要空着哦', trigger: 'blur' }],
        name: [{ required: true, message: '不要空着哦', trigger: 'blur' }],
        email: [
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '请输入正确的格式',
            trigger: 'blur'
          }
        ],
        idnumber: [
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
            message: '请输入正确的格式',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return isLt2M
    },
    handleError() {
      console.log('上传失败')
      return this.$message.error('上传失败')
    },
    handleSuccess(response, file, fileList) {
      this.subForm.url = response.data
      console.log(this.subForm.url)
      console.log('上传成功')
    },
    handleRemove(file, fileList) {
      this.subForm.url = null
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
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    // 提交更改
    submitForm(formName) {
      const that = this
      this.$refs.subForm.validate(validate => {
        if (!validate) {
          return this.$message.error('请检查输入格式')
        }
        this.$http
          .post('admin/sign-up-w', {
            workId: that.subForm.id,
            phone: that.subForm.phone,
            gender: that.subForm.gender,
            name: that.subForm.name,
            details: that.subForm.details,
            address: that.subForm.address,
            department: that.subForm.department,
            password: that.subForm.password,
            email: that.subForm.email,
            place: that.subForm.place,
            ground: that.subForm.ground,
            idnumber: that.subForm.idnumber,
            url: that.subForm.url
          })
          .then(response => {
            this.$message.success('添加成功！')
            setTimeout(() => {
              this.$router.push('WorkerManage')
            }, 1000)
          })
          .catch(() => {
            return this.$message.error('添加失败')
          })
      })
    },
    // 充值表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .el-card {
  border-radius: 20px;
}

// 下面的，里面的框;.item:左边的字体，righ：右边
.inputFromBox {
  .btn {
    text-align: center;
    position: relative;
  }
}

// 按钮
.btnbc {
  background-color: #b85c4f;
  border: none;
}
.btnbc:hover {
  background-color: #b85c4f;
  border: 3px solid #b85c4f;
}
.btnbc:focus {
  background-color: #b85c4f;
}
.btncz {
  background-color: #fe8c50;
  color: #ffffff;
}
.btncz:hover {
  background-color: #fe8c50;
  border: 3px solid #fe8c50;
  color: #ffffff;
}
.btncz:focus {
  background-color: #fe8c50;
  color: #ffffff;
}

/deep/ .el-textarea .el-textarea__inner {
  // 然后找到对应的类名，在这里将拉伸去掉即可
  resize: none;
}

.top-item {
  margin-top: 15px;
}

.el-upload {
  position: relative;
  left: 50%;
}

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #dae47d;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
