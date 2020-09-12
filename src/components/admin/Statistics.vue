<template>
    <div>
        <el-popover
  ref="popover4"
  placement="right"
  width="400"
  trigger="click">
  <el-table :data="gridData">
    <el-table-column width="150" property="date" label="日期"></el-table-column>
    <el-table-column width="100" property="name" label="姓名"></el-table-column>
    <el-table-column width="300" property="address" label="地址"></el-table-column>
  </el-table>
</el-popover>

<el-button v-popover:popover4>click 激活</el-button>
    </div>
</template>

<script>
    export default {
     data() {
            return {
                orders: [],
                fixTableId: '1',
                activeName: '1',
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }]
            }
        }
    }
</script>

<style scoped>
#p {
    margin-top: 0;
}
</style>
