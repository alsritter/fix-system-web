<template>
  <div class="user-box">
    <div class="card">
      <table class="ordersNumberTable">
        <tr>
          <td>
            <el-card class="ordersNumber-card first">
              <i class="iconfont icon-dingdan"></i>
              <div class="one">总单数</div>
              <div class="two">{{ ordersInfo.ordersNumber }}</div>
            </el-card>
          </td>
          <td>
            <el-card class="ordersNumber-card">
              <i class="iconfont icon-danjuguanli"></i>
              <div class="one">未完成</div>
              <div class="two">{{ ordersInfo.ordersNumber_0 }}</div>
            </el-card>
          </td>
        </tr>
        <tr>
          <td>
            <el-card class="ordersNumber-card">
              <i class="iconfont icon-dingdanguanli"></i>
              <div class="one">进行中</div>
              <div class="two">{{ ordersInfo.ordersNumber_1 }}</div>
            </el-card>
          </td>
          <td>
            <el-card class="ordersNumber-card">
              <i class="iconfont icon-jifendingdan"></i>
              <div class="one">已完成</div>
              <div class="two">{{ ordersInfo.ordersNumber_2 }}</div>
            </el-card>
          </td>
        </tr>
      </table>

      <el-card class="pie-chart">
        <v-chart :options="orderPie" style="width: 100%; height: 300px" />
      </el-card>
      <el-card class="w-s-info">
        <v-chart :options="wsPie" style="width: 100%; height: 300px" />
      </el-card>
      <el-card class="w-info">
        <v-chart :options="waitPie" style="width: 100%; height: 300px" />
      </el-card>
    </div>

    <!--评分折线图-->
    <div>
      <el-card class="charts-card">
        <v-chart :options="gradeLine" class="line-chart" />
      </el-card>
    </div>
    <!--发布订单每月数量-->
    <div>
      <el-card class="charts-card">
        <v-chart :options="createTimeLine" class="line-chart" />
      </el-card>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts'

