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
            <el-progress :percentage='num'></el-progress>
            <el-progress :percentage='num'></el-progress>
            <el-progress :percentage='num'></el-progress>
            {{WorkerDetails.name}}
            <el-rate
              v-model='AVGrate'
              disabled
              show-score
              text-color='#ff9900'
              score-template='{value}'
            ></el-rate>
            已完成单数： {{WorkerDetails.ordersNumber}}
            日期{{thisMonth.date}}
            评分{{thisMonth.grade}}
            完成单数{{type.number}}
            最擅长类型{{type.typeName}}
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
      console.log('工号' + this.workerId)
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
            var date = new Date(response.data.data.joinDate)
            var year = date.getFullYear() + '-'
            var month =
              (date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1) + '-'
            var dates = date.getDate() + ' '
            var hour = date.getHours() + ':'
            var min = date.getMinutes() + ':'
            var second = date.getSeconds()
            that.WorkerDetails = response.data.data
            console.log(that.WorkerDetails)
            // that.type = response.data.data.type
            // that.thisMonth = response.data.data.thisMonth
            console.log(that.thisMonth.date)
            console.log(that.thisMonth)
            that.WorkerDetails.joinDate =
              year + month + dates + hour + min + second
            that.AVGrate = that.WorkerDetails.avgGrade / 2
          })
          .catch((error) => {
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
TODO: 按需排序，点击跳转工人详情页
TODO: thisMonth: {},
      type: {} 无法接收返回的对象，表格灌输据能显示但会内部报错，而且EL表达式显示不了
      TODO:根据本月数组的长度，遍历生成进度条，且每个的数值要对应
