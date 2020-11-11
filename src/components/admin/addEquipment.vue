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
            <el-form-item prop="ename" label="设备名称">
              <div>
                <el-input
                  v-model="subForm.ename"
                  placeholder="请输入内容"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="top-item">
            <el-form-item prop="eclass" label="设备分组">
              <div>
                <el-autocomplete
                  v-model="subForm.eclass"
                  :fetch-suggestions="querySearch"
                  placeholder="请填写该设备的分组"
                ></el-autocomplete>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="egrade" label="设备等级">
              <div>
                <el-select v-model="subForm.egrade" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查时间" prop="eweightGrade">
              <div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="输入的单位是天"
                  placement="top-start"
                >
                  <el-input
                    placeholder="输入时间"
                    v-model.number="subForm.eweightGrade"
                    style="width: 90%"
                  ></el-input>
                </el-tooltip>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用单位" prop="usingUnit">
              <el-tooltip
                class="item"
                effect="dark"
                content="输入使用该设备的工作单位"
                placement="top-start"
              >
                <el-input
                  placeholder="请输入单位名称"
                  v-model="subForm.usingUnit"
                  style="width: 90%"
                ></el-input>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备型号" prop="etype">
              <div>
                <el-input
                  clearable
                  placeholder="设备型号"
                  v-model="subForm.etype"
                  style="width: 90%"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择员工" prop="eworkerId">
              <el-tooltip
                class="item"
                effect="dark"
                content="选择对该设备定期维护的维修工"
                placement="top-start"
              >
                <!-- 不想被重置就不要写 prop -->
                <el-input
                  placeholder="维修工工号"
                  v-model="subForm.eworkerId"
                  style="width: 90%"
                  :disabled="true"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="selectWorkerVisible = true"
                  ></el-button>
                </el-input>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="所在地址" prop="address">
              <div>
                <el-input
                  placeholder="设备所在住址"
                  v-model="subForm.address"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传图像">
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
    <!-- 选择工人 -->
    <select-worker
      :visible="selectWorkerVisible"
      @visible-change="selectWorkerVisible = false"
      @select-workerId="getWorkerId"
    ></select-worker>
    <!-- 二维码弹窗 -->
    <qr-dialog
      @visible-change="qrVisible = false"
      :visible="qrVisible"
      :qrText="qrText"
    ></qr-dialog>
  </div>
</template>

<script>
import selectWorker from './selectWorker'
import qrDialog from './qrDialog'
export default {
  components: {
    selectWorker,
    qrDialog
  },
  data() {
    return {
      eclass: {},
      subForm: {
        eclass: '',
        egrade: '',
        eweightGrade: 360,
        usingUnit: '',
        eworkerId: '',
        url: ''
      },
      // 要生成二维码的文本
      qrText: '',
      // 窗口显示标识
      qrVisible: false,
      selectWorkerVisible: false,
      options: [
        {
          value: 1,
          label: 'E 级（无需管理）'
        },
        {
          value: 2,
          label: 'D 级'
        },
        {
          value: 3,
          label: 'C 级'
        },
        {
          value: 4,
          label: 'B 级'
        },
        {
          value: 5,
          label: 'A 级（重点关注）'
        }
      ],
      uploadUrl: `${this.$http.defaults.baseURL}admin/upload`,
      rules: {
        ename: [{ required: true, message: '不要空着哦', trigger: 'blur' }],
        address: [{ required: true, message: '不要空着哦', trigger: 'blur' }],
        eworkerId: [{ required: true, message: '不要空着哦', trigger: 'blur' }],
        eweightGrade: [
          { required: true, message: '不要空着哦', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ]
      }
    }
  },
  created() {
    this.$http
      .get('admin/equipment-class')
      .then(response => {
        this.eclass = response.data.data
        // 需要处理下格式（坑！！！ 默认绑定的是 value，如果要指定 Array 里的对象的属性，要使用 value-key 绑定属性名）
        const temp = []
        for (const item of this.eclass) {
          temp.push({ value: item })
        }
        this.eclass = temp
      })
      .catch()
  },
  methods: {
    getWorkerId(row) {
      this.subForm.eworkerId = row.id
    },
    // 格式化状态
    statusWorkerFormat: function (row, column) {
      var state = row[column.property]
      if (state === 0) {
        return '空闲'
      } else if (state === 1) {
        return '维修中'
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.eclass
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
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
    // 提交更改
    submitForm(formName) {
      this.$refs.subForm.validate(validate => {
        if (!validate) {
          return this.$message.error('请检查输入格式')
        }
        this.$http
          .post('admin/equipment', {
            ename: this.subForm.ename,
            eclass: this.subForm.eclass,
            egrade: this.subForm.egrade,
            eweightGrade: this.subForm.eweightGrade,
            usingUnit: this.subForm.usingUnit,
            address: this.subForm.address,
            etype: this.subForm.etype,
            eworkerId: this.subForm.eworkerId,
            url: this.subForm.url
          })
          .then(response => {
            this.$message.success('添加成功！')
            // 添加成功后要生成 二维码
            this.crateQrcode(response.data.data)
          })
          .catch(() => {
            return this.$message.error('添加失败')
          })
      })
    },
    crateQrcode(str) {
      this.qrText = str + ''
      this.qrVisible = true
    },
    // 清空表单
    resetForm(formName) {
      this.$refs.subForm.resetFields()
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
