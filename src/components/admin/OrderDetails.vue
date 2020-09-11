<template>
    <div>
        {{res.contacts}}
    </div>
</template>

<script>
    export default {
        data() {
             return {
                 res: []
             }
        },
         created() {
            this.getDetails()
        },
        methods: {
            getDetails() {
            const that = this
            async function see() {
            await that.$http
            .get('admin/order', that.fixTableId)
            .then((response) => {
                // console.log(response)
                if (response.data.code !== 200) return that.$message.error('进入详情')
                that.$message.success('进入失败')
                that.res = response.data.data
                console.log(that.res)
            })
            }
            see()
            }
        },
        props: ['fixTableId']
    }
</script>

<style scoped>

</style>
