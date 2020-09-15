<template>
  <div class='student_orderList'>
    <el-col v-for='(o, index) in 10' :key='index'>
      <el-card>
        <p class='endTime'>2020/9/12 20:46</p>
        <span class='faultClass'>网络问题</span>
        <el-rate v-model='show_grade' disabled show-text text-color='#ff9900' :allow-half='true'></el-rate>
        <el-link type='primary' class='showDetails' @click='orderPass(index)'>点击查看详情</el-link>
      </el-card>
    </el-col>

    <el-dialog title='订单详情' :visible.sync='dialogVisible' width='70%'>
      <div class='orderItem'>
        <span>报修类型</span>
        <span>网络问题</span>
      </div>
      <div class='orderItem'>
        <span>详细地址</span>
        <span>18 栋 611</span>
      </div>
      <div class='orderItem'>
        <span>联系人</span>
        <span>克劳德</span>
      </div>
      <div class='orderItem'>
        <span>报修时间</span>
        <span>2020/9/6 20:46</span>
      </div>
      <div class='orderItem'>
        <span>解决时间</span>
        <span>2020/9/12 20:46</span>
      </div>
      <div class='orderItem'>
        <span>维修师傅</span>
        <span>吴师傅</span>
      </div>
      <div class='orderItem'>
        <span>详情</span>
        <span class='orderDetailsText'>
          锦里开芳宴，兰缸艳早年。
          缛彩遥分地，繁光远缀天。
          接汉疑星落，依楼似月悬。
          别有千金笑，来映九枝前。
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grade: 7,
      dialogVisible: false
    }
  },
  methods: {
    orderPass(id) {
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
