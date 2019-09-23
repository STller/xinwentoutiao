<template>
  <el-card>
    <!-- 内容列表 -->
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 表单 -->
    {{radio}}   {{select}}  {{value1}}
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态:">
        <!-- 绑定的值radio接收 el-radio 传进来的值 -->
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">草稿</el-radio>
          <el-radio :label="3">待审核</el-radio>
          <el-radio :label="4">审核通过</el-radio>
          <el-radio :label="5">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select v-model="select">
          <!-- 显示值是abc 返回的值是123 -->
          <el-option value="123" label="abc"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <!-- 时间段 ele组件 -->
        <!-- v-model value1是时间段数组 -->
        <el-date-picker
          v-model="value1"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      radio: 0,
      list: [],
      channels: [], // 定义一个频道数组
      value1: ''
    }
  },
  methods: {
    //   获取文章列表
    getArticles () {
      this.$axios({
        url: '/articles',
        method: 'get'
      }).then(result => {
        this.list = result.data.data.results
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
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
