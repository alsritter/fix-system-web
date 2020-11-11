<template>
  <div>
    <el-card
      v-for="(item, index) in equipments.slice(
        (pagination.currentPage - 1) *
          (pagination.pagesize > 6 ? 6 : pagination.pagesize),
        pagination.currentPage *
          (pagination.pagesize > 6 ? 6 : pagination.pagesize)
      )"
      :key="index"
      v-on:click.native="getEquipmentDetails(item)"
      :class="{ isBad: item.state == 1 }"
      ><table>
        <tr>
          <td rowspan="7" style="width: 50%" class="head-img">
            <el-image
              :src="getImgUrl(item)"
              style="max-width: 150px; max-height: 165px"
              class="headerImg"
              align="fill"
            ></el-image>
          </td>
          <td class="row-item">
            <div>设备 id</div>
            <div>{{ item.id }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>设备名称</div>
            <div>{{ item.ename }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>设备等级</div>
            <div>{{ item.egrade }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>绑定的工号</div>
            <div>{{ item.eworker }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>上次检查时间</div>
            <div>{{ new Date(item.updateDate).toLocaleDateString() }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>当前状态</div>
            <div>{{ item.state == 1 ? '维修中' : '正常' }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>距离下次检查</div>
            <div>{{ item.eweightGrade }} 天</div>
          </td>
        </tr>
      </table>
    </el-card>
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
export default {
  data() {
    return {
      visible: this.show,
      equipments: [],
      // 分页数据
      pagination: {
        total: 0,
        pagesize: 6,
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
    }
  },
  methods: {
    getImgUrl(item) {
      if (item.url) {
        return this.$http.defaults.baseURL + item.url
      }
      return require('@/assets/img/equipment.jpg')
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.pagination.currentPage = currentPage
    },
    // 拉取工人详情
    getEquipmentDetails(item) {
      this.$emit('child-getEquipmentDetails', item)
    }
  }
}
</script>

<style lang='less' scoped>
.el-card {
  width: 30%;
  box-shadow: 0 5px 10px rgba(56, 56, 56, 0.397);
  border-radius: 20px;
  position: relative;
  margin-top: 30px;
  margin-left: 20px;
  float: left;
  background: rgb(205, 243, 201);
  border: none;
}

.isBad {
  background: #f1d3d3;
}

.el-card:hover {
  cursor: pointer;
}

.el-image {
  border-radius: 10px;
}

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 10;
}

.headerImg {
  margin-right: 30px;
}

.row-item {
  div:first-child {
    font-size: 15px;
    font-weight: bold;
    margin-right: 15px;
    color: rgb(129, 129, 129);
    display: inline-block;
  }

  div:last-child {
    color: #9d9d9d;
    display: inline-block;
  }
}

.rate-item {
  div:first-child {
    font-size: 15px;
    font-weight: bold;
    margin-right: 15px;
    color: rgb(129, 129, 129);
    display: inline-block;
  }
}
</style>
