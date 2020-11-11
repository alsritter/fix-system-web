<template>
  <div class="user-box">
    <el-form
      ref="searchform"
      :model="searchform"
      :rules="rules"
      class="searchform"
      size="small"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="学号搜索">
            <el-input
              v-model="searchform.id"
              placeholder="请输入学号"
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
        <!-- <el-col :span="24"> <div class="gpurple"></div></el-col> -->
      </el-row>
    </el-form>

    <el-table
      :data="
        students.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      class="student-list"
      stripe
      style="width: 100%; padding-left: 10px; padding-right: 10px"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <el-table-column prop="id" sortable label="学号"></el-table-column>
      <el-table-column prop="gender" sortable label="男"></el-table-column>
      <el-table-column prop="phone" sortable label="电话"></el-table-column>
      <el-table-column prop="name" sortable label="姓名"></el-table-column>
    </el-table>
    <!-- 导出按钮 -->
    <div class="toexcel">
      <el-button @click="exportExcel" type="primary">导出 Excel</el-button>
    </div>
    <div class="pagination-block">
      <el-pagination
        @current-change="current_change"
        :page-size="pagesize"
        layout="prev, pager, next, total"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  created() {
    this.getStudent()
    // 检测当前屏幕的缩放比
    const size = this.detectZoom()
    // console.log(size)
    if (size <= 100) {
      this.pagesize = 11
    } else if (size < 111) {
      this.pagesize = 9
    } else if (size < 126) {
      this.pagesize = 7
    } else {
      this.pagesize = 5
    }
  },
  data() {
    return {
      // 分页数据
      total: 0,
      pagesize: 10,
      currentPage: 1,
      students: [],
      searchform: {
        id: '',
        name: '',
        phone: ''
      },
      rules: {
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
  methods: {
    // 导出表格所用
    exportExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.students)
      const newWorkbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(newWorkbook, worksheet, '学生列表')
      XLSX.writeFile(newWorkbook, '学生列表' + '.xlsx')
    },
    cancel() {
      this.searchform = {
        id: '',
        name: '',
        phone: ''
      }
      this.getStudent()
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
          .get('admin/search-student', {
            params: {
              id: that.searchform.id,
              name: that.searchform.name,
              phone: that.searchform.phone
            }
          })
          .then(response => {
            that.students = response.data.data
            that.total = that.students.length
          })
          .catch(error => {
            return that.$message.error(error.$message)
          })
      })
    },
    getStudent() {
      this.$http
        .get('admin/student-list')
        .then(response => {
          this.students = response.data.data
          this.total = this.students.length
        })
        .catch(error => {
          return this.$message.error(error.$message)
        })
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang='less' scoped>
.user-box {
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.gpurple {
  background: #dae47d;
  margin-bottom: 20px;
  border-radius: 4px;
  min-height: 36px;
}

.searchform {
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 20px;
  .head_button {
    width: 200px;
    text-align: center;
    top: 28px;
    position: relative;
  }
}

/deep/ .el-table .el-table__row--striped td {
  background: #eff1be !important;
}

/deep/ .el-table .el-table__row--striped:hover td {
  background: #edf092 !important;
}

.toexcel {
  position: fixed;
  left: 88%;
  top: 91%;
  z-index: 10;
}

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
