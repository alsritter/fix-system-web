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
          <el-col :span="24">
            <div class="grid-content bg-purple-dark"></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="工号">
              <div>
                <el-input
                  v-model="subForm.id"
                  placeholder="请输入内容"
                  :disabled="true"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item prop="department" label="所属部门">
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
            <el-form-item prop="place" label="籍贯">
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
            <el-form-item prop="ground" label="职位">
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
          <el-col :span="12">
            <el-form-item label="加入时间">
              <el-date-picker
                type="datetime"
                v-model="subForm.joinDate"
                value-format="yyyy-MM-dd"
                style="width: 90%"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="address" label="家庭住址">
              <div>
                <el-input
                  placeholder="家庭住址"
                  v-model="subForm.address"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="details">
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
        joinDate: new Date(),
        name: '',
        phone: '',
        gender: '男',
        department: '',
        email: '',
        place: '',
        idnumber: '',
        ground: '',
        address: '',
        details: ''
      },
      rules: {
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
  created() {
    this.$http
      .get('admin/user')
      .then(response => {
        this.subForm = response.data.data
        // toLocaleDateString() 2013年1月1日
        // toLocaleTimeString() 上午12:00:00
        // .toLocaleDateString() + '   ' + new Date(time).toLocaleTimeString()
        const time = this.subForm.joinDate
        this.subForm.joinDate = new Date(time)
      })
      .catch(() => {
        return this.$message.error('获取个人信息失败')
      })
  },
  methods: {
    redirect() {
      this.$router.push('Order')
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
          .patch('admin/user', {
            phone: that.subForm.phone,
            gender: that.subForm.gender,
            name: that.subForm.name,
            details: that.subForm.details,
            address: that.subForm.address,
            department: that.subForm.department,
            email: that.subForm.email,
            place: that.subForm.place,
            ground: that.subForm.ground,
            idnumber: that.subForm.idnumber
          })
          .then(response => {
            this.$message.success('更新成功')
          })
          .catch(() => {
            return this.$message.error('没更新到噢')
          })
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.subForm.resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
* {
  padding: 0;
  margin: 0px;
}

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

.el-row {
  margin-bottom: 20px;
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
