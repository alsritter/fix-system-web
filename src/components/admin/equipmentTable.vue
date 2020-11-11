<template>
  <div>
    <el-table
      class="equipment-list"
      size="small"
      :data="
        equipments.slice(
          (pagination.currentPage - 1) * pagination.pagesize,
          pagination.currentPage * pagination.pagesize
        )
      "
      :row-class-name="tableRowClassName"
      style="width: 100%; padding-left: 20px; padding-right: 10px"
    >
      <el-table-column prop="id" label="设备 id" sortable></el-table-column>
      <el-table-column
        prop="ename"
        label="设备名称"
        :show-overflow-tooltip="true"
        sortable
      ></el-table-column>
      <el-table-column
        prop="egrade"
        label="设备等级"
        sortable
      ></el-table-column>
      <el-table-column
        prop="eweight"
        label="权重"
        :show-overflow-tooltip="true"
        sortable
      ></el-table-column>
      <el-table-column
        prop="eweightGrade"
        label="距离下次检查(单位/天)"
        sortable
      ></el-table-column>
      <el-table-column
        prop="updateDate"
        label="上次检查时间"
        sortable
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="eworker"
        label="绑定的工号"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        sortable
        :formatter="statusFormat"
      ></el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button
            v-on:click="getEquipmentDetails(scope.row)"
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
      equipments: [],
      // 分页数据
      pagination: {
        total: 0,
        pagesize: 10,
        currentPage: 1
      }
    }
  },
  props: {
    equipmentsInfo: {
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
    equipmentsInfo() {
      this.equipments = this.equipmentsInfo
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
      const tempArr = this.equipments
      for (const item of tempArr) {
        item.joinDate = new Date(parseInt(item.joinDate))
          .toLocaleString()
          .replace(/:\d{1,2}$/, ' ')
      }

      const equipmentSheet = XLSX.utils.json_to_sheet(tempArr)
      const newWorkbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(newWorkbook, equipmentSheet, '设备列表')
      XLSX.writeFile(newWorkbook, '设备列表' + '.xlsx')
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
        return '正常'
      } else if (state === 1) {
        return '维修中'
      }
    },
    // 拉取工人详情
    getEquipmentDetails(id) {
      this.$emit('child-getEquipmentDetails', id)
    }
  }
}
</script>
<style lang='less' scoped>
/deep/ .el-dialog {
  border-radius: 10px;
}

/deep/ .el-table .warning-row {
  background: rgb(205, 243, 201);
}

/deep/ .el-table .success-row {
  background: #f1d3d3;
}

/deep/ .el-table tbody tr:hover > td {
  background-color: #0000 !important;
}

.toexcel {
  position: fixed;
  left: 88%;
  top: 87%;
  z-index: 10;
}

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
