<template>
  <div class="user-box">
    <el-form :model="searchform" class="searchform">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="工号搜索">
            <el-input
              v-model="searchform.studentId"
              placeholder="请输入工号"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="学号搜索">
            <el-input
              v-model="searchform.workerId"
              placeholder="请输入学号"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="报修类型">
            <el-input
              v-model="searchform.faultClass"
              placeholder="请输入类型"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="手机号搜索" prop="phone">
            <el-input
              v-model="searchform.phone"
              placeholder="请输入手机号"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="联系人搜索">
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
    <div>
      <el-table
        class="order-list"
        :data="
          orders.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        size="small"
        style="width: 100%"
        :default-sort="{ prop: 'state', order: 'ascending' }"
        :row-class-name="tableRowClassName"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <!-- 大表格内容 -->
        <el-table-column
          prop="fixTableId"
          label="单号"
          sortable
        ></el-table-column>
        <el-table-column
          prop="studentId"
          label="学生号"
          sortable
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          sortable
          :formatter="dateFormat"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="faultClass"
          label="报修类型"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          sortable
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          sortable
          :formatter="statusFormat"
        ></el-table-column>
        <el-table-column label="操作" width="200px">
          <!-- 按钮组 -->
          <template slot-scope="scope">
            <el-button
              type="success"
              circle
              v-if="scope.row.state === 0"
              @click="getWorker(scope.row)"
            >
              选
            </el-button>
            <el-button type="info" circle @click="getOrderDetails(scope.row)"
              >详</el-button
            >
            <el-button
              v-if="scope.row.state != 2"
              type="danger"
              circle
              @click="removeOrder(scope.$index, orders)"
              >删</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 选择工人 -->
      <el-dialog
        title="选择工人（只显示尚未被分配工作的工人）"
        :visible.sync="selectWorkerVisible"
        width="70%"
        :append-to-body="true"
      >
        <el-table
          ref="singleTable"
          :data="workerData"
          style="width: 100%"
          max-height="70%"
        >
          <el-table-column
            property="id"
            label="工号"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column
            property="phone"
            label="电话"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            :formatter="statusWorkerFormat"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="commitWorker(scope.row)"
                type="primary"
                size="small"
                circle
                >选</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 查看详情 -->
      <order-details
        :show.sync="orderDetailsVisible"
        :orderInfo.sync="pageData"
      ></order-details>
      <!-- 导出按钮 -->
      <div class="toexcel">
        <el-button @click="exportExcel" type="primary">导出 Excel</el-button>
      </div>
      <!-- 大表格分页 -->
      <div class="pagination-block">
        <el-pagination
          :page-size="pagesize"
          @current-change="current_change"
          layout="prev, pager, next, total"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import moment from 'moment'
