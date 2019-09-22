<template>
<!-- 二级路由 挂载一级路由下 -->
  <el-card>
    <!-- 面包屑 -->
      <!-- 面包屑 头部 -->
      <bread-crumb slot="header">
        <!-- 面包屑 标题 -->
        <template slot='title'>
          评论列表
        </template>
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

          <el-table-column label="操作" prop="fans_comment_count">
            <template slot-scope="obj">
              <el-button type="text">修改</el-button>
              <!-- 根据其他列的状态 设置关闭评论 还是打开评论 -->
              <el-button :style="{color:obj.row.comment_status?'#409EFF':'#F56C6C'}" @click="closeOrOpen(obj.row)" type="text">
                {{
                  obj.row.comment_status?"关闭评论":"打开评论"
                }}
              </el-button>
            </template>
          </el-table-column>
      </el-table>
      <!-- el-row布局组件 -->
      <el-row type="flex" justify="center" style="margin-top:10px">
        <!-- 分页的页面结构 -->
        <!-- 分多少页 当前第几页 -->
        <!-- total：接收记录总条数 -->
        <!-- currentPage：当前页数 -->
        <!-- pageSize：每页多少条数据 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">

        </el-pagination>
      </el-row>
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
    },
    closeOrOpen (row) {
      this.$axios({
        url: '/comments/status',
        method: 'PUT',
        params: { article_id: row.id.toString() }, // 传回的ID是大数类型 需要转成String类型
        data: { allow_comment: !row.comment_status }
      }).then(() => {
        this.getComment()
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
