<template>
  <div>
    <el-table
      class="worker-list"
      :data="
        workers.slice(
          (pagination.currentPage - 1) * pagination.pagesize,
          pagination.currentPage * pagination.pagesize
        )
      "
      style="width: 100%; padding-left: 20px; padding-right: 10px"
      :default-sort="{ prop: 'state', order: 'descending' }"
      :row-class-name="tableRowClassName"
      size="small"
    >
      <el-table-column
        prop="id"
        label="工号"
        sortable
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        :show-overflow-tooltip="true"
        sortable
      ></el-table-column>
      <el-table-column prop="gender" label="性别" sortable></el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        :show-overflow-tooltip="true"
        sortable
      ></el-table-column>
      <el-table-column
        prop="joinDate"
        label="入职时间"
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        sortable
      ></el-table-column>
      <el-table-column prop="avgGrade" label="平均打分"></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        sortable
        :formatter="statusFormat"
      ></el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button
            v-on:click="getWorkerDetails(scope.row)"
            type="primary"
            circle
          >
            查
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 导出按钮 -->
    <div class="toexcel">
      <el-button @click="exportExcel" type="primary">导出 Excel</el-button>
    </div>
    <!-- 分页-页码 -->
    <div class="pagination-block">
      <el-pagination
        @current-change="current_change"
        :page-size="pagination.pagesize"
        layout="prev, pager, next, total"
        :total="pagination.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import moment from 'moment'
export default {
  data() {
    return {
      visible: this.show,
      workers: [],
      // 分页数据
      pagination: {
        total: 0,
        pagesize: 10,
        currentPage: 1
      }
    }
  },
  props: {
    workersInfo: {
      type: Array
    },
    total: {
      type: Number
    },
    pagesize: {
      type: Number
    }
  },
  watch: {
    workersInfo() {
      this.workers = this.workersInfo
    },
    total: {
      immediate: true, // 这句重要
      handler(val) {
        this.pagination.total = val
      }
    },
    pagesize: {
      immediate: true, // 这句重要
      handler(val) {
        this.pagination.pagesize = val
      }
    }
  },
  methods: {
    // 导出表格所用
    exportExcel() {
      const tempArr = this.workers
      for (const item of tempArr) {
        item.joinDate = new Date(parseInt(item.joinDate))
          .toLocaleString()
          .replace(/:\d{1,2}$/, ' ')
      }

      const worksheet = XLSX.utils.json_to_sheet(tempArr)
      const newWorkbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(newWorkbook, worksheet, '员工列表')
      XLSX.writeFile(newWorkbook, '员工列表' + '.xlsx')
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.pagination.currentPage = currentPage
    },
    // 显示订单状态颜色的函数
    tableRowClassName({ row }) {
      if (row.state === 1) {
        return 'success-row'
      } else if (row.state === 0) {
        return 'warning-row'
      }
      return ''
    },
    // 表格处理时间的函数
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
    // 格式化状态
    statusFormat: function (row, column) {
      var state = row[column.property]
      if (state === 0) {
        return '空闲'
      } else if (state === 1) {
        return '维修中'
      }
    },
    // 拉取工人详情
    getWorkerDetails(row) {
      this.$emit('child-getWorkerDetails', row)
    }
  }
}
</script>
<style lang='less' scoped>
/deep/ .el-dialog {
  border-radius: 10px;
}

.toexcel {
  position: fixed;
  left: 88%;
  top: 87%;
  z-index: 10;
}

/* 订单页面的颜色 */
/deep/ .el-table .warning-row {
  background: rgb(205, 243, 201);
}

/deep/ .el-table .success-row {
  background: #d3e6f1;
}

/deep/ .el-table tbody tr:hover > td {
  background-color: #0000 !important;
}

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
