<template>
  <div>
    <el-card
      v-for="(item, index) in workers.slice(
        (pagination.currentPage - 1) *
          (pagination.pagesize > 6 ? 6 : pagination.pagesize),
        pagination.currentPage *
          (pagination.pagesize > 6 ? 6 : pagination.pagesize)
      )"
      :key="index"
      v-on:click.native="getWorkerDetails(item)"
      ><table>
        <tr>
          <td rowspan="7" style="width: 50%" class="head-img">
            <el-image
              :src="getImgUrl(item)"
              style="max-width: 120px; max-height: 165px"
              class="headerImg"
              align="fill"
            ></el-image>
          </td>
          <td class="row-item">
            <div>工号</div>
            <div>{{ item.id }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>名字</div>
            <div>{{ item.name }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>性别</div>
            <div>{{ item.gender }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>电话</div>
            <div>{{ item.phone }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>加入时间</div>
            <div>{{ new Date(item.joinDate).toLocaleDateString() }}</div>
          </td>
        </tr>
        <tr>
          <td class="row-item">
            <div>当前状态</div>
            <div>{{ item.state == 1 ? '维修中' : '空闲' }}</div>
          </td>
        </tr>
        <tr>
          <td class="rate-item">
            <div>平均评分</div>
            <el-rate :value="item.avgGrade / 2" show-text disabled> </el-rate>
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
      workers: [],
      // 分页数据
      pagination: {
        total: 0,
        pagesize: 6,
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
    }
  },
  methods: {
    getImgUrl(item) {
      if (item.url) {
        return this.$http.defaults.baseURL + item.url
      }
      return require('@/assets/img/workimg.jpg')
    },
    // 翻页函数
    current_change: function (currentPage) {
      this.pagination.currentPage = currentPage
    },
    // 格式化状态
    statusFormat: function (row, column) {
      var state = row[column.property]
      if (state === 0) {
        return '空闲'
      } else if (state === 1) {
        return '正在处理'
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
.el-card {
  width: 30%;
  box-shadow: 0 5px 10px rgba(56, 56, 56, 0.397);
  border-radius: 20px;
  position: relative;
  margin-top: 30px;
  margin-left: 20px;
  float: left;
}

.el-card:hover {
  cursor: pointer;
}

.pagination-block {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
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
