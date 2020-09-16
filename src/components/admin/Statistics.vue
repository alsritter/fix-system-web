<template>
  <div>
    总单数：{{data.ordersNumber}}
    总单数0：{{data.ordersNumber_0}}
    总单数1：{{data.ordersNumber_1}}
    总单数2：{{data.ordersNumber_2}}
    <ul v-for="(item,index) in dataThisMonth" :key="index">
      <li>{{dataThisMonth[index].date}}</li>
      <li>{{dataThisMonth[index].grade}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    created() {
      this.getData()
    },
    data() {
      return {
        data: [],
        dataThisMonth: []
      }
    },
    methods: {
      getData() {
        const that = this
      async function seeWorker() {
        await that.$http
          .get('admin/statistics')
          .then(response => {
            that.$message.success('拉取数据成功')
            that.data = response.data.data
            that.dataThisMonth = response.data.data.thisMonth
          })
          .catch(() => {
            return that.$message.error('没拉取到数据噢')
          })
      }
      seeWorker()
      }
    }
  }
</script>

<style scoped>

</style>
