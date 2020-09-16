<template>
  <div class='student_orderHistoryList'>
    <el-col v-for='(item, index) in orderHistoryList' :key='index'>
      <el-card>
        <p class='endTime'>{{item.createdTime}}</p>
        <span class='faultClass'>{{item.faultClass}}</span>
        <el-rate
          v-model='item.grade'
          disabled
          show-text
          text-color='#ff9900'
          :allow-half='true'
          v-if='item.message != null'
        ></el-rate>
        <span class='notMessage' v-if='item.message == null'>未评价</span>
        <el-button
          type='text'
          class='showDetails'
          @click='orderPass(item)'
          v-if='item.message != null'
        >点击查看详情</el-button>
        <el-button
          type='text'
          class='showDetails'
          @click='sendMessage(item)'
          v-if='item.message == null'
        >点击评价</el-button>
      </el-card>
    </el-col>

    <el-dialog title='订单详情' :visible.sync='dialogVisible' width='80%'>
      <div class='orderItem orderId'>
        <span>订单编号：{{dialogData.orderId}}</span>
      </div>
      <div class='orderItem'>
        <span>报修类型</span>
        <span>{{dialogData.faultClass}}</span>
      </div>
      <div class='orderItem'>
        <span>详细地址</span>
        <span>{{dialogData.address}}</span>
      </div>
      <div class='orderItem'>
        <span>联系人</span>
        <span>{{dialogData.contacts}}</span>
      </div>
      <div class='orderItem'>
        <span>报修时间</span>
        <span>{{dialogData.createdTime}}</span>
      </div>
      <div class='orderItem'>
        <span>解决时间</span>
        <span>{{dialogData.endTime}}</span>
      </div>
      <div class='orderItem'>
        <span>维修师傅工号</span>
        <span>{{dialogData.workId}}</span>
      </div>
      <div class='orderItem'>
        <span>详情</span>
        <span class='orderDetailsText'>{{dialogData.faultDetail}}</span>
      </div>
      <div class='orderItem'>
        <span>工人评价</span>
        <span class='orderDetailsText'>{{dialogData.resultDetails}}</span>
      </div>
      <div class='orderItem'>
        <span>学生评价</span>
        <span class='orderDetailsText'>{{dialogData.message}}</span>
      </div>
    </el-dialog>

    <el-dialog title='评价订单' class='endOrder' :visible.sync='dialogVisible02' width='80%'>
      <div class='orderItem orderId'>
        <span>订单编号：{{dialogData.orderId}}</span>
      </div>
      <div class='orderItem'>
        <span>报修类型</span>
        <span>{{dialogData.faultClass}}</span>
      </div>
      <div class='orderItem'>
        <span>详细地址</span>
        <span>{{dialogData.address}}</span>
      </div>
      <div class='orderItem'>
        <span>联系人</span>
        <span>{{dialogData.contacts}}</span>
      </div>
      <div class='orderItem'>
        <span>报修时间</span>
        <span>{{dialogData.createdTime}}</span>
      </div>
      <div class='orderItem'>
        <span>解决时间</span>
        <span>{{dialogData.endTime}}</span>
      </div>
      <div class='orderItem'>
        <span>维修师傅工号</span>
        <span>{{dialogData.workId}}</span>
      </div>
      <div class='orderItem'>
        <span>详情</span>
        <span class='orderDetailsText'>{{dialogData.faultDetail}}</span>
      </div>
      <div class='orderItem'>
        <span>工人评价</span>
        <span class='orderDetailsText'>{{dialogData.resultDetails}}</span>
      </div>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible02 = false'>取 消</el-button>
        <el-button type='primary' @click='innerVisible = true'>评价订单</el-button>
      </div>
      <el-dialog
        width='90%'
        title='评价订单'
        class='innerEndOrder'
        :visible.sync='innerVisible'
        append-to-body
      >
        <div class='sendBox'>
          <span class='my_title'>当前维修服务评分：</span>
          <el-rate v-model='endOrderFrom.orderRate' show-text></el-rate>
          <span class='my_title'>当前订单评价：</span>
          <el-input
            type='textarea'
            v-model='endOrderFrom.message'
            :rows='13'
            :maxlength='450'
            placeholder='订单评价'
          ></el-input>
          <el-button type='primary' @click='submit()' round>提交</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  created() {
    this.getData()
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible02: false,
      innerVisible: false,
      orderHistoryList: [],
      dialogData: {
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
        orderId: ''
      },
      endOrderFrom: {
        fixTableId: 0,
        orderRate: 5,
        message: ''
      }
    }
  },
  methods: {
    loadData(item) {
      this.endOrderFrom.fixTableId = item.fixTableId
      this.endOrderFrom.orderRate = 5
      this.endOrderFrom.message = ''
      this.dialogData.contacts = item.contacts
      this.dialogData.address = item.address
      this.dialogData.createdTime = item.createdTime
      this.dialogData.endTime = item.endTime
      this.dialogData.phone = item.phone
      this.dialogData.faultClass = item.faultClass
      this.dialogData.faultDetail = item.faultDetail
      this.dialogData.workId = item.workId
      this.dialogData.orderId = item.fixTableId
      this.dialogData.resultDetails = item.resultDetails
      this.dialogData.message = item.message
      this.grade = item.grade
    },
    orderPass(item) {
      this.loadData(item)
      this.dialogVisible = true
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    getData() {
      // 一开始获取订单列表
      this.$http
        .get('student/order-list')
        .then(res => {
          this.orderHistoryList = res.data.data
          // 再排序一下数组（正在处理的状态置顶）
          // 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
          // 若 a 等于 b，则返回 0。
          // 若 a 大于 b，则返回一个大于 0 的值。
          this.structureData()
        })
        .catch(() => {
          return this.$message.error('获取订单列表失败')
        })
    },
    structureData() {
      this.orderHistoryList.sort((a, b) => {
        if (a.message && b.message) {
          return 0
        } else if (a.message && !b.message) {
          return 1
        } else if (!a.message && b.message) {
          return -1
        } else {
          return 0
        }
      })

      // 处理下时间格式 计算一下分数（除 2）
      for (const item of this.orderHistoryList) {
        item.createdTime = this.getLocalTime(item.createdTime)
        item.endTime = this.getLocalTime(item.endTime)
        item.grade = item.grade / 2
      }
    },
    sendMessage(item) {
      this.loadData(item)
      this.dialogVisible02 = true
    },
    submit() {
        const trueGrade = this.endOrderFrom.orderRate * 2
        // 需要检查当前的 message 是否为空，如果为空需要填入一个默认值，否则排序可能会受影响
        if (this.endOrderFrom.message === '') {
          this.endOrderFrom.message = '当前订单未评价'
        }
        // 发起axios请求
        this.$http
          .patch('student/order-end', {
            fixTableId: this.endOrderFrom.fixTableId,
            message: this.endOrderFrom.message,
            grade: trueGrade
          })
          .then(res => {
            this.$message.success('评价成功！')
            // 刷新当前的页面
            this.reload()
          })
          .catch(() => {
            return this.$message.error('评价失败！')
          })
    }
  }
}
</script>

