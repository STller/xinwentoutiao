<template>
    <el-card>
    <!-- 内容列表 -->
        <bread-crumb slot="header">
            <template slot="title">
                内容列表
            </template>
        </bread-crumb>
        <!-- 表单 -->
        <el-form style="magin-left:50px">
            <el-form-item label="文章状态"></el-form-item>
            <el-form-item label="频道列表"></el-form-item>
            <el-form-item label="时间选择"></el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   获取文章列表
    getArticles () {
      this.$axios({
        url: '/articles',
        method: 'get'
      }).then((result) => {
        this.list = result.data.data.results
      })
    }
  }
}
</script>

<style>

</style>
