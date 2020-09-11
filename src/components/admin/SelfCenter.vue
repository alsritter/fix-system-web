<template>
    <div class="InfoBox">
        <img src="" alt="">
        <el-input v-model="input" placeholder="添加电话" class="phone"></el-input>
    <el-radio v-model="radio7" label="1" border>备选项1</el-radio>
    <el-radio v-model="radio7" label="2" border>备选项2</el-radio>
    <el-button type="primary" @click="saveChanges">保存修改<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<script>
    export default {
    data () {
      return {
        radio7: '1',
        input: ''
      }
    },
    methods: {
        saveChanges() {
            const that = this
        async function sentChanges() {
            await that.$http
            .patch('admin/user', {
                params: {
                radio7: that.radio7,
                input: that.input
                }
            })
            .then((response) => {
                if (response.data.code === 200) return that.$message.success('上传成功')
                that.$message.success('上传失败')
            })
            }
            sentChanges()
        }
    }
    }
</script>

<style scoped>
#p {
    margin-top: 0;
}
</style>