<style  lang="less" scoped>
.student_orderHistoryList /deep/ .el-dialog {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(58, 58, 58, 0.596);
  .el-dialog__body {
    padding: 10px 20px;
  }
  .orderItem {
    span {
      display: block;
      text-align: center;
    }
    span:first-child {
      font-size: 15px;
      margin-top: 8px;
      font-weight: bold;
    }

    span:last-child {
      color: rgb(129, 129, 129);
    }
  }
}

.student_orderHistoryList /deep/ .endOrder {
  .el-dialog__body {
    background-color: #bccdcd;
  }
  .sendBox {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    height: 150px;
  }
}

.innerEndOrder /deep/ .el-dialog {
  border-radius: 10px;
  .el-dialog__body {
    padding-top: 0;
  }
  .el-button {
    position: relative;
    left: 50%;
    transform: translate(-50%, 50%);
    box-shadow: 0 0 5px rgba(58, 58, 58, 0.596);
  }
}

.my_title {
  font-weight: bold;
  margin-top: 20px;
  display: block;
}

.sendBox .el-rate /deep/ .el-rate__icon {
  font-size: 35px;
}

.el-card {
  width: 100%;
  height: 150px;
  box-shadow: 0 5px 10px rgba(56, 56, 56, 0.397);
  border-radius: 20px;
  position: relative;
  margin-top: 5%;
  .endTime {
    font-size: 3px;
    position: absolute;
    right: 10%;
    color: #9a9d9d;
  }
  .faultClass {
    font-size: 20px;
    font-weight: bold;
  }
  .showDetails {
    position: absolute;
    right: 10%;
    bottom: 15%;
  }
  .notMessage {
    display: block;
    font-size: 20px;
    margin-top: 30px;
    margin-left: 20px;
  }
  .el-rate {
    margin-top: 10%;
  }
}
</style>
