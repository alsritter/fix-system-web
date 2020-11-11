<template>
  <div class="user-box">
    <div class="cutTheme">
      <el-radio-group v-model="cardTheme">
        <el-radio-button :label="true">卡片</el-radio-button>
        <el-radio-button :label="false">列表</el-radio-button>
      </el-radio-group>
    </div>
    <el-form ref="searchform" :model="searchform" class="searchform">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="使用单位">
            <el-input
              v-model="searchform.usingUnit"
              placeholder="输入单位名称"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item label="设备名称">
            <el-input
              v-model="searchform.ename"
              placeholder="输入设备名称"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="设备型号">
            <el-input
              v-model="searchform.etype"
              placeholder="输入设备型号"
              show-word-limit
              maxlength="17"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="设备类别">
            <el-select v-model="searchform.eclass" placeholder="选择设备类别">
              <el-option
                v-for="item in eclass"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="设备等级">
            <el-select v-model="searchform.egrade" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="设备状态">
            <el-select v-model="searchform.state" placeholder="请选择活动区域">
              <el-option label="维修中" :value="1"></el-option>
              <el-option label="正常" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" class="head_button">
          <div>
            <el-button type="primary" @click="search()" round>搜索</el-button>
            <el-button @click="cancel()" round>取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <equipment-table
      v-show="!cardTheme"
      :equipmentsInfo.sync="equipments"
      :total.sync="pagination.total"
      :pagesize.sync="pagination.pagesize"
      @child-getEquipmentDetails="getEquipmentDetails"
    ></equipment-table>
    <equipment-card
      v-show="cardTheme"
      :equipmentsInfo.sync="equipments"
      :total.sync="pagination.total"
      @child-getEquipmentDetails="getEquipmentDetails"
    >
    </equipment-card>
    <!-- 设备详情 -->
    <equipment-details
      :show.sync="equipmentDetailsVisible"
      :equipmentInfo="equipmentInfo"
    ></equipment-details>

    <el-card class="weather">
      <div>
        <span>当前温度：{{this.temp.temp}}℃</span>
      </div>
      <div>
        <span>相对湿度：{{this.temp.humidity}}%</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import equipmentDetails from './equipmentDetails'
import equipmentTable from './equipmentTable'
import equipmentCard from './equipmentCard'
export default {
  components: {
    equipmentTable,
    equipmentCard,
    equipmentDetails
  },
  data() {
    return {
      temp: {
        humidity: 0,
        temp: 0
      },
      // 绑定到模板页用的数据
      equipmentDetailsVisible: false,
      cardTheme: true,
      equipmentInfo: {},
      // 分页数据
      pagination: {
        total: 0,
        pagesize: 10,
        currentPage: 1
      },
      equipments: [],
      eclass: [],
      searchform: {
        usingUnit: '',
        ename: '',
        etype: '',
        eclass: '',
        egrade: '',
        state: ''
      },
      options: [
        {
          value: 1,
          label: 'E 级（无需管理）'
        },
        {
          value: 2,
          label: 'D 级'
        },
        {
          value: 3,
          label: 'C 级'
        },
        {
          value: 4,
          label: 'B 级'
        },
        {
          value: 5,
          label: 'A 级（重点关注）'
        }
      ]
    }
  },
  created() {
    this.$http
      .get('utils/get-weather')
      .then(response => {
        console.log(response.data.data)
        this.temp.temp = response.data.data.temp
        this.temp.humidity = response.data.data.humidity
      })
      .catch()

    // 检测当前屏幕的缩放比
    const size = this.detectZoom()
    if (size <= 100) {
      this.pagination.pagesize = 8
    } else if (size < 126) {
      this.pagination.pagesize = 5
    } else {
      this.pagination.pagesize = 3
    }

    this.getEquipmentClass()
    this.getEquipmentList()
  },
  methods: {
    getEquipmentDetails(item) {
      this.$http
        .get('admin/equipment', {
          params: {
            id: item.id
          }
        })
        .then(response => {
          this.equipmentInfo = response.data.data
          this.equipmentDetailsVisible = true
        })
        .catch(error => {
          return this.$message.error(error.$message)
        })
    },
    getEquipmentClass() {
      this.$http
        .get('admin/equipment-class')
        .then(response => {
          this.eclass = response.data.data
          // 需要处理下格式（坑！！！ 默认绑定的是 value，如果要指定 Array 里的对象的属性，要使用 value-key 绑定属性名）
          const temp = []
          for (const item of this.eclass) {
            temp.push({ value: item })
          }
          this.eclass = temp
        })
        .catch()
    },
    cancel() {
      // 先清空表单
      this.searchform = {
        usingUnit: '',
        ename: '',
        etype: '',
        eclass: '',
        egrade: '',
        state: ''
      }
      // 点击取消就重新拉取数据
      this.getEquipmentList()
    },
    getEquipmentList() {
      this.$http
        .get('admin/equipment-list')
        .then(response => {
          this.equipments = response.data.data
          // 格式化一下数据
          for (const item of this.equipments) {
            if (item.state === 1) {
              item.eweightGrade = 0
            }

            if (item.egrade === 1) {
              item.egrade = 'E 级（无需管理）'
            } else if (item.egrade === 2) {
              item.egrade = 'D 级'
            } else if (item.egrade === 3) {
              item.egrade = 'C 级'
            } else if (item.egrade === 4) {
              item.egrade = 'B 级'
            } else if (item.egrade === 5) {
              item.egrade = 'A 级（重点关注）'
            }
          }
          this.pagination.total = this.equipments.length
        })
        .catch()
    },
    search() {
      if (
        this.searchform.usingUnit === '' &&
        this.searchform.ename === '' &&
        this.searchform.etype === '' &&
        this.searchform.eclass === '' &&
        this.searchform.egrade === '' &&
        this.searchform.state === ''
      ) {
        return this.$message.error('搜索不能全为空')
      }
      this.$http
        .get('admin/search-equipment', {
          params: {
            usingUnit: this.searchform.usingUnit,
            ename: this.searchform.ename,
            etype: this.searchform.etype,
            eclass: this.searchform.eclass,
            egrade: this.searchform.egrade,
            state: this.searchform.state
          }
        })
        .then(response => {
          this.equipments = response.data.data
          this.pagination.total = this.equipments.length
        })
        .catch(error => {
          return this.$message.error(error.$message)
        })
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
    }
  }
}
</script>

<style lang='less' scoped>
.user-box {
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.searchform {
  padding-left: 30px;
  padding-right: 10px;
  padding-top: 20px;
  .head_button {
    width: 200px;
    text-align: center;
    top: 40px;
    position: relative;
  }
}

.cutTheme {
  position: fixed;
  top: 16%;
  left: 89%;
  z-index: 10;

  /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #c1d730;
    border-color: #c1d730;
    box-shadow: -1px 0 0 0#c1d730;
  }

  /deep/.el-radio-button__inner:hover {
    color: #c1d730;
  }
}

.weather {
  position: fixed;
  top: 82%;
  left: 15%;
}
</style>
