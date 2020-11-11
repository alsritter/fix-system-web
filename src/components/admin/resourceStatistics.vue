<template>
  <div class="user-box">
    <div class="card">
      <el-row :gutter="20">
        <!-- Tool 数量比 -->
        <el-col :span="8">
          <el-card>
            <v-chart
              :options="pie.toolNumberRatio"
              style="width: 100%; height: 300px"
            />
          </el-card>
        </el-col>
        <!-- Tool 总价比 -->
        <el-col :span="6">
          <el-card>
            <v-chart
              :options="pie.toolSumPriceRatio"
              style="width: 100%; height: 300px"
            />
          </el-card>
        </el-col>
        <!-- Tool 单价比 -->
        <el-col :span="6">
          <el-card>
            <v-chart
              :options="pie.toolPriceRatio"
              style="width: 100%; height: 300px"
            /> </el-card
        ></el-col>
        <!-- equipment 状态比 -->
        <el-col :span="4">
          <el-card>
            <v-chart
              :options="pie.equipmentStateRatio"
              style="width: 100%; height: 300px"
            /> </el-card
        ></el-col>
      </el-row>

      <el-row :gutter="20">
        <!-- equipment 等级比 -->
        <el-col :span="4">
          <el-card>
            <v-chart
              :options="pie.equipmentGradeRatio"
              style="width: 100%; height: 300px"
            /> </el-card
        ></el-col>
        <!-- equipment 类型比 -->
        <el-col :span="4">
          <el-card>
            <v-chart
              :options="pie.equipmentClassRatio"
              style="width: 100%; height: 300px"
            />
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col>
              <el-card class="number-card first">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="耗材总数"
                  placement="top"
                >
                  <div>
                    <div><i class="el-icon-s-tools"></i></div>
                    <!-- <div class="one">耗材总单数</div> -->
                    <div class="two">{{ tool.toolNumber }}</div>
                  </div>
                </el-tooltip>
              </el-card>
            </el-col>
            <el-col>
              <el-card class="number-card">
                <!-- <div class="one">耗材总价</div> -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="耗材总价"
                  placement="top"
                >
                  <div>
                    <div><i class="iconfont icon-qianmoney125"></i></div>
                    <div class="two">{{ tool.allToolPrice }}</div>
                  </div>
                </el-tooltip>
              </el-card>
            </el-col>
            <el-col>
              <el-card class="number-card">
                <!-- <div class="one">设备总数量</div> -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="设备总数量"
                  placement="top"
                >
                  <div>
                    <div><i class="iconfont icon-lianhe5"></i></div>
                    <div class="two">{{ equipment.equipmentNumber }}</div>
                  </div>
                </el-tooltip>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <!--月更新折线图-->
          <el-card class="line-card">
            <v-chart
              :options="gradeLine"
              class="line-chart"
              style="width: 100%; height: 300px"
            />
          </el-card>
        </el-col>
      </el-row>
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
  // 调用
  mounted() {
    this.getOrdersInfo()
    this.getData()
  },
  created() {},
  data() {
    return {
      grade: [],
      date: [],
      ordersInfo: [],
      gradeLine: {},
      pie: {
        toolNumberRatio: {},
        toolSumPriceRatio: {},
        toolPriceRatio: {},
        equipmentStateRatio: {},
        equipmentGradeRatio: {},
        equipmentClassRatio: {}
      },
      tool: {
        toolNumber: 0,
        allToolPrice: 0.0,
        toolSumPriceRatio: [],
        toolNumberRatio: [],
        toolPriceRatio: []
      },
      equipment: {
        equipmentNumber: 0,
        equipmentStateRatio: {},
        equipmentGradeRatio: [],
        equipmentClassRatio: []
      }
    }
  },
  methods: {
    getData() {
      // 取得耗材数量
      this.$http
        .get('utils/get-tool-number')
        .then(response => {
          this.tool.toolNumber = response.data.data
        })
        .catch(() => {})
      // 取得耗材总价
      this.$http
        .get('utils/get-all-tool-sum-price')
        .then(response => {
          this.tool.allToolPrice = response.data.data
        })
        .catch(() => {})
      // 取得设备数量
      this.$http
        .get('utils/get-equipment-number')
        .then(response => {
          this.equipment.equipmentNumber = response.data.data
        })
        .catch(() => {})
      // 取得设备耗材数量比
      this.$http
        .get('utils/get-tool-number-ratio')
        .then(response => {
          this.tool.toolNumberRatio = response.data.data
          this.drawToolNumberRatio()
        })
        .catch(() => {})
      // 取得单耗材价格比例
      this.$http
        .get('utils/get-tool-price-ratio')
        .then(response => {
          this.tool.toolPriceRatio = response.data.data
          this.drawToolPriceRatio()
        })
        .catch(() => {})
      // 取得单耗材总价比例
      this.$http
        .get('utils/get-tool-sumprice-ratio')
        .then(response => {
          this.tool.toolSumPriceRatio = response.data.data
          this.drawToolSumPriceRatio()
        })
        .catch(() => {})
      // 取得设备状态比例
      this.$http
        .get('utils/get-equipment-state-ratio')
        .then(response => {
          this.equipment.equipmentStateRatio = response.data.data
          this.drawEquipmentStateRatio()
        })
        .catch(() => {})
      // 取得设备等级比例
      this.$http
        .get('utils/get-equipment-grade-ratio')
        .then(response => {
          this.equipment.equipmentGradeRatio = response.data.data
          this.drawEquipmentGradeRatio()
        })
        .catch(() => {})
      // 取得设备类型比例
      this.$http
        .get('utils/get-equipment-class-ratio')
        .then(response => {
          this.equipment.equipmentClassRatio = response.data.data
          this.equipmentClassRatio()
        })
        .catch(() => {})
    },
    drawToolNumberRatio() {
      const temp = []
      for (const i of this.tool.toolNumberRatio) {
        temp.push({ value: i.count, name: i.name })
      }
      this.pie.toolNumberRatio = {
        title: {
          text: '耗材数量占比',
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
            radius: '70%',
            center: ['50%', '50%'],
            label: {
              show: true
            },
            data: temp
          }
        ]
      }
    },
    drawToolSumPriceRatio() {
      const temp = []
      for (const i of this.tool.toolSumPriceRatio) {
        temp.push({ value: i.sum, name: i.name })
      }
      this.pie.toolSumPriceRatio = {
        title: {
          text: '耗材总价比',
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
            radius: '70%',
            center: ['50%', '50%'],
            label: {
              show: true
            },
            data: temp
          }
        ]
      }
    },
    drawToolPriceRatio() {
      const temp = []
      for (const i of this.tool.toolPriceRatio) {
        temp.push({ value: i.price, name: i.name })
      }
      this.pie.toolPriceRatio = {
        title: {
          text: '耗材单价比',
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
            radius: '70%',
            center: ['50%', '50%'],
            label: {
              show: true
            },
            data: temp
          }
        ]
      }
    },
    drawEquipmentStateRatio() {
      console.log(this.equipment.equipmentStateRatio)
      const temp = []
      for (const i of this.equipment.equipmentStateRatio) {
        temp.push({ value: i.count, name: i.state === 0 ? '正常' : '维修' })
      }
      this.pie.equipmentStateRatio = {
        title: {
          text: '设备状态比',
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
            radius: '70%',
            center: ['50%', '50%'],
            label: {
              show: false
            },
            data: temp
          }
        ]
      }
    },
    drawEquipmentGradeRatio() {
      const temp = []
      for (const i of this.equipment.equipmentGradeRatio) {
        if (i.egrade === 1) {
          i.egrade = 'E 类'
        } else if (i.egrade === 2) {
          i.egrade = 'D 类'
        } else if (i.egrade === 3) {
          i.egrade = 'C 类'
        } else if (i.egrade === 4) {
          i.egrade = 'B 类'
        } else {
          i.egrade = 'A 类'
        }
        temp.push({ value: i.count, name: i.egrade })
      }
      this.pie.equipmentGradeRatio = {
        title: {
          text: '设备等级分布',
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
            radius: '70%',
            center: ['50%', '50%'],
            label: {
              show: false
            },
            data: temp
          }
        ]
      }
    },
    equipmentClassRatio() {
      const temp = []
      for (const i of this.equipment.equipmentClassRatio) {
        temp.push({ value: i.count, name: i.eclass })
      }
      this.pie.equipmentClassRatio = {
        title: {
          text: '设备分类',
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
            radius: '70%',
            center: ['50%', '50%'],
            label: {
              show: false
            },
            data: temp
          }
        ]
      }
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    getOrdersInfo() {
      this.$http
        .get('admin/statistics')
        .then(response => {
          this.ordersInfo = response.data.data
          for (const item of this.ordersInfo.thisMonth) {
            item.date = this.getLocalTime(item.date)
          }
          for (var i = 0; i < this.ordersInfo.thisMonth.length; i++) {
            this.grade[i] = this.ordersInfo.thisMonth[i].grade / 2
            this.date[i] = this.ordersInfo.thisMonth[i].date
          }
          // 注意：因为插入数据到数组是异步的，所以这里要同步处理
          this.drawGradeLine()
        })
        .catch(error => {
          return this.$message.error(error.$message)
        })
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
          text: '本月设备报修结果',
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
    }
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
  width: 99%;
  position: relative;
  padding: 10px;
}

.line-card {
  margin-top: 10px;
}

.line-chart {
  width: 100%;
  height: 300px;
}

.number-card {
  margin-top: 10px;
  width: 100%;
  height: 100px;
  text-align: center;
  i {
    font-size: 40px;
    margin-left: 10%;
    margin-right: 30px;
  }

  .el-icon-s-tools {
    font-size: 50px;
    transform: translate(5%, 0);
  }

  .two {
    font-size: 25px;
  }
}
</style>
