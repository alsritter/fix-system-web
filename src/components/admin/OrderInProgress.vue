<template>
    <div>
        <div class="OrderBox">
            <li v-for="item in orders" :key="item.fixTableId" id="orderItem">
                 <div v-if="item.state == 1">
                    {{item.fixTableId + item.studentId + item.phone + item.state}}进行中
                    <el-button type="primary" icon="el-icon-edit" @click="getDetails"></el-button>
                </div>
            </li>
             <el-button type="primary" icon="el-icon-search"
             @click="getOrder" class="btn">拉取订单</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.getOrder()
        },
        data() {
            return {
                orders: []
            }
        },
        methods: {
            getOrder() {
             const that = this
            async function getOrder() {
            await that.$http
            .get('admin/order-list')
            .then((response) => {
                // console.log(response)
                if (response.data.code !== 200) return that.$message.error('拉取失败')
                that.$message.success('拉取订单成功')
                that.orders = response.data.data
                console.log(response)
                console.log(that.orders)
            })
            }
            getOrder()
            }
        }
    }
</script>

<style scoped>
#p {
    margin-top: 0;
}
.OrderBox{
    width: 100%;
    height: 100%;
    background-color: beige;
}
#orderItem{
    list-style-type: none
}
.btn{
    display: block;
    margin: 0 auto;
}
</style>
TODO:选择分配工人需要弹窗
