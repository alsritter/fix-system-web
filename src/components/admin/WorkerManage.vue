<template>
  <div>
    <p id='p'>工人管理</p>
    <el-table
      :data='workers.slice((currentPage-1)*pagesize,currentPage*pagesize)'
      style='width: 100%'
      :default-sort='{prop: "state", order: "descending"}'
      stripe
      @cell-mouse-enter='getWorkerId'
    >
      <el-table-column prop='workId' label='工号' width='180' sortable></el-table-column>
      <el-table-column prop='name' label='姓名' width='180'></el-table-column>
      <el-table-column prop='gender' label='性别'></el-table-column>
      <el-table-column prop='phone' label='电话'></el-table-column>
      <el-table-column prop='joinDate' label='入职时间' :formatter='dateFormat'></el-table-column>
      <el-table-column prop='orderNumber' label='完成单数'></el-table-column>
      <el-table-column prop='details' label='介绍'></el-table-column>
      <el-table-column prop='avgGrade' label='平均打分'></el-table-column>
      <el-table-column prop='state' label='状态' sortable :formatter='statusFormat'></el-table-column>
      <el-table-column prop='state' label='操作'>
        <el-button @click='getWorkerDetails() ; dialogVisible = true'>查看详情</el-button>
        <el-dialog title='提示' :visible.sync='dialogVisible' width='30%'>
          <span>
            {{WorkerDetails.name}}
            已完成单数： {{WorkerDetails.ordersNumber}}
            今日完成单数： {{WorkerDetails.ordersNumberToday}}
            <el-rate
              v-model='AVGrate'
              disabled
              show-score
              text-color='#ff9900'
              score-template='{value}'
            ></el-rate>
            <!-- 本月评分数组 -->

            <el-table :data='thisMonth' style='width: 100%'>
              <el-table-column prop='date' label='日期' width='180'></el-table-column>
              <el-table-column prop='grade' label='评分' width='180'>
                <template slot-scope='scope'>
                  <el-rate
                    v-model='scope.row.grade'
                    disabled
                    show-score
                    text-color='#ff9900'
                    score-template='{value}'
                  ></el-rate>
                </template>
              </el-table-column>
            </el-table>

            <!-- 本月 -->
          </span>
          <span slot='footer' class='dialog-footer'>
            <el-button @click='dialogVisible = false'>取 消</el-button>
            <el-button type='primary' @click=' dialogVisible = false'>确 定</el-button>
          </span>
        </el-dialog>
      </el-table-column>
    </el-table>
    <div class='block'>
      <el-pagination @current-change='current_change' layout='prev, pager, next' :total='total'></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  created() {
    this.getWorker()
  },
  data: function () {
    return {
      workers: [],
      // 分页数据
      total: 0,
      pagesize: 10,
      currentPage: 1,
      workerId: '',
      WorkerDetails: [],
      dialogVisible: false,
      num: 70,
      AVGrate: null,
      thisMonth: [],
      type: []
    }
  },
  methods: {
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
        return '空闲'
      } else if (state === 1) {
        return '被安排了'
      }
    },
    // 拉取工人列表
    getWorker() {
      const that = this
      async function getOrder() {
        await that.$http.get('admin/worker-list').then(response => {
          if (response.data.code !== 200) {
            return that.$message.error('拉取工人列表失败')
          }
          that.$message.success('拉取工人列表成功')
          var byState = response.data.data.slice(0)
          byState.sort(function (a, b) {
            return a.state - b.state
          })
          that.workers = byState
          that.total = response.data.data.length
        })
      }
      getOrder()
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    // 获取当前工人ID
    getWorkerId(row) {
      this.workerId = row.workId
      // console.log('工号' + this.workerId)
    },
    // 拉取工人详情
    getWorkerDetails() {
      const that = this
      async function seeWorker() {
        await that.$http
          .get('admin/worker', {
            params: {
              workId: that.workerId
            }
          })
          .then(response => {
            that.$message.success('拉取详情成功')
            that.WorkerDetails = response.data.data
            that.thisMonth = that.WorkerDetails.thisMonth
            that.type = that.WorkerDetails.type
            const thisMonthArrayLength = response.data.data.thisMonth.length
            //  挨个处理评分
            for (var j = 0; j < thisMonthArrayLength; j++) {
              that.thisMonth[j].date = new Date(
                parseInt(response.data.data.thisMonth[j].date)
              )
                .toLocaleString()
                .replace(/:\d{1,2}$/, ' ')
               that.thisMonth[j].grade = response.data.data.thisMonth[j].grade / 2
            }
            that.AVGrate = that.WorkerDetails.avgGrade / 2
          })
          .catch(error => {
            return that.$message.error(error.$message)
          })
      }
      seeWorker()
    }
  }
}
</script>

<style scoped>
#p {
  margin-top: 0;
}
</style>
