<template>
  <div>
    <el-dialog
      title="设备详情"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      width="40%"
    >
      <el-row type="flex" align="bottom">
        <el-col :span="20">
          <div class="equipment-name">
            <el-tooltip
              class="item"
              effect="dark"
              content="设备类别"
              placement="top"
            >
              <span> {{ item.eclass }} / </span>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="设备名称"
              placement="top"
            >
              <span>{{ item.ename }}</span>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="equipment-id">
            <div class="">{{ item.id }}</div>
          </div>
        </el-col>
      </el-row>
      <hr />

      <table>
        <tr>
          <td rowspan="2" class="equipment-image">
            <el-image
              :src="getImgUrl(item)"
              style="max-width: 400px; max-height: 300px"
              class="headerImg"
              align="fill"
            ></el-image>
          </td>
          <td class="equipment-item-top">
            <div>设备等级</div>
            <div>{{ item.egrade }}</div>
          </td>
          <td class="equipment-item-top">
            <div>权重</div>
            <div>{{ item.eweight }}</div>
          </td>
          <td class="equipment-item-top">
            <div>当前状态</div>
            <div>{{ item.state == 1 ? '维修中' : '空闲' }}</div>
          </td>
        </tr>
        <tr>
          <td class="equipment-item-top">
            <div>基础检查周期</div>
            <div>{{ item.eweightGrade }} 天</div>
          </td>
          <td class="equipment-item-top">
            <div class="title">上次检查时间</div>
            <div>{{ new Date(item.updateDate).toLocaleDateString() }}</div>
          </td>
          <td class="equipment-item-top">
            <div class="title">绑定的工号</div>
            <div>{{ item.eworker }}</div>
          </td>
        </tr>
      </table>
      <!-- 行 -->
      <div class="item">
        <span>地址</span>
        <span>{{ item.address }}</span>
      </div>
      <div class="item">
        <span>型号</span>
        <span>{{ item.etype }}</span>
      </div>
      <div class="item">
        <span>使用单位</span>
        <span>{{ item.usingUnit }}</span>
      </div>
      <div class="bottom-button">
        <el-tooltip effect="dark" content="查看设备二维码" placement="bottom">
          <el-button type="primary" round @click="crateQrcode(item.id)">
            二维码
          </el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="查看绑定该设备的维修工人"
          placement="bottom"
        >
          <el-button type="primary" round @click="getWorkInfo()">
            维修员
          </el-button>
        </el-tooltip>
      </div>
    </el-dialog>
    <!-- 二维码弹窗 -->
    <qr-dialog
      @visible-change="qrVisible = false"
      :visible="qrVisible"
      :qrText="qrText"
    ></qr-dialog>
    <worker-details
      :show.sync="workerDetailsVisible"
      :workerInfo.sync="workerForm"
    ></worker-details>
  </div>
</template>

<script>
import workerDetails from './workerDetails'
import qrDialog from './qrDialog'
export default {
  components: {
    workerDetails,
    qrDialog
  },
  data() {
    return {
      workerDetailsVisible: false,
      visible: this.show,
      item: {},
      workerForm: {},
      // 要生成二维码的文本
      qrText: '',
      qrVisible: false
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    equipmentInfo: {
      type: Object
    }
  },
  watch: {
    show() {
      this.visible = this.show
    },
    equipmentInfo() {
      this.item = this.equipmentInfo
      if (this.equipmentInfo == null) {
        this.visible = false
      }
    }
  },
  methods: {
    crateQrcode(str) {
      this.qrText = str + ''
      this.qrVisible = true
    },
    getImgUrl(item) {
      if (item.url) {
        return this.$http.defaults.baseURL + item.url
      }
      return require('@/assets/img/equipment.jpg')
    },
    getWorkInfo() {
      this.$http
        .get('admin/worker', {
          params: {
            workId: this.item.eworker
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
/deep/ .el-dialog {
  border-radius: 10px;
}

.equipment-name {
  font-size: 25px;
}

.equipment-id {
  font-size: 50px;
}

.equipment-image {
  width: 45%;
  max-width: 420px;
}

table {
  width: 100%;
  margin-bottom: 20px;
  .equipment-item-top {
    text-align: center;
    div:first-child {
      font-size: 20px;
      margin-bottom: 10px;
      color: rgb(150, 150, 150);
    }

    div:last-child {
      font-size: 18px;
    }
  }
}

.item {
  font-size: 20px;
  margin-bottom: 15px;
  span:first-child {
    color: rgb(150, 150, 150);
    margin-right: 30px;
  }
}

.bottom-button {
  text-align: center;
}
</style>
