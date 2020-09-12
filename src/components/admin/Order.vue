<template>
    <div>
        <div class="OrderBox">
            <ul  v-for="item in orders" :key="item.fixTableId" id="orderItem">
                <li v-if="item.state == 0">
                     <h6 class="h6">
                    订单ID:{{item.fixTableId}} 电话:{{item.phone}}地址:{{item.address}}
                    具体问题:<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
                            <el-dialog
                            title="问题描述"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleClose">
                            <span>{{item.faultDetail}}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                            </span>
                            </el-dialog>
                            <img src="//未处理" alt="">
                            <el-button type="primary" @click="worker = true">选择工人</el-button>
                            <el-dialog
                            title="问题描述"
                            :visible.sync="worker"
                            width="30%"
                            :before-close="handleClose">
                            <span>{{item.address}}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="worker = false">取 消</el-button>
                                <el-button type="primary" @click="worker = false">确 定</el-button>
                            </span>
                            </el-dialog>
                      </h6>
                </li>
                 <li v-if="item.state == 1">
                     <h6 class="h6">
                    订单ID:{{item.fixTableId}} 电话:{{item.phone}}地址:{{item.address}}
                    具体问题:<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
                            <el-dialog
                            title="问题描述"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleClose">
                            <span>{{item.faultDetail}}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                            </span>
                            </el-dialog>
                            <img src="//未处理" alt="">
                            <el-button type="primary" @click="worker = true">选择工人</el-button>
                            <el-dialog
                            title="问题描述"
                            :visible.sync="worker"
                            width="30%"
                            :before-close="handleClose">
                            <span>{{item.address}}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="worker = false">取 消</el-button>
                                <el-button type="primary" @click="worker = false">确 定</el-button>
                            </span>
                            </el-dialog>
                      </h6>
                </li>
                 <li v-if="item.state == 2">
                     <h6 class="h6">
                    订单ID:{{item.fixTableId}} 电话:{{item.phone}}地址:{{item.address}}
                    具体问题:<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
                            <el-dialog
                            title="问题描述"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleClose">
                            <span>{{item.faultDetail}}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                            </span>
                            </el-dialog>
                            <img src="//未处理" alt="">
                            <el-button type="primary" @click="worker = true">选择工人</el-button>
                            <el-dialog
                            title="问题描述"
                            :visible.sync="worker"
                            width="30%"
                            :before-close="handleClose">
                            <span>{{item.address}}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="worker = false">取 消</el-button>
                                <el-button type="primary" @click="worker = false">确 定</el-button>
                            </span>
                            </el-dialog>
                      </h6>
                </li>
            </ul>

             <el-button type="primary" icon="el-icon-search"
             @click="getOrder" class="btn">拉取订单</el-button>
             <!-- 分页 -->
             <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="50"
                    :page-size="10">
                </el-pagination>
            </div>
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
                activeName: '1',
                workerData: [],
                dialogVisible: false,
                worker: false
            }
        },
        methods: {
            getOrder() {
            const that = this
            async function getOrder() {
            await that.$http
            .get('admin/order-list')
            .then((response) => {
                if (response.data.code !== 200) return that.$message.error('拉取失败')
                that.$message.success('拉取订单成功')
                that.orders = response.data.data
            })
            }
            getOrder()
            },
            getWorker() {
                 const that = this
            async function seeWorker() {
            await that.$http
            .get('admin/select-worker')
            .then((response) => {
                if (response.data.code !== 200) return that.$message.error('拉取工人失败')
                that.$message.success('拉取工人成功')
                that.workerData = response.data.data
            })
            }
            seeWorker()
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
            },
            handleCurrentChange() {
            const that = this
            async function getOrder() {
            await that.$http
            .get('admin/order-list')
            .then((response) => {
                if (response.data.code !== 200) return that.$message.error('拉取失败')
                that.$message.success('拉取订单成功')
                that.orders = response.data.data
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
#orderItem{
    list-style-type: none
}
.btn{
    display: block;
    margin: 0 auto;
    float: left;
}
.collapse{
    background-color: white;
     width: 50%;
}
el-collapse-item{
    float: left;
}
.h6{
    margin: 0 auto;

}
/* 这里是修改点击处的颜色，别的属性不要添加 */
.test2 >>> .el-collapse-item__header {
    background-color: blanchedalmond;
}
/* 这里是修改内容处的颜色，别的属性不要添加 */
.test2 >>> .el-collapse-item__content {
    background-color: violet;
}
#right{
    float: right;
    background-color: blue;
}
</style>
TODO: 弹窗功能已经实现，把对应的状态配置好
TODO:想办法实现翻页功能
