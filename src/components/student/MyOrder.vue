<template>
  <div>
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
    <div class='orderItem'>
      <span>单号</span>
      <span>20</span>
    </div>
    <div class='orderItem'>
      <span>状态</span>
      <span>正在处理</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // 当前订单
  }
}
</script>

<style  lang="less" scoped>
.orderItem {
  span {
    display: block;
    text-align: center;
  }
  span:first-child {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight: bold;
  }

  span:last-child {
    color: rgb(129, 129, 129);
  }
}
</style>
