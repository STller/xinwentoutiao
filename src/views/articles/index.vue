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
      list: [],
      channels: [] // 定义一个频道数组
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
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.data.channels
      })
    },
    // 文章查询
    deleteArticles (id) {
      this.$confirm('确定？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`, // id 为大数类型 要想正常使用 要转成字符串类型
          method: 'delete'
        }).then(() => {
          // 重新查询

        })
      })
    }
  }
}
</script>

<style>

</style>
