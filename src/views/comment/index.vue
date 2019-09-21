<template>
<!-- 二级路由 挂载一级路由下 -->
  <el-card>
      <bread-crumb slot="">
      </bread-crumb>
      <!-- el-table表格 -->
      <el-table :data="list">
          <!-- lable 定义该列表头名 -->
          <!-- prop 定义该列的字段名 -->
          <!-- 第一列 -->
          <el-table-column label="标题" prop="title"></el-table-column>
          <!-- 第二列 -->
          <!-- 解决评论状态不显示 -->
          <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>

          <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>

          <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>

          <el-table-column label="操作" prop="fans_comment_count"></el-table-column>
      </el-table>
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
    //   获取评论列表
    getComment () {
      this.$axios({
        url: ('/articles'),
        method: 'get',
        params: {
          response_type: 'comment'
        } // 路径参数 也就是query参数
      }).then((result) => {
        this.list = result.data.data.results
      })
    },
    formatter (row, column, cellValue, index) { // 类似过滤器 =》return
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
