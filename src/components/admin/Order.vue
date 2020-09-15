<template>
  <div>
    <div class='OrderBox'>
      <el-table
        :data='orders.slice((currentPage-1)*pagesize,currentPage*pagesize)'
        style='width: 100%'
        :default-sort='{prop: "state", order: "ascending"}'
        @row-click='getorderId'
        @cell-mouse-enter='getorderId'
        :row-class-name='tableRowClassName'
        v-loading='loading'
        element-loading-text='拼命加载中'
        element-loading-spinner='el-icon-loading'
        element-loading-background='rgba(0, 0, 0, 0.8)'
      >
        <!-- 大表格内容 -->
        <el-table-column prop='fixTableId' label='单号' width='180' sortable></el-table-column>
        <el-table-column prop='studentId' label='学生号' width='180'></el-table-column>
        <el-table-column prop='address' label='地址'></el-table-column>
        <el-table-column prop='createdTime' label='创建时间' sortable :formatter='dateFormat'></el-table-column>
        <el-table-column prop='faultClass' label='报修类型'></el-table-column>
        <el-table-column prop='contacts' label='联系人'></el-table-column>
        <el-table-column prop='phone' label='电话'></el-table-column>
        <el-table-column prop='state' label='状态' sortable :formatter='statusFormat'></el-table-column>
        <el-table-column label='操作'>
          <!-- 按钮 -->
          <template slot-scope='scope'>
            <el-button
              type='text'
              @click='questDetails0 = true ; getDetails0(scope.row)'
              v-if='scope.row.state === 0'
            >点击查看保修详情</el-button>
            <el-button
              type='primary'
              @click='selectWorker = true ; getWorker() ; getorderId(scope.row)'
              v-if='scope.row.state === 0'
            >选择工人</el-button>
            <el-button
              type='text'
              @click='questDetails1 = true ; getDetails1(scope.row)'
              v-if='scope.row.state === 1'
            >点击查看保修详情</el-button>
            <el-button
              type='text'
              @click='questDetails2 = true ; getDetails2(scope.row)'
              v-if='scope.row.state === 2'
            >点击查看保修详情</el-button>
            <el-button
              type='primary'
              @click='getOrderDetails(scope.row.fixTableId) ; seeDetails = true ; getorderId(scope.row) ; sentValue(scope.row) '
              v-if='scope.row.state === 2'
            >查看详情</el-button>
            <el-button
              @click.native.prevent='
                            removeOrder(scope.$index, orders)'
              v-if='scope.row.state != 2'
              type='text'
              size='small'
            >移除</el-button>
            <!-- 弹窗内容 -->
            <div>
              <!-- 待处理 -->
              <el-dialog
                title='问题描述'
                :visible.sync='questDetails0'
                width='70%'
                :append-to-body='true'
              >
                <span>{{Details0}}</span>
                <span slot='footer' class='dialog-footer'>
                  <el-button @click='questDetails0 = false'>取 消</el-button>
                  <el-button type='primary' @click='questDetails0 = false'>确 定</el-button>
                </span>
              </el-dialog>
              <!-- 选择工人 -->
              <el-dialog
                title='问题描述'
                :visible.sync='selectWorker'
                width='70%'
                :append-to-body='true'
              >
                <span>
                  <el-table
                    ref='singleTable'
                    :data='workerData'
                    style='width: 100%'
                    @row-click='getworkerId'
                    max-height='250'
                    @cell-mouse-enter='getworkerId'
                  >
                    <el-table-column property='gender' label='性别' width='50'></el-table-column>
                    <el-table-column property='id' label='工号' width='120'></el-table-column>
                    <el-table-column property='name' label='姓名' width='120'></el-table-column>
                    <el-table-column property='phone' label='电话'></el-table-column>
                    <el-table-column fixed='right' label='操作' width='120'>
                      <template>
                        <el-button @click='commitWorker()' type='text' size='small'>选择</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </span>
                <span slot='footer' class='dialog-footer'>
                  <el-button @click='selectWorker = false'>取 消</el-button>
                  <!-- <el-button type='primary' @click='selectWorker = false'>确 定</el-button> -->
                </span>
              </el-dialog>
              <!-- 进行中 -->
              <el-dialog
                title='问题描述'
                :visible.sync='questDetails1'
                width='70%'
                :append-to-body='true'
              >
                <span>{{Details1}}</span>
                <span slot='footer' class='dialog-footer'>
                  <el-button @click='questDetails1 = false'>取 消</el-button>
                  <el-button type='primary' @click='questDetails1 = false'>确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title='问题描述'
                :visible.sync='changeWorker'
                width='70%'
                :append-to-body='true'
              >
                <span></span>
                <span slot='footer' class='dialog-footer'>
                  <el-button @click='changeWorker = false'>取 消</el-button>
                  <el-button type='primary' @click='changeWorker = false'>确 定</el-button>
                </span>
              </el-dialog>
              <!-- 已完成 -->
              <el-dialog
                title='问题描述'
                :visible.sync='questDetails2'
                width='70%'
                :append-to-body='true'
              >
                <span>{{Details2}}</span>
                <span slot='footer' class='dialog-footer'>
                  <el-button @click='questDetails2 = false'>取 消</el-button>
                  <el-button type='primary' @click='questDetails2 = false'>确 定</el-button>
                </span>
              </el-dialog>
              <!-- 查看详情 -->
              <el-dialog title='问题描述' :visible.sync='seeDetails' width='70%' :append-to-body='true'>
                <span>
                  单号{{orderDertails.fixTableId}}
                  <br />
                  学生号{{orderDertails.studentId}}
                  <br />
                  联系人{{orderDertails.contacts}}
                  <br />
                  地址{{orderDertails.address}}
                  <br />
                  创建时间{{orderDertails.createdTime}}
                  <br />
                  完成时间{{orderDertails.endTime}}
                  <br />
                  电话{{orderDertails.phone}}
                  <br />
                  报修类型{{orderDertails.faultClass}}
                  <br />
                  报修描述{{orderDertails.faultDetail}}
                  <br />
                  工人工号{{orderDertails.workId}}
                  <br />
                  处理结果{{orderDertails.resultDetails}}
                  <br />
                  消息{{orderDertails.message}}
                  <br />
                  <!-- 评分 -->
                  <el-rate
                    v-model='value'
                    disabled
                    show-score
                    text-color='#ff9900'
                    score-template='{value}'
                  ></el-rate>
                </span>
                <span slot='footer' class='dialog-footer'>
                  <el-button @click='seeDetails = false'>取 消</el-button>
                  <el-button type='primary' @click='seeDetails = false'>确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button type='primary' icon='el-icon-search' @click='getOrder' class='btn'>刷新订单</el-button>
      <!-- 大表格分页 -->
      <div class='block'>
        <el-pagination @current-change='current_change' layout='prev, pager, next' :total='total'></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  created() {
    this.getOrder()
  },
  data() {
    return {
      // 评分
      value: null,
      // 问题描述
      Details0: '',
      Details1: '',
      Details2: '',
      // 分页数据
      total: 0,
      pagesize: 10,
      currentPage: 1,
      // 订单列表
      orders: [],
      // 某个订单的id
      fixTableId: '0',
      activeName: '1',
      // 工人列表
      workerData: [],
      // 某个工人的ID
      workerId: '0',
      // 左侧按钮
      questDetails0: false,
      questDetails1: false,
      questDetails2: false,
      // 右侧按钮
      selectWorker: false,
      changeWorker: false,
      seeDetails: false,
      // 订单详情
      orderDertails: {},
      loading: true
    }
  },
  methods: {
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
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
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
    // 保存评分到model层
    sentValue(row) {
      this.value = row.grade / 2
    },
    // 获取问题描述的3个方法
    getDetails0(row) {
      this.Details0 = row.faultDetail
    },
    getDetails1(row) {
      this.Details1 = row.faultDetail
    },
    getDetails2(row) {
      this.Details2 = row.faultDetail
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    // 获取订单 ID 函数
    getorderId(row) {
      this.fixTableId = row.fixTableId
      // console.log('单号' + this.fixTableId)
    },
    // 获取工人ID函数
    getworkerId(row) {
      this.workerId = row.id
      // console.log('工号' + this.workerId)
    },
    // 取消订单
    removeOrder(index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          const that = this
          async function seeWorker() {
            await that.$http
              .delete('admin/order', {
                params: {
                  fixTableId: that.fixTableId
                }
              })
              .then(response => {
                if (response.data.code === 204) {
                  return that.$message.error('删除订单失败')
                }
                that.$message.success('删除订单成功')
              })
          }
          seeWorker()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 界面内移除订单函数
    deleteRow(index, rows) {},
    // 拉取订单
    getOrder() {
      const that = this
      async function getOrder() {
        await that.$http
          .get('admin/order-list')
          .then(response => {
            that.orders = response.data.data
            that.total = response.data.data.length
            that.loading = false
            that.$message.success('拉取订单成功')
            var byState = response.data.data.slice(0)
            byState.sort(function (a, b) {
              return a.state - b.state
            })
            that.orders = byState
            that.total = byState.length
          })
          .catch(() => {
            return that.$message.error('拉取失败')
          })
      }
      getOrder()
    },
    // 获取订单详情
    getOrderDetails(row) {
      const that = this
      async function getOrderDetails() {
        await that.$http
          .get('admin/order', {
            params: {
              fixTableId: that.fixTableId
            }
          })
          .then(response => {
            that.$message.success('拉取订单详情成功')
            // 开始时间
            var date = new Date(response.data.data.createdTime)
            var year = date.getFullYear() + '-'
            var month =
              (date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1) + '-'
            var dates = date.getDate() + ' '
            var hour = date.getHours() + ':'
            var min = date.getMinutes() + ':'
            var second = date.getSeconds()
            // 结束时间
            var Edate = new Date(response.data.data.endTime)
            var Eyear = Edate.getFullYear() + '-'
            var Emonth =
              (Edate.getMonth() + 1 < 10
                ? '0' + (Edate.getMonth() + 1)
                : Edate.getMonth() + 1) + '-'
            var Edates = Edate.getDate() + ' '
            var Ehour = Edate.getHours() + ':'
            var Emin = Edate.getMinutes() + ':'
            var Esecond = Edate.getSeconds()
            that.orderDertails = response.data.data
            that.orderDertails.createdTime =
              year + month + dates + hour + min + second
            that.orderDertails.endTime =
              Eyear + Emonth + Edates + Ehour + Emin + Esecond
          })
          .catch(() => {
            return that.$message.error('请再点一次哦')
          })
      }
      getOrderDetails()
    },
    // 获取工人列表
    getWorker() {
      const that = this
      async function seeWorker() {
        await that.$http
          .get('admin/select-worker')
          .then(response => {
            that.$message.success('拉取工人成功')
            that.workerData = response.data.data
          })
          .catch(() => {
            return that.$message.error('拉取工人失败')
          })
      }
      seeWorker()
    },
    // 选择工人
    commitWorker() {
      const that = this
      async function seeWorker() {
        await that.$http
          .patch('admin/select-worker', {
            workId: that.workerId,
            fixTableId: that.fixTableId
          })
          .then(response => {
            that.$message.success('选择工人成功')
            location.reload()
          })
          .catch(() => {
            return that.$message.error('没选择到工人噢')
          })
      }
      seeWorker()
    },
    // 拉取订单函数
    handleCurrentChange() {
      const that = this
      async function getOrder() {
        await that.$http
          .get('admin/order-list')
          .then(response => {
            that.$message.success('拉取订单成功')
            that.orders = response.data.data
          })
          .catch(() => {
            return that.$message.error('拉取失败')
          })
      }
      getOrder()
    }
  }
}
</script>

<style scoped>
#p {
  margin-top: 0;
}
.btn {
  display: block;
  margin: 0 auto;
  float: left;
}
</style>
