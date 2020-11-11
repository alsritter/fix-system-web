  <template>
  <div class="user-box">
    <!-- 新增耗材 -->
    <el-button @click="dialogVisible = true" type="primary" class="addButton">
      添加新耗材
    </el-button>
    <div class="table_box">
      <el-table
        :data="
          tools.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
        @cell-mouse-enter="getToolsId"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :stripe="true"
      >
        <el-table-column prop="toolId" label="工具编号"></el-table-column>
        <el-table-column prop="toolName" label="姓名"></el-table-column>
        <el-table-column prop="toolCount" label="数量"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="上次修改时间"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="updateNumber" label="修改次数"></el-table-column>
        <el-table-column prop="price" label="物品单价"></el-table-column>
        <el-table-column
          prop="sumPrice"
          label="物品总价"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- 弹窗方式 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleChange(scope.$index, tools)"
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="deleteTools(scope.$index, tools)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增耗材弹窗 -->
    <el-dialog
      title="添加耗材"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form :model="newTool" :rules="rules" ref="rules">
        <!-- 这个 prop 的名字要和上面表单绑定（:model='newTool'）的数据的对象名称相同 -->
        <el-form-item label="耗材名" prop="newToolName">
          <i class="iconfont icon-ziyuan"></i>
          <el-input
            v-model="newTool.newToolName"
            placeholder="请输入耗材名"
          ></el-input>
        </el-form-item>
        <el-form-item label="耗材数量" prop="newToolCount">
          <i class="el-icon-s-data"></i>
          <el-input
            type="number"
            min="0"
            max="9999"
            v-model="newTool.newToolCount"
            placeholder="请输入耗材数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="耗材单价" prop="newToolPrice">
          <i class="iconfont icon-price-tag--fill"></i>
          <el-input
            type="number"
            min="0"
            max="9999"
            v-model="newTool.newToolPrice"
            placeholder="请输入耗材单价"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改耗材弹窗 -->
    <el-dialog
      title="修改耗材"
      :visible.sync="updateDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form :model="oldTool" :rules="rules" ref="oldTool">
        <!-- 这个 prop 的名字要和上面表单绑定（:model='newTool'）的数据的对象名称相同 -->
        <el-form-item label="耗材名" prop="newToolName">
          <i class="iconfont icon-ziyuan"></i>
          <el-input
            v-model="oldTool.newToolName"
            placeholder="请输入耗材名"
          ></el-input>
        </el-form-item>
        <el-form-item label="耗材数量" prop="newToolCount">
          <i class="el-icon-s-data"></i>
          <el-input
            type="number"
            min="0"
            max="9999"
            v-model="oldTool.newToolCount"
            placeholder="请输入耗材数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="耗材单价" prop="newToolPrice">
          <i class="iconfont icon-price-tag--fill"></i>
          <el-input
            type="number"
            min="0"
            max="9999"
            v-model="oldTool.newToolPrice"
            placeholder="请输入耗材单价"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="updateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="update()">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 导出按钮 -->
    <div class="toexcel">
      <el-button @click="exportExcel" type="primary">导出 Excel</el-button>
    </div>
    <div class="pagination-block">
      <el-pagination
        @current-change="current_change"
        :page-size="pagesize"
        layout="prev, pager, next, total"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
  data() {
    return {
      rules: {
        newToolCount: [
          { required: true, message: '不要空着哦', trigger: 'blur' }
        ],
        newToolName: [
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          },
          { required: true, message: '不要空着哦', trigger: 'blur' }
        ],
        newToolPrice: [
          { required: true, message: '不要空着哦', trigger: 'blur' }
        ]
      },
      tools: [],
      toolId: '',
      toolCount: '',
      newTool: {
        newToolName: '',
        newToolCount: '',
        newToolPrice: 0.0
      },
      oldTool: {
        toolId: 0,
        newToolName: '',
        newToolCount: '',
        newToolPrice: 0.0
      },
      total: 0,
      pagesize: 10,
      currentPage: 1,
      dialogVisible: false,
      updateDialogVisible: false,
      loading: true
    }
  },
  created() {
    this.getTools()
    // 检测当前屏幕的缩放比
    const size = this.detectZoom()
    // console.log(size)
    if (size <= 100) {
      this.pagesize = 9
    } else if (size < 111) {
      this.pagesize = 8
    } else if (size < 126) {
      this.pagesize = 6
    } else {
      this.pagesize = 4
    }
  },
  methods: {
    // 导出表格所用
    exportExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.tools)
      const newWorkbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(newWorkbook, worksheet, '耗材列表')
      XLSX.writeFile(newWorkbook, '耗材列表' + '.xlsx')
    },
    detectZoom() {
      let ratio = 0
      const screen = window.screen
      const ua = navigator.userAgent.toLowerCase()
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
      }
      return ratio
    },
    // 分页监听函数
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    // 打开删除弹窗且删除
    deleteTools(index, rows) {
      this.$confirm('此操作将永久删除该耗材, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .delete('admin/tool', {
              params: {
                toolId: this.toolId
              }
            })
            .then(response => {
              rows.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              setTimeout(() => {
                location.reload()
              }, 500)
            })
            .catch(() => {
              return this.$message({
                type: 'error',
                message: '删除失败!'
              })
            })
        })
        .catch(() => {})
    },
    // 获取当前选择工具ID
    getToolsId(row) {
      this.toolId = row.toolId
    },
    // 修改工具数量
    handleChange(index, rows) {
      this.oldTool.toolId = rows[index].toolId
      this.oldTool.newToolName = rows[index].toolName
      this.oldTool.newToolCount = rows[index].toolCount
      this.oldTool.newToolPrice = rows[index].price
      this.updateDialogVisible = true
    },
    update() {
      this.$refs.oldTool.validate(validate => {
        if (!validate) {
          return this.$message.error('请检查输入格式')
        }

        this.$http
          .patch('admin/tool', {
            toolId: this.oldTool.toolId,
            toolName: this.oldTool.newToolName,
            toolCount: this.oldTool.newToolCount,
            price: this.oldTool.newToolPrice
          })
          .then(response => {
            this.$message.success('修改成功')
            setTimeout(() => {
              this.updateDialogVisible = false
              location.reload()
            }, 1000)
          })
          .catch(() => {
            return this.$message.error('修改失败')
          })
      })
    },
    // 拉取工具表
    getTools() {
      this.$http
        .get('admin/tool-list')
        .then(response => {
          this.loading = false
          this.tools = response.data.data
          this.total = response.data.data.length

          for (const tool of this.tools) {
            tool.createTime =
              new Date(tool.createTime).toLocaleDateString() +
              ' ' +
              new Date(tool.createTime).toLocaleTimeString()

            tool.updateTime =
              new Date(tool.updateTime).toLocaleDateString() +
              ' ' +
              new Date(tool.updateTime).toLocaleTimeString()

            tool.sumPrice = tool.toolCount * tool.price
            tool.sumPrice = tool.sumPrice.toFixed(2)
          }
        })
        .catch(() => {
          return this.$message.error('未拉取到耗材列表')
        })
    },
    // 添加耗材
    add() {
      this.$refs.rules.validate(validate => {
        if (!validate) {
          return this.$message.error('请把信息填写完整！')
        }
        this.newTool.newToolPrice = parseFloat(
          this.newTool.newToolPrice
        ).toFixed(2)
        this.$http
          .post('admin/tool', {
            toolName: this.newTool.newToolName,
            toolCount: this.newTool.newToolCount,
            price: this.newTool.newToolPrice
          })
          .then(response => {
            this.$message.success('添加成功')
            setTimeout(() => {
              location.reload()
              this.dialogVisible = false
            }, 1000)
          })
          .catch(() => {
            return this.$message.error('未添加成功')
          })
      })
    }
  }
}
</script>

<style  lang='less' scoped>
.user-box {
  width: 100%;
  height: 95%;
  background-color: white;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.addButton {
  position: fixed;
  z-index: 10;
  left: 85%;
  top: 85%;
}

/deep/ .el-table .el-table__row--striped td {
  background: #eff1be !important;
}

/deep/ .el-table .el-table__row--striped:hover td {
  background: #edf092 !important;
}

.toexcel {
  position: fixed;
  left: 77%;
  top: 85%;
  z-index: 10;
}

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
