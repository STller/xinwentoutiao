<template>
  <el-card>
    <!-- 内容列表 -->
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 表单 -->
    {{formData.data}}
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态:">
        <!-- 绑定的值radio接收 el-radio 传进来的值 -->
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <!-- formData的值已经改变了 el-select可直接调用同一个changecondition方法 -->
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <!-- 显示值是abc 返回的值是123 -->
          <el-option v-for="item of channels" :value="item.id" :label="item.name" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <!-- 时间段 ele组件 -->
        <!-- v-model value1是时间段数组 -->
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.data"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div style="border-bottom:1px solid #ccc;height:40px;line-height:40px">已为您找到{{page.total}}条数据</div>
    <!-- 初始化一行静态数据 -->
    <div class="article-item" v-for="(item,index) of list" :key="index">
      <!-- 一行数据的左侧 -->
      <div class="left">
        <!-- 动态属性加  ':'  -->
        <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag
            :type="item.status | statusType"
            style="width:80px;text-align:center"
          >{{item.status | statusText}}</el-tag>
          <span>{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 一行数据的右侧 -->
      <div class="right">
        <!-- 修改文章 -->
        <el-tag @click="goEdit(item.id)" class="el-icon-edit" type="info" style="margin-right:10px;cursor:pointer">修改</el-tag>
        <!-- 删除文章 -->
        <el-tag style="cursor:pointer" @click="deleteArticles(item.id)" class="el-icon-delete" type="danger">删除</el-tag>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="changePage"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        style="margin-top:10px"
        background
        layout="prev,pager,next"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  filters: {
    //   定义一个过滤器处理显示文章状态
    // 第一个参数永远是前面传过来的值
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 处理状态的颜色显示样式
    // value 永远是前面参数传过来的值 处理了之后再传给后边的过滤器
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  },
  data () {
    return {
      select: '',
      radio: 0, // 文章状态
      list: [],
      channels: [], // 定义一个频道数组
      value1: '',
      defaultImg: require('../../assets/img/404.png'),
      formData: {
        // 文章状态查询数组
        status: 5,
        channel_id: null,
        data: []
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 编辑文章
    goEdit (id) {
      // id是bignumber类型
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        method: 'get',
        params
      }).then(result => {
        this.list = result.data.data.results
        this.page.total = result.data.data.total_count // 将获取的总页数赋予page·total
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
    // 文章删除
    deleteArticles (id) {
      this.$confirm('确定？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`, // id 为大数类型 要想正常使用 要转成字符串类型
          method: 'delete'
        }).then(() => {
          // 重新查询
          this.queryArticles()
        })
      })
    },
    changePage (newPage) {
      // 分页时要携带条件
      this.page.currentPage = newPage
      this.queryArticles()
    },
    changeCondition () {
      //   debugger
      // 状态变化事件监听 el-form一改变就触发 值改变时去搜索
      //   this.formData.data(!!!!!!!!是data不是date！！！！！！！！)
      this.page.currentPage = 1
      this.queryArticles()
    },
    queryArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.data.length ? this.formData.data[0] : null,
        end_pubdate:
          this.formData.data.length > 1 ? this.formData.data[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px slolid #f2f3f4;
  .left {
    display: flex;
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-around;
    }
    img {
      width: 180px;
      height: 100px;
      border-radius: 10px;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>
