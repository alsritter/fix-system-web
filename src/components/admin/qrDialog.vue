<template>
  <el-dialog
    width="240px"
    title="设备二维码"
    :visible.sync="qrVisible"
    @close="closeCode"
    :close-on-click-modal="false"
  >
    <div id="paycode">
      <!-- 放置二维码的容器,需要给一个ref -->
      <div id="qrcode" ref="qrcode"></div>
    </div>
  </el-dialog>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      qrVisible: false,
      qrcode: ''
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    qrText: {
      type: String
    }
  },
  watch: {
    visible() {
      this.qrVisible = this.visible
      if (this.qrVisible) {
        console.log(this.qrText)
        this.$nextTick(() => {
          this.crateQrcode()
        })
      }
    },
    qrText() {}
  },
  methods: {
    // 生成二维码
    crateQrcode() {
      this.qrcode = new QRCode('qrcode', {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: this.qrText // 设置二维码内容或跳转地址
      })
    },
    // 关闭弹框,清除已经生成的二维码
    closeCode() {
      this.$refs.qrcode.innerHTML = ''
      this.$emit('visible-change', false)
    }
  },
  created() {
    this.$nextTick(() => {
      // this.qrcode()
    })
  }
}
</script>
<style lang='less' scoped>
/deep/ .el-dialog {
  border-radius: 10px;
}
</style>
