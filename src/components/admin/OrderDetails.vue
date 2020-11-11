<template>
  <div>
    <el-dialog
      title="订单详情"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      width="50%"
    >
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="createdTime">
            <div class="time">{{ pageData.createdTime }}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            round
            class="showWork"
            v-show="pageData.workId !== '尚未处理该订单'"
            @click="getWorkInfo()"
          >
            查看工人详情
          </el-button>
        </el-col>
      </el-row>

      <hr />
      <table>
        <tr>
          <td class="fixTableId" rowspan="2">
            <div class="title">订单号</div>
            <div class="id">{{ pageData.fixTableId }}</div>
          </td>
          <td class="studentId item">
            <div class="title">学生号</div>
            <div class="id">{{ pageData.studentId }}</div>
          </td>
          <td class="contacts item">
            <div class="title">联系人</div>
            <div class="name">{{ pageData.contacts }}</div>
          </td>
        </tr>
        <tr>
          <td class="workId item">
            <div class="title">维修工号</div>
            <div class="id">{{ pageData.workId }}</div>
          </td>
        </tr>
      </table>
      <!-- 行 -->
      <div class="orderItem" v-show="pageData.endTime !== null">
        <span>结束时间：</span>
        <span>{{ pageData.endTime }}</span>
      </div>
      <div class="orderItem">
        <span>详细地址：</span>
        <span>{{ pageData.address }}</span>
      </div>
      <div class="orderItem">
        <span>报修类型：</span>
        <span>{{ pageData.faultClass }}</span>
      </div>

      <div class="orderItem" v-show="pageData.resultDetails !== null">
        <span>工人评价：</span>
        <span class="orderDetailsText">{{ pageData.resultDetails }}</span>
      </div>
      <div class="orderItem" v-show="pageData.message !== null">
        <span>学生评价：</span>
        <span class="orderDetailsText">{{ pageData.message }}</span>
      </div>

      <div
        class="details"
        v-show="pageData.faultDetail !== null && pageData.faultDetail !== ''"
      >
        <div class="showregion" @click="showregion = !showregion">
          <span class="showstyle">{{
            showregion ? '收起报错描述' : '展开报错描述'
          }}</span>
        </div>

        <div v-show="showregion" class="detailsText">
          {{ pageData.faultDetail }}
        </div>
      </div>
      <!-- 评分 -->
      <el-card
        class="orderItem avgGrade"
        style="width: 100%"
        shadow="never"
        v-show="pageData.state == 2"
      >
        <span>订单评分</span>
        <el-rate
          show-text
          disabled
          text-color="#ff9900"
          v-model="pageData.grade"
        ></el-rate>
      </el-card>
      <div class="orderItem" v-show="pageData.urls !== null">
        <div>报修图片</div>
        <el-card
          v-for="(url, index) in pageData.urls"
          :key="index"
          :body-style="{ padding: '0' }"
        >
          <el-image
            style="width: 100%; height: 100px"
            :src="url"
            fit="none"
            :preview-src-list="pageData.urls"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-card>
      </div>
    </el-dialog>
    <worker-details :show.sync="workerDetailsVisible" :workerInfo.sync="workerForm"></worker-details>
  </div>
</template>

<script>
import workerDetails from './workerDetails'
export default {
  components: {
    workerDetails
  },
  data() {
    return {
      workerDetailsVisible: false,
      visible: this.show,
      pageData: {},
      showregion: true,
      workerForm: {}
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    orderInfo: {
      type: Object
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
    orderInfo() {
      this.pageData = this.orderInfo
      if (this.orderInfo == null) {
        this.visible = false
      }
    }
  },
  methods: {
    getWorkInfo() {
      this.$http
      .get('admin/worker', {
        params: {
          workId: this.pageData.workId
        }
      })
      .then(response => {
        this.workerForm = response.data.data
        this.workerForm.avgGrade = this.workerForm.avgGrade / 2
        for (const item of this.workerForm.thisMonth) {
          item.date = new Date(item.date).toLocaleDateString()
          item.grade = item.grade / 2
        }

        if (this.workerForm.url) {
          this.workerForm.url =
            this.$http.defaults.baseURL + this.workerForm.url
        }
        this.workerDetailsVisible = true
      })
      .catch(error => {
        return this.$message.error(error.$message)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.createdTime {
  .title {
    font-size: 10px;
  }
  .time {
    font-size: 20px;
  }
}

.fixTableId {
  width: 35%;
  .title {
    font-size: 10px;
  }
  .id {
    font-size: 60px;
  }
}

.studentId {
  padding-left: 30px;
  .title {
    font-size: 10px;
  }
  .id {
    font-size: 20px;
  }
}

.contacts {
  padding-left: 30px;
  .title {
    font-size: 10px;
  }
  .name {
    font-size: 20px;
  }
}

.workId {
  padding-left: 30px;
  .title {
    font-size: 10px;
  }
  .id {
    font-size: 20px;
  }
}

.orderItem {
  margin-top: 20px;
}

.details {
  .showregion {
    margin-top: 20px;
    margin-bottom: 5px;
    color: rgb(129, 129, 129);
    font-size: 15px;
  }

  .showregion:hover {
    cursor: pointer;
  }
  .detailsText {
    background-color: #f2f2f2;
    padding: 10px;
    margin-bottom: 10px;
  }
}

.el-rate /deep/ .el-rate__icon {
  font-size: 35px;
}
</style>