import OrderDetails from './OrderDetails'
export default {
  components: {
    OrderDetails
  },
  created() {
    this.getOrder()
    // 检测当前屏幕的缩放比
    const size = this.detectZoom()
    // console.log(size)
    if (size <= 100) {
      this.pagesize = 9
    } else if (size < 111) {
      this.pagesize = 7
    } else if (size < 126) {
      this.pagesize = 5
    } else {
      this.pagesize = 4
    }
  },
  data() {
    return {
      // 分页数据
      total: 0,
      pagesize: 0,
      currentPage: 1,
      // 订单列表
      orders: [],
      // 工人列表
      workerData: [],
      // 选择工人
      selectWorkerForm: {
        fixTableId: ''
      },
      // 窗口显示标识
      selectWorkerVisible: false,
      orderDetailsVisible: false,
      loading: true,
      searchform: {
        studentId: '',
        workerId: '',
        faultClass: '',
        phone: '',
        name: ''
      },
      // 订单详情
      pageData: {
        contacts: '',
        address: '',
        createdTime: '',
        phone: '',
        faultClass: '',
        faultDetail: '',
        workId: '',
        state: '',
        endTime: '',
        message: '',
        resultDetails: '',
        orderId: '',
        urls: []
      }
    }
  },
  methods: {
    // 导出表格所用
    exportExcel() {
      const tempArr = this.orders
      for (const item of tempArr) {
        item.createdTime = new Date(parseInt(item.createdTime))
          .toLocaleString()
          .replace(/:\d{1,2}$/, ' ')
        if (item.endTime != null) {
          item.endTime = new Date(parseInt(item.endTime))
            .toLocaleString()
            .replace(/:\d{1,2}$/, ' ')
        }
      }

      const ordersheet = XLSX.utils.json_to_sheet(tempArr)
      const newOrderbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(newOrderbook, ordersheet, '订单列表')
      XLSX.writeFile(newOrderbook, '订单列表' + '.xlsx')
    },
    cancel() {
      this.searchform = {
        studentId: '',
        workerId: '',
        faultClass: '',
        phone: '',
        name: ''
      }
      // 点击取消就刷新页面就可以了
      this.getOrder()
    },
    search() {
      if (
        this.searchform.studentId === '' &&
        this.searchform.workerId === '' &&
        this.searchform.faultClass === '' &&
        this.searchform.phone === '' &&
        this.searchform.name === ''
      ) {
        return this.$message.error('搜索不能全为空')
      }
      this.$http
        .get('admin/search-order', {
          params: {
            workerId: this.searchform.studentId,
            studentId: this.searchform.workerId,
            name: this.searchform.name,
            phone: this.searchform.phone,
            faultClass: this.searchform.faultClass
          }
        })
        .then(response => {
          this.orders = response.data.data
          this.total = response.data.data.length

          const byState = response.data.data.slice(0)
          byState.sort(function (a, b) {
            return a.state - b.state
          })
          this.orders = byState
        })
        .catch(error => {
          return this.$message.error(error.$message)
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
    // 显示订单状态颜色的函数
    tableRowClassName({ row }) {
      if (row.state === 0) {
        return 'warning-row'
      } else if (row.state === 1) {
        return 'success-row'
      } else if (row.state === 2) {
        return ''
      }
      return ''
    },
    // 表格处理时间的函数
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
    // 格式化状态
    statusFormat: function (row, column) {
      var state = row[column.property]
      if (state === 0) {
        return '待处理'
      } else if (state === 1) {
        return '进行中'
      } else if (state === 2) {
        return '已完成'
      }
    },
    // 获取问题描述的3个方法
    getDetails(row) {
      this.Details = row.faultDetail
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    // 取消订单
    removeOrder(index, orders) {
      const that = this
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          that.$http
            .delete('admin/order', {
              params: {
                fixTableId: orders[index].fixTableId
              }
            })
            .then(response => {
              that.$message.success('删除订单成功')
              setTimeout(() => {
                location.reload()
              }, 1000)
            })
            .catch(() => {
              return that.$message.error('删除订单失败')
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 拉取订单
    getOrder() {
      this.$http
        .get('admin/order-list')
        .then(response => {
          this.orders = response.data.data
          this.total = response.data.data.length
          this.loading = false

          var byState = response.data.data.slice(0)
          byState.sort(function (a, b) {
            return a.state - b.state
          })
          this.orders = byState
        })
        .catch(() => {})
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    // 获取订单详情
    getOrderDetails(row) {
      this.$http
        .get('admin/order', {
          params: {
            fixTableId: row.fixTableId
          }
        })
        .then(response => {
          this.pageData = response.data.data
          this.pageData.createdTime = this.getLocalTime(
            response.data.data.createdTime
          )
          if (this.pageData.endTime !== null) {
            this.pageData.endTime = this.getLocalTime(
              response.data.data.endTime
            )
          }

          if (this.pageData.grade !== null) {
            this.pageData.grade = this.pageData.grade / 2
          }

          if (this.pageData.faultDetail == null) {
            this.pageData.faultDetail = '未描述'
          }

          if (this.pageData.urls !== null) {
            if (this.pageData.urls.length > 3) {
              const urls = []
              // 需要先切割
              this.pageData.urls = this.pageData.urls.split(' ')
              for (const url of this.pageData.urls) {
                urls.push(this.$http.defaults.baseURL + url)
              }

              this.pageData.urls = urls
            }
          }

          if (!this.pageData.workId) {
            this.pageData.workId = '尚未处理该订单'
          }
          this.orderDetailsVisible = true
        })
        .catch(() => {
          return this.$message.error('拉取订单详情失败')
        })
    },
    // 获取工人列表
    getWorker(row) {
      this.$http
        .get('admin/select-worker')
        .then(response => {
          this.selectWorkerForm.fixTableId = row.fixTableId
          this.workerData = response.data.data
          this.selectWorkerVisible = true
        })
        .catch(() => {
          return this.$message.error('拉取工人失败')
        })
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
    // 选择工人
    commitWorker(row) {
      this.$http
        .patch('admin/select-worker', {
          workId: row.id,
          fixTableId: this.selectWorkerForm.fixTableId
        })
        .then(response => {
          this.$message.success('选择成功')
          setTimeout(() => {
            location.reload()
            this.selectWorkerVisible = false
          }, 1000)
        })
        .catch(() => {
          return this.$message.error('没选择到工人噢')
        })
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

.searchform {
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 10px;
  .head_button {
    top: 40px;
    position: relative;
  }
}

/* 订单页面的颜色 */
/deep/ .el-table .warning-row {
  background: rgb(205, 243, 201);
}
/deep/ .el-table .success-row {
  background: #d3e6f1;
}
/deep/ .el-table tbody tr:hover > td {
  background-color: #0000 !important;
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

/deep/ .el-dialog {
  border-radius: 10px;
}
</style>
