<template>
  <div class='student_orderList'>
    <el-col v-for='(item, index) in orderList' :key='index'>
      <el-card>
        <p class='endTime'>{{item.createdTime}}</p>
        <span class='faultClass'>{{item.faultClass}}</span>
        <i :class='["iconfont orderIcon",item.state == 1? "icon-dengdai": "icon-chaxun"]'></i>
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
      .get('student/order')
      .then(res => {
        this.orderList = res.data.data
        // 再排序一下数组（正在处理的状态置顶）
        this.orderList.sort((a, b) => {
          return b.state - a.state
        })

        // 处理下时间格式
        for (const item of this.orderList) {
          item.createdTime = this.getLocalTime(item.createdTime)
        }
      })
      .catch(() => {
        return this.$message.error('获取订单列表失败')
      })
  },
  data() {
    return {
      grade: 7,
      dialogVisible: false,
      orderIocn: '',
      orderList: [
        {
          fixTableId: '',
          contacts: '',
          address: '',
          createdTime: '',
          phone: '',
          faultClass: '',
          faultDetail: '',
          workId: '',
          state: ''
        }
      ],
      dialogData: {
        contacts: '',
        address: '',
        createdTime: '',
        phone: '',
        faultClass: '',
        faultDetail: '',
        workId: '',
        state: ''
      }
    }
  },
  methods: {
    orderPass(item) {
      this.dialogData.contacts = item.contacts
      this.dialogData.address = item.address
      this.dialogData.createdTime = item.createdTime
      this.dialogData.phone = item.phone
      this.dialogData.faultClass = item.faultClass
      this.dialogData.faultDetail = item.faultDetail

      if (!item.workId) {
        this.dialogData.workId = '尚未处理该订单'
      } else {
        this.dialogData.workId = item.workId
      }

      this.dialogVisible = true
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    }
  }
}
</script>

<style  lang="less" scoped>
.student_orderList /deep/ .el-dialog {
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
  .orderIcon {
    display: block;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 50px;
  }

  .icon-dengdai {
    color: #65a9dd;
  }

  .icon-chaxun {
    color: #add374;
  }

  .showDetails {
    position: absolute;
    right: 10%;
    bottom: 15%;
  }
}
</style>