export default {
  components: {
    'v-chart': ECharts
  },
  name: '',
  data() {
    return {
      systemInfo: {},
      workers: [],
      chartsLine: '',
      chartsPie: '',
      grade: [],
      date: [],
      ordersInfo: [],
      monthAndYearOrders: [],
      gradeLine: {},
      createTimeLine: {},
      orderPie: {},
      wsPie: {},
      waitPie: {
        wait: 0,
        notWati: 0
      }
    }
  },
  methods: {
    created() {
      this.$http
        .get('admin/worker-list')
        .then(response => {
          const byAvgGrade = response.data.data.slice(0)
          byAvgGrade.sort(function (a, b) {
            return b.avgGrade - a.avgGrade
          })

          this.workers = byAvgGrade
          this.pagination.total = response.data.data.length
        })
        .catch(() => {
          return this.$message.error('拉取工人列表失败')
        })
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    getOrdersInfo() {
      this.$http
        .get('admin/statistics')
        .then(response => {
          this.ordersInfo = response.data.data
          // 防止数值为 0 时的塌陷，这里需要做个空值判断
          if (
            this.ordersInfo.ordersNumber === '' ||
            !this.ordersInfo.ordersNumber
          ) {
            this.ordersInfo.ordersNumber = 0
          }
          if (
            this.ordersInfo.ordersNumber_0 === '' ||
            !this.ordersInfo.ordersNumber_0
          ) {
            this.ordersInfo.ordersNumber_0 = 0
          }
          if (
            this.ordersInfo.ordersNumber_1 === '' ||
            !this.ordersInfo.ordersNumber_1
          ) {
            this.ordersInfo.ordersNumber_1 = 0
          }
          if (
            this.ordersInfo.ordersNumber_2 === '' ||
            !this.ordersInfo.ordersNumber_2
          ) {
            this.ordersInfo.ordersNumber_2 = 0
          }
          for (const item of this.ordersInfo.thisMonth) {
            item.date = this.getLocalTime(item.date)
          }
          for (var i = 0; i < this.ordersInfo.thisMonth.length; i++) {
            this.grade[i] = this.ordersInfo.thisMonth[i].grade / 2
            this.date[i] = this.ordersInfo.thisMonth[i].date
          }
          // 注意：因为插入数据到数组是异步的，所以这里要同步处理
          this.drawGradeLine()
          this.drawStatePie()
        })
        .catch(error => {
          return this.$message.error(error.$message)
        })
    },
    drawWSPie() {
      this.$http
        .get('utils/get-info')
        .then(res => {
          this.systemInfo = res.data.data
          this.wsPie = {
            title: {
              text: '学生维修工占比',
              subtext: '当前系统',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            series: [
              {
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                label: {
                  position: 'inner'
                },
                data: [
                  { value: this.systemInfo.studentCount, name: '学生数量' },
                  { value: this.systemInfo.workerCount, name: '维修工数量' }
                ]
              }
            ]
          }
        })
        .catch()
    },
    drawCreateTime() {
      this.$http
        .get('utils/get-month-year-count')
        .then(response => {
          this.monthAndYearOrders = response.data.data
          const month = []
          const year = []
          const number = []
          for (const item of this.monthAndYearOrders) {
            number.push(item.count)
            year.push(item.year)
            month.push(item.month)
          }
          this.createTimeLine = {
            title: {
              text: '2020 全年提交数量',
              left: 'center',
              top: 5,
              textStyle: {
                color: '#ccc'
              }
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              name: '月份',
              data: month,
              axisTick: {
                // 是否显示坐标轴刻度。
                inside: false // 坐标轴刻度是否朝内，默认朝外。
              },
              axisLabel: {
                formatter: '{value} 月'
              },
              boundaryGap: false // 关闭边界空一格
            },
            yAxis: {
              type: 'value',
              name: '报修订单数量'
            },
            tooltip: {
              // 鼠标移上去显示的
              trigger: 'axis', // 显示横坐标值
              formatter: '{b} 月份 <br/> 报修人数：{c}'
            },
            series: [
              {
                name: '订单数',
                data: number,
                type: 'line',
                areaStyle: {},
                smooth: true
              }
            ]
          }
        })
        .catch(() => {})
    },
    drawGradeLine() {
      this.gradeLine = {
        color: [
          '#91c7ae',
          '#749f83',
          '#ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3'
        ],
        title: {
          text: '本月订单所有评分',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'axis' // 显示横坐标值
        },
        legend: {
          data: ['本月统计']
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.date
        },
        yAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['极差', '不满意', '一般', '不错', '非常好', '完美']
        },
        series: [
          {
            name: '当前评分',
            data: this.grade,
            stack: '总量',
            type: 'line',
            areaStyle: {},
            smooth: true
          }
        ]
      }
    },
    drawWaitPie() {
      this.$http
        .get('admin/worker-list')
        .then(res => {
          const temp = res.data.data
          // waitPie
          for (const item of temp) {
            if (item.state === 0) {
              this.waitPie.wait++
            } else {
              this.waitPie.notWati++
            }
          }
          this.waitPie = {
            color: ['#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            title: {
              text: '工作状态占比',
              subtext: '当前系统',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            series: [
              {
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                label: {
                  position: 'inner'
                },
                data: [
                  { value: this.waitPie.wait, name: '空闲' },
                  { value: this.waitPie.notWati, name: '维修中' }
                ]
              }
            ]
          }
        })
        .catch()
    },
    drawStatePie() {
      this.orderPie = {
        color: [
          '#91c7ae',
          '#749f83',
          '#ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3'
        ],
        title: {
          text: '当前订单状态分布',
          left: 'right',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['未完成', '进行中', '已完成']
        },
        series: [
          {
            name: '当前状态',
            type: 'pie',
            radius: ['20%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.ordersInfo.ordersNumber_0, name: '未完成' },
              { value: this.ordersInfo.ordersNumber_1, name: '进行中' },
              { value: this.ordersInfo.ordersNumber_2, name: '已完成' }
            ]
          }
        ]
      }
    }
  },
  // 调用
  mounted() {
    this.getOrdersInfo()
    this.drawWSPie()
    this.drawWaitPie()
    this.drawCreateTime()
  }
}
</script>
<style lang='less'  scoped>
.user-box {
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card {
  width: 90%;
  position: relative;
  transform: translate(-50%, 0);
  left: 50%;

  .ordersNumberTable {
    display: inline-block;
    width: 30%;
    height: 300px;
    tr {
      width: 100%;
    }
    td {
      width: 1000px;
      height: 145px;
    }

    .ordersNumber-card {
      height: 100%;
      /deep/ .el-card__body {
        padding: 10px;
      }
      i {
        display: block;
        position: relative;
        padding-top: 15px;
        left: 50%;
        transform: translate(-10%, 0);
        font-size: 40px;
      }

      .one {
        height: 30%;
        font-weight: bold;
        color: rgb(129, 129, 129);
        text-align: center;
        width: 100%;
      }

      .two {
        text-align: center;
        font-size: 30px;
        position: relative;
        text-shadow: 2px 2px 2px rgba(56, 56, 56, 0.397);
      }
    }
  }
  .pie-chart {
    display: inline-block;
    margin-top: 10px;
    margin-left: 10px;
    height: 300px;
    width: 30%;
  }
}

.w-s-info {
  display: inline-block;
  width: 18%;
  height: 300px;
  margin-left: 10px;
}

.w-info {
  display: inline-block;
  width: 18%;
  height: 300px;
  margin-left: 10px;
}

.icon-dingdan {
  color: #c7c291;
}
.icon-danjuguanli {
  color: #91c7ae;
}

.icon-dingdanguanli {
  color: #749f83;
}

.icon-jifendingdan {
  color: #ca8622;
}

.charts-card {
  margin-top: 10px;
  width: 89%;
  position: relative;
  transform: translate(-50%, 0);
  left: 50%;
  height: 100%;
}

.line-chart {
  width: 100%;
  height: 160px;
}
</style>
