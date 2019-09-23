<template>
  <!-- 外边布局 卡片 -->
  <el-card>
    <!-- 内部是面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-upload action="" :http-request="uploadImg" class="upload">
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <template>
    <el-tabs v-model="activeName" @tab-click="getMaterial">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <!-- src前面一定要加 ":" -->
            <img :src="item.url">
            <div class="operate">
              <!-- 收藏或者取消收藏功能 -->
              <i @click="collectOrCancel(item)" :style="{color:item.is_collected?'red':''}" class="el-icon-star-on"></i>
              <!-- 删除图片功能 -->
              <i @click="deleteImg(item.id)" class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="currentChange"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            :total="page.total">
          </el-pagination>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <!-- src前面一定要加 ":" -->
            <img :src="item.url">
            <div class="operate">
              <i @click="collectOrCancel(item)" :style="{color:item.is_collected?'red':''}" class="el-icon-star-on"></i>
              <i @click="deleteImg(item.id)" class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            :total="page.total">
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </template>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中 all 标签
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // 反正collect就是返回一个 true 或 false
        // 等于collect相当于找收藏的数据
        // 不等 相当于找全部的数据
        params: { collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.pageSize
        }
      }).then((result) => {
        // debugger
        this.list = result.data.data.results
        this.page.total = result.data.data.total_count
      })
    },
    currentChange (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    // 上传图片的方法
    uploadImg (date) { // 这里的date是自定义的 返回值的名字随意取
      // debugger
      const data = new FormData() // 声明新的表单
      data.append('image', date.file) // 通过设置 debugger 进入断点查看所发送的数据来确认要发送哪些数据
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: data
      }).then(() => {
        this.getMaterial()
      })
    },
    // 删除图片
    deleteImg (id) {
      // 删除前提问
      this.$confirm('删除图片？').then(() => {
        // 调接口删除图片
        this.$axios({
          url: `/user/images/${id}`, // :target 路由中:表示该参数是动态的，活动的值
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    // 收藏按钮
    collectOrCancel (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      }).then(() => {
        this.getMaterial()
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.upload{
  position: absolute;
  right: 20px;
  top: 120px;
}
.img-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-item{
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 6px;
    margin: 10px;
    .operate{
      position: absolute;
      background-color: #f4f5f6;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: space-around; // 水平排列位置
      align-items: center; // 垂直居中
    }
    img{
      width: 100%;
    }
  }
}
</style>
