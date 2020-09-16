<template>
<!-- 展示数据,需要的可以自己修改 -->
  <div>
    <ul v-for='(item,messageId) in messages' :key='messageId'>
      <li>管理员ID{{item.adminId}}</li>
      <li>发布时间{{item.createDate}}</li>
      <li>内容{{item.messageStr}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.getStudent()
  },
  data() {
    return {
      messages: []
    }
  },
  methods: {
    getStudent() {
      const that = this
      async function seeWorker() {
        await that.$http
          .get('admin/message-list')
          .then(response => {
            that.$message.success('拉取信息成功')
            that.messages = response.data.data
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
#info {
  margin: 0px;
}
</style>
TODO:处理时间戳
