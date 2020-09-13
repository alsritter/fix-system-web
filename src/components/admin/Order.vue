<template>
    <div>
        <div class="OrderBox">
            <!-- <li v-for="item in orders" :key="item.fixTableId" id="orderItem">
                <div v-if="item.state == 0">
                    {{item.fixTableId + item.studentId + item.phone + item.state}}未处理
                    <el-button type="text" @click="open">详情</el-button>
                </div>
                <div v-if="item.state == 1">
                    {{item.fixTableId + item.studentId + item.phone + item.state}}待处理
                    <el-button type="text" @click="open">详情</el-button>
                </div>
                <div v-if="item.state == 2">
                    {{item.fixTableId + item.studentId + item.phone + item.state}}已完成
                    <el-button type="text" @click="open">详情</el-button>
                </div>
            </li> -->
             <!--下拉-->
             <el-collapse
             v-for="item in orders" :key="item.fixTableId" id="orderItem"
             v-model="activeName" accordion class="collapse">
                <h6 class="h6">
                     订单ID:{{item.fixTableId}} 电话:{{item.phone}}地址:{{item.address}}</h6>
                <el-collapse-item title="未处理的订单" v-if="item.state == 0" class="test2">
                    <div id="test">
                    <i class="el-icon-user-solid"></i> 订单ID:{{item.fixTableId}}<br>
                    学生ID:{{item.studentId}}<br>
                    电话:{{item.phone}}<br>
                    状态:{{item.state}}<br>
                    创建时间:{{item.createdTime}}<br>
                    维修类型:{{item.faultClass}}<br>
                    具体问题:{{item.faultDetail}}<br>
                    地址:{{item.address}}<br>
                    联系人:{{item.contacts}}<br>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="待处理的订单" v-if="item.state == 1" class="test2">
                     订单ID:{{item.fixTableId}}<br>
                    学生ID:{{item.studentId}}<br>
                    电话:{{item.phone}}<br>
                    状态:{{item.state}}<br>
                    创建时间:{{item.createdTime}}<br>
                    维修类型:{{item.faultClass}}<br>
                    具体问题:{{item.faultDetail}}<br>
                    地址:{{item.address}}<br>
                    联系人:{{item.contacts}}<br>
                </el-collapse-item>
                <el-collapse-item title="已完成订单" v-if="item.state == 2" class="test2">
                     订单ID:{{item.fixTableId}}<br>
                    学生ID:{{item.studentId}}<br>
                    电话:{{item.phone}}<br>
                    状态:{{item.state}}<br>
                    创建时间:{{item.createdTime}}<br>
                    维修类型:{{item.faultClass}}<br>
                    具体问题:{{item.faultDetail}}<br>
                    地址:{{item.address}}<br>
                    联系人:{{item.contacts}}<br>
                </el-collapse-item>
            </el-collapse>

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
                orders: [],
                fixTableId: '1',
                activeName: '1'
            }
        },
        methods: {
            getOrder() {
            const that = this
            async function getOrder() {
            await that.$http
            .get('admin/order-list')
            .then((response) => {
                console.log(response)
                if (response.data.code !== 200) return that.$message.error('拉取失败')
                that.$message.success('拉取订单成功')
                that.orders = response.data.data
                console.log(response + 'from orders')
            })
            }
            getOrder()
            },
           open() {
                 this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定'
        })
      },
      toDetails() {
          this.$router.push('/OrderDetails')
      }
        }
    }
</script>

<style scoped>
#p {
    margin-top: 0;
}
/* .OrderBox{
    width: 100%;
    height: 100%;
    background-color: beige;
} */
#orderItem{
    list-style-type: none
}
.btn{
    display: block;
    margin: 0 auto;
    float: left;
}
.collapse{
    width: 100%;
    background-color: white;
}
el-collapse-item{
    float: left;
}
.h6{
    margin: 0 auto;

}
/* #test{
    background-color: blueviolet;
} */
/* 这里是修改点击处的颜色，别的属性不要添加 */
.test2 >>> .el-collapse-item__header {
    background-color: blanchedalmond;
}
/* 这里是修改内容处的颜色，别的属性不要添加 */
.test2 >>> .el-collapse-item__content {
    background-color: violet;
}
</style>
