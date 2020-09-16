  <template>
  <div class='block'>
    <el-table
      :data='tools.slice((currentPage-1)*pagesize,currentPage*pagesize)'
      style='width: 100%'
      @cell-mouse-enter='getToolsId'
      v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop='toolId' label='日期' width='180'></el-table-column>
      <el-table-column prop='toolName' label='姓名' width='180'></el-table-column>
      <el-table-column prop='toolCount' label='数量'></el-table-column>
      <el-table-column fixed='right' label='修改数量'>
        <template slot-scope='scope'>
          <el-input-number v-model='scope.row.toolCount' @change='handleChange' label='修改数量'></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label='整个删除'>
        <!-- 弹窗方式 -->
        <template slot-scope='scope'>
          <el-button @click='deleteTools(scope.$index , tools)'>移除工具</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change='current_change' layout='prev, pager, next' :total='total'></el-pagination>
    <!-- 新增耗材 -->
    <el-button @click='dialogVisible = true'>添加</el-button>
    <!-- 新增耗材弹窗 -->
    <el-dialog title='提示' :visible.sync='dialogVisible' width='30%' >
      <span>
        <el-input v-model="NewToolName" placeholder="请输入工具名"></el-input>
        <el-input v-model="NewToolCount" placeholder="请输入工具数量"></el-input>
      </span>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='add() ; dialogVisible = false'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tools: [],
      toolId: '',
      toolCount: '',
      NewToolName: '',
      NewToolCount: '',
      total: 0,
      pagesize: 10,
      currentPage: 1,
      dialogVisible: false,
      loading: true
    }
  },
  created() {
    this.getTools()
  },
  methods: {
    // 分页监听函数
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    // 打开删除弹窗且删除
    deleteTools(index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          const that = this
          async function deleteTools() {
            await that.$http
              .delete('admin/tool', {
                params: {
                  toolId: that.toolId
                }
              })
              .then(response => {})
              .catch(() => {
                return ''
              })
          }
          deleteTools()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取当前选择工具ID
    getToolsId(row) {
      this.toolId = row.toolId
      console.log('工具号' + this.toolId)
    },
    // 修改工具数量
    handleChange(value) {
      const that = this
      that.toolCount = value
      async function seeWorker() {
        await that.$http
          .patch('admin/tool', {
            toolId: that.toolId,
            toolCount: that.toolCount
          })
          .then(response => {
            that.$message.success('修改工具成功')
          })
          .catch(() => {
            return that.$message.error('没修改到工具噢')
          })
      }
      seeWorker()
    },
    // 拉取工具表
    getTools() {
      const that = this
      async function seeWorker() {
        await that.$http
          .get('admin/tool-list')
          .then(response => {
            that.loading = false
            that.$message.success('拉取工具成功')
            that.tools = response.data.data
            that.total = response.data.data.length
          })
          .catch(() => {
            return that.$message.error('没拉取到工具噢')
          })
      }
      seeWorker()
    },
    // 视图层删除界面
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    // 添加耗材
    add() {
      const that = this
      async function seeWorker() {
        await that.$http
          .post('admin/tool', {
            toolName: that.NewToolName,
            toolCount: that.NewToolCount
          })
          .then(response => {
            that.$message.success('创建工具成功')
            location.reload()
          })
          .catch(() => {
            return that.$message.error('没创建到工具噢')
          })
      }
      seeWorker()
    }
  },
  // 处理弹窗
  handleClose(done) {
    this.$confirm('确认关闭？')
      .then(_ => {
        done()
      })
      .catch(_ => {})
  }
}
</script>

<style scoped>
#p {
  margin-top: 0;
}
</style>
