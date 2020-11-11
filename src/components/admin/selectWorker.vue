<template>
  <el-dialog
    title="选择工人"
    :visible.sync="selectWorkerVisible"
    width="70%"
    @close="$emit('visible-change', false)"
  >
    <el-table
      :data="
        workerData.slice(
          (pagination.currentPage - 1) * pagination.pagesize,
          pagination.currentPage * pagination.pagesize
        )
      "
      style="width: 100%; height: 500px"
      max-height="70%"
    >
      <el-table-column
        property="id"
        label="工号"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column property="name" label="姓名"></el-table-column>
      <el-table-column
        property="phone"
        label="电话"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        :formatter="statusWorkerFormat"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-on:click="selectWorker(scope.row)"
            type="primary"
            size="small"
            circle
            >选</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        @current-change="current_change"
        :page-size="pagination.pagesize"
        layout="prev, pager, next, total"
        :total="pagination.total"
      ></el-pagination>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      /* 创建一个 selectWorkerVisible 变量缓存 visible 数据
       * 在子组件需要调用 visible 的地方调用 selectWorkerVisible
       */
      selectWorkerVisible: this.visible,
      // 工人列表
      workerData: [],
      // 选中的工人
      workerId: '',
      // 分页数据
      pagination: {
        total: 0,
        pagesize: 7,
        currentPage: 1
      }
    }
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  watch: {
    // 双向绑定参考：https://segmentfault.com/a/1190000011783590
    // 新增 visible 的watch，监听变更同步到 selectWorkerVisible
    // 监听父组件对 props 属性 visible 的修改，并同步到组件内的data属性
    visible() {
      this.selectWorkerVisible = this.visible
      if (this.visible) {
        this.getWorker()
      }
    }
  },
  methods: {
    // 获取工人列表
    getWorker() {
      this.$http
        .get('admin/worker-list')
        .then(response => {
          this.workerData = response.data.data
          this.pagination.total = this.workerData.length
        })
        .catch(() => {
          return this.$message.error('拉取工人失败')
        })
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.pagination.currentPage = currentPage
    },
    // 格式化状态
    statusWorkerFormat: function (row, column) {
      var state = row[column.property]
      if (state === 0) {
        return '空闲'
      } else if (state === 1) {
        return '维修中'
      }
    },
    // 拉取工人详情
    selectWorker(row) {
      this.$emit('select-workerId', row)
      this.selectWorkerVisible = false
    }
  }
}
</script>
<style lang='less' scoped>
/deep/ .el-dialog {
  border-radius: 10px;
}

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
