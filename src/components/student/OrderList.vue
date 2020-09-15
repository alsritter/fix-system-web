<template>
  <div class='student_orderHistoryList'>
    <el-col v-for='(item, index) in orderHistoryList' :key='index'>
      <el-card>
        <p class='endTime'>{{item.createdTime}}</p>
        <span class='faultClass'>{{item.faultClass}}</span>
        <el-rate v-model='show_grade' disabled show-text text-color='#ff9900' :allow-half='true'></el-rate>
        <el-button type='text' class='showDetails' @click='orderPass(item)'>点击查看详情</el-button>
      </el-card>
    </el-col>

    <el-dialog title='订单详情' :visible.sync='dialogVisible' width='70%'>
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    // 一开始获取订单列表
    this.$http
      .get('student/order-list')
      .then(res => {
        this.orderHistoryList = res.data.data
        // 再排序一下数组（正在处理的状态置顶）
        // 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
        // 若 a 等于 b，则返回 0。
        // 若 a 大于 b，则返回一个大于 0 的值。
        this.orderHistoryList.sort((a, b) => {
          if (a.massage && b.massage) {
            return 0
          } else if (a.massage && !b.massage) {
            return 1
          } else if (!a.massage && b.massage) {
            return -1
          } else {
            return 0
          }
        })

        // 再处理下数据
      })
      .catch(() => {
        return this.$message.error('获取订单列表失败')
      })
  },
  data() {
    return {
      grade: 7,
      dialogVisible: false,
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
        resultDetails: ''
      }
    }
  },
  methods: {
    orderPass(item) {
      this.dialogData.contacts = item.contacts
      this.dialogData.address = item.address
      this.dialogData.createdTime = item.createdTime
      this.dialogData.endTime = item.endTime
      this.dialogData.phone = item.phone
      this.dialogData.faultClass = item.faultClass
      this.dialogData.faultDetail = item.faultDetail
      this.dialogData.workId = item.workId

      this.dialogVisible = true
    }
  },
  // 计算属性
  computed: {
    show_grade: function () {
      return this.grade / 2
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
  .el-rate {
    margin-top: 10%;
    .el-rate__icon {
      font-size: 35px;
    }
  }
}
</style>
