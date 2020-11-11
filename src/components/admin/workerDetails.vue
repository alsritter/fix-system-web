<template>
  <div>
    <!-- 工人详情 -->
    <el-dialog
      title="工人详情"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      width="1100px"
      append-to-body
    >
      <el-row :gutter="20">
        <el-col :span="5">
          <el-image
            :src="getImgUrl()"
            style="width: 200px; height: 250px"
            class="headerImg"
            align="middle"
          ></el-image>
        </el-col>
        <el-col :span="5">
          <el-card shadow="never">
            <div class="orderItem">
              <span>工号：</span>
              <span>{{ workerForm.workId }}</span>
            </div>
          </el-card>
          <br />
          <el-card shadow="never">
            <div class="orderItem">
              <span>名字：</span>
              <span>{{ workerForm.name }}</span>
            </div>
          </el-card>
        </el-col>
        <!-- 换行 -->
        <el-col :span="7">
          <el-card shadow="never">
            <div class="orderItem">
              <span>电话：</span>
              <span>{{ workerForm.phone }}</span>
            </div>
          </el-card>
          <br />

          <el-card shadow="never">
            <div class="orderItem2">
              <span>Email：</span>
              <span>{{ workerForm.email ? workerForm.email : '未填写' }}</span>
            </div>
          </el-card>
          <br />
          <el-card shadow="never">
            <div class="orderItem2">
              <span>身份证号：</span>
              <span>{{
                workerForm.idnumber ? workerForm.idnumber : '未填写'
              }}</span>
            </div>
          </el-card>
        </el-col>
        <!-- 换行 -->
        <el-col :span="6">
          <el-card shadow="never">
            <div class="orderItem">
              <span>所属部门：</span>
              <span>{{
                workerForm.department ? workerForm.department : '未填写'
              }}</span>
            </div>
          </el-card>
          <br />
          <el-card shadow="never">
            <div class="orderItem2">
              <span>职位：</span>
              <span>{{
                workerForm.ground ? workerForm.ground : '未填写'
              }}</span>
            </div>
          </el-card>
          <br />
          <el-card shadow="never">
            <div class="orderItem">
              <span>性别：</span>
              <span>{{ workerForm.gender }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="details">
        <div class="showregion" @click="showregionAddress = !showregionAddress">
          <span class="showstyle">{{
            showregionAddress ? '收起地址详情' : '展开地址详情'
          }}</span>
        </div>

        <div v-show="showregionAddress" class="detailsText">
          {{ workerForm.address ? workerForm.address : '未填写' }}
        </div>
      </div>
      <div class="details">
        <div class="showregion" @click="showmore = !showmore">
          <span class="showstyle">{{
            showmore ? '收起个人描述' : '展开个人描述'
          }}</span>
        </div>

        <div v-show="showmore" class="detailsText">
          {{ workerForm.details ? workerForm.details : '未填写' }}
        </div>
      </div>

      <table class="Info_data">
        <tr>
          <td>
            <el-card shadow="never" style="width: 100%">
              <v-chart :options="pie" style="width: 100%; height: 300px" />
            </el-card>
          </td>
          <td rowspan="3" style="width: 50%; height: 100%">
            <el-card class="box-card" shadow="never" style="height: 420px">
              <div class="orderItem">
                <span>本月订单详情</span>
                <el-table :data="workerForm.thisMonth" border>
                  <el-table-column
                    prop="date"
                    label="日期"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column label="评分" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <el-rate v-model="scope.row.grade" disabled></el-rate>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </td>
        </tr>
        <tr>
          <td>
            <el-card
              class="orderItem avgGrade"
              style="width: 100%"
              shadow="never"
            >
              <span>平均评分</span>
              <el-rate
                v-model="workerForm.avgGrade"
                show-text
                disabled
                text-color="#ff9900"
              ></el-rate>
            </el-card>
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts'
export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      visible: this.show,
      pie: {},
      // 弹窗数据
      workerForm: {},
      nice: 0,
      general: 0,
      bad: 0,
      showregionAddress: true,
      showmore: true
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    workerInfo: {
      type: Object
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
    workerInfo() {
      this.workerForm = this.workerInfo
      this.drawPie()
    }
  },
  methods: {
    getImgUrl() {
      if (this.workerForm.url) {
        return this.workerForm.url
      }
      return require('@/assets/img/workimg.jpg')
    },
    drawPie() {
      // 遍历下数组查看各种状态的数量
      for (const i of this.workerForm.thisMonth) {
        if (i.grade > 4.2) {
          this.nice++
        } else if (i.grade > 3) {
          this.general++
        } else {
          this.bad++
        }
      }

      this.pie = {
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
          text: '历史评分',
          left: 'left',
          textStyle: {
            color: '#ccc'
          }
        },
        legend: {
          left: '0',
          bottom: 0,
          data: ['失望', '一般', '满意']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '评分',
            type: 'pie',
            radius: ['20%', '70%'],
            avoidLabelOverlap: false,
            label: {
              position: 'inner'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: this.bad, name: '失望' },
              { value: this.general, name: '一般' },
              { value: this.nice, name: '满意' }
            ]
          }
        ]
      }
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
  .showregion:hover {
    cursor: pointer;
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

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
