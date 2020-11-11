<template>
  <div class="user-box">
    <div>
      <div class="addMessage">
        <el-button @click="dialogVisible = true" type="primary" round>
          发布公告
        </el-button>
      </div>

      <el-card
        v-for="(item, index) in messageList.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="index"
        @click.native="messageDetailsPage(item)"
      >
        <div class="top">
          <span class="messageId">{{ item.messageId }}</span>
          <span class="createDate">{{ item.createDate }}</span>
        </div>
        <hr />
        <div class="item">
          <span>管理员ID：</span>
          <span class="messageStr">{{ item.adminId }}</span>
        </div>
        <div class="item">
          <span>消息：</span>
          <span class="messageStr">{{ item.messageStr }}</span>
        </div>
      </el-card>
      <!-- 显示消息 -->
      <el-dialog title="消息内容" :visible.sync="messageVisible" width="70%">
        <div class="message_title">
          <table>
            <tr>
              <td>
                <div class="name">发布人：{{ adminName }}</div>
              </td>
              <td rowspan="2">
                <div class="messageId">{{ messageObj.messageId }}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="createDate">
                  发布时间：{{ messageObj.createDate }}
                </div>
              </td>
            </tr>
          </table>
        </div>
        <hr />
        <div class="in-messageStr">
          {{ messageObj.messageStr }}
        </div>
      </el-dialog>

      <!-- 大表格分页 -->
      <div class="pagination-block">
        <el-pagination
          :page-size="pagesize"
          @current-change="current_change"
          layout="prev, pager, next, total"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 发布消息 -->
      <el-dialog title="发布消息" :visible.sync="dialogVisible" width="50%">
        <el-form ref="rules" :rules="rules" :model="form">
          <el-form-item prop="desc">
            <div>消息内容</div>
            <el-input
              type="textarea"
              v-model="form.desc"
              maxlength="1000"
              :rows="15"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="
                onSubmit()
                dialogVisible = false
              "
            >
              立即创建
            </el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getMessage()
  },
  data() {
    return {
      // 分页数据
      total: 0,
      pagesize: 9,
      currentPage: 1,
      dialogVisible: false,
      messageVisible: false,
      messageList: [],
      adminName: '',
      messageObj: {},
      form: {
        desc: ''
      },
      rules: {
        desc: [
          { required: true, message: '不要空着噢', trigger: 'blur' },
          {
            min: 10,
            max: 1000,
            message: '长度在 10 到 1000 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 翻页函数
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    // 获取消息
    getMessage() {
      this.$http
        .get('admin/message-list')
        .then(response => {
          this.messageList = response.data.data
          this.total = this.messageList.length
          for (const item of this.messageList) {
            item.createDate = this.getLocalTime(item.createDate)
          }
          this.messageList.reverse()
        })
        .catch(error => {
          return this.$message.error(error.$message)
        })
    },
    messageDetailsPage(item) {
      console.log(item)

      this.$http
        .get('admin/get-admin-name', {
          params: {
            workId: item.adminId
          }
        })
        .then(res => {
          this.adminName = res.data.data
        })
        .catch(() => {
          this.$message.error('查看失败')
        })

      this.$http
        .get('admin/message', {
          params: {
            messageId: item.messageId
          }
        })
        .then(res => {
          this.messageObj = res.data.data
          this.messageVisible = true
        })
        .catch(() => {
          this.$message.error('查看失败')
        })
    },
    onSubmit() {
      this.$refs.rules.validate(validate => {
        if (!validate) {
          return this.$message.error('请把信息填写完整！')
        }
        this.$http
          .post('admin/message', {
            message: this.form.desc
          })
          .then(response => {
            this.$message.success('发布消息成功')
            location.reload()
          })
          .catch(() => {
            return this.$message.error('字数太长了')
          })
      })
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

.user-box_header {
  border-radius: 20px 50px 50px 0;
  width: 30%;
  padding-bottom: 50px;
  background-image: linear-gradient(40deg, #c9d463, #dae47d);
  box-shadow: 0 3px 3px rgba(56, 56, 56, 0.397);
  position: fixed;
  height: 30px;
  z-index: 10;
  .title {
    position: absolute;
    bottom: 50%;
    left: 5%;
    transform: translate(0, 50%);
    font-size: 30px;
    color: white;
  }
}
.addMessage {
  position: fixed;
  left: 92%;
  top: 88%;
  .el-button {
    position: absolute;
    left: 95%;
    transform: translate(-100%, 50%);
  }

  .el-button--primary {
    background-color: #c1d730;
    border-color: #c1d730;
  }

  .el-button--primary:hover {
    background-color: #c2db1b;
  }
}

.top {
  width: 100%;
  position: relative;
  margin-top: 8px;
  font-weight: bold;
  color: rgb(129, 129, 129);
  .messageId {
    font-size: 30px;
  }
  .createDate {
    float: right;
    color: silver;
    font-size: 10px;
  }
}

.message_title {
  width: 100%;
  position: relative;
  margin-top: 8px;
  margin-bottom: 20px;
  font-weight: bold;
  color: rgb(129, 129, 129);
  table {
    width: 100%;
  }
  .messageId {
    font-size: 50px;
  }

  .name {
    margin-bottom: 10px;
  }

  .createDate {
    margin-top: 8px;
    color: silver;
    font-size: 10px;
  }
}

.in-messageStr {
  color: #535353;
  margin-bottom: 10px;
}

.item {
  width: 100%;
  margin-bottom: 10px;
  span:first-child {
    font-size: 15px;
    margin-top: 8px;
    font-weight: bold;
    color: rgb(129, 129, 129);
  }

  span:last-child {
    float: right;
    color: #9d9d9d;
    margin-bottom: 10px;
  }
}

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
</style>
