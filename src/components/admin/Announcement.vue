<template >
  <div>
    <el-form ref='form' label-width='80px'>
      <el-form-item label='活动形式'>
        <el-input type='textarea' v-model='desc'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit'>立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
        desc: 'OK兄弟们全体目光向我看齐嗷'
    }
  },
  methods: {
    onSubmit() {
      const that = this
      async function seeWorker() {
        await that.$http
          .post('admin/message', {
            message: that.desc
          })
          .then(response => {
            that.$message.success('发布消息成功')
            setTimeout(function() { that.$router.push('Info') }, 2000)
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
