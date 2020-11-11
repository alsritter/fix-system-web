<template>
  <div class="user-box">
    <div class="cutTheme">
      <el-radio-group v-model="cardTheme">
        <el-radio-button :label="true">卡片</el-radio-button>
        <el-radio-button :label="false">列表</el-radio-button>
      </el-radio-group>
    </div>

    <el-form
      ref="searchform"
      :model="searchform"
      :rules="searchRules"
      class="searchform"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="工号搜索">
            <el-input
              v-model="searchform.id"
              placeholder="请输入工号"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号搜索" prop="phone">
            <el-input
              v-model="searchform.phone"
              placeholder="请输入手机号"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="名字搜索">
            <el-input
              v-model="searchform.name"
              placeholder="名字"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="head_button">
          <div>
            <el-button type="primary" @click="search()" round>搜索</el-button>
            <el-button @click="cancel()" round>取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- 工人卡片列表 -->
    <worker-card-dialog
      v-show="cardTheme"
      :workersInfo.sync="workers"
      :total.sync="pagination.total"
      @child-getWorkerDetails="getWorkerDetails"
    ></worker-card-dialog>
    <!-- 工人列表 -->
    <worker-list-dialog
      v-show="!cardTheme"
      :workersInfo.sync="workers"
      :total.sync="pagination.total"
      :pagesize.sync="pagination.pagesize"
      @child-getWorkerDetails="getWorkerDetails"
    ></worker-list-dialog>
    <!-- 工人详情 -->
    <worker-details
      :show.sync="workerDetailsVisible"
      :workerInfo.sync="workerForm"
    ></worker-details>
  </div>
</template>

<script>
import workerDetails from './workerDetails'
import workerListDialog from './workerListDialog'
import workerCardDialog from './workerCardDialog'
export default {
  components: {
    workerDetails,
    workerListDialog,
    workerCardDialog
  },
  data() {
    return {
      cardTheme: false,
      workers: [],
      // 分页数据
      pagination: {
        total: 0,
        pagesize: 10,
        currentPage: 1
      },
      workerDetailsVisible: false,
      searchform: {
        id: '',
        name: '',
        phone: ''
      },
      // 弹窗数据
      workerForm: {},
      searchRules: {
        phone: [
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: '请输入正确的格式',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getWorker()
    // 检测当前屏幕的缩放比
    const size = this.detectZoom()
    if (size <= 100) {
      this.pagination.pagesize = 8
    } else if (size < 126) {
      this.pagination.pagesize = 5
    } else {
      this.pagination.pagesize = 3
    }

    this.loading = false
  },
  methods: {
    cancel() {
      // 点击取消就重新拉取数据
      this.getWorker()
    },
    search() {
      if (
        this.searchform.id === '' &&
        this.searchform.name === '' &&
        this.searchform.phone === ''
      ) {
        return this.$message.error('搜索不能全为空')
      }
      const that = this
      this.$refs.searchform.validate(validate => {
        if (!validate) {
          return this.$message.error('输入有误！')
        }
        this.$http
          .get('admin/search-worker', {
            params: {
              id: that.searchform.id,
              name: that.searchform.name,
              phone: that.searchform.phone
            }
          })
          .then(response => {
            that.workers = response.data.data
            that.pagination.total = that.workers.length
          })
          .catch(error => {
            return that.$message.error(error.$message)
          })
      })
    },
    detectZoom() {
      let ratio = 0
      const screen = window.screen
      const ua = navigator.userAgent.toLowerCase()
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
      }
      return ratio
    },
    // 拉取工人列表
    getWorker() {
      this.$http
        .get('admin/worker-list')
        .then(response => {
          const byState = response.data.data.slice(0)
          byState.sort(function (a, b) {
            return b.state - a.state
          })

          this.workers = byState
          this.pagination.total = response.data.data.length
        })
        .catch(() => {
          return this.$message.error('拉取工人列表失败')
        })
    },
    // 拉取工人详情
    getWorkerDetails(row) {
      this.$http
        .get('admin/worker', {
          params: {
            workId: row.id
          }
        })
        .then(response => {
          this.workerForm = response.data.data
          this.workerForm.avgGrade = this.workerForm.avgGrade / 2
          for (const item of this.workerForm.thisMonth) {
            item.date = new Date(item.date).toLocaleDateString()
            item.grade = item.grade / 2
          }

          if (this.workerForm.url) {
            this.workerForm.url =
              this.$http.defaults.baseURL + this.workerForm.url
          }

          this.workerDetailsVisible = true
        })
        .catch(error => {
          return this.$message.error(error.$message)
        })
    }
  }
}
</script>

<style lang='less' scoped>
.user-box {
  width: 100%;
  height: 95%;
  background-color: white;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.searchform {
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 20px;
  .head_button {
    width: 200px;
    text-align: center;
    top: 40px;
    position: relative;
  }
}

.AVGrate /deep/ .el-rate__icon {
  font-size: 35px;
}

// 平均分的星星比较大
.avgGrade .el-rate /deep/ .el-rate__icon {
  font-size: 35px;
}

.details {
  .showregion {
    margin-top: 10px;
    margin-bottom: 5px;
    color: rgb(129, 129, 129);
    font-size: 5px;
  }
  .detailsText {
    background-color: #f2f2f2;
    padding: 10px;
    margin-bottom: 10px;
  }
}

.Info_data {
  width: 100%;
}

.cutTheme {
  position: fixed;
  top: 16%;
  left: 89%;
  z-index: 10;

  /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #c1d730;
    border-color: #c1d730;
    box-shadow: -1px 0 0 0#c1d730;
  }

  /deep/.el-radio-button__inner:hover {
    color: #c1d730;
  }
}
</style>
