<template>
  <!-- 弹层显示的组件 -->
  <!-- 我是弹层内容 -->
  <!-- 页签组件 -->
  <el-tabs>
    <el-tab-pane label="素材库">
      <div class="imgs-list">
        <el-card v-for="(item,index) in list" :key="index">
          <!-- item.url是动态变化的值src要加上:号 -->
          <img @click="clickImg(item.url)" :src="item.url" />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片">
      <el-upload
        class="avatar-uploader"
        action=""
        :http-request="uploadImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">

        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      // 全部素材
      list: [],
      //   分页组件用
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    // 上传用户素材
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then((result) => {
        this.$emit('selectOneImg', result.data.data.url)
      })
    },
    // 点击素材图片时传过来item
    // 子组件给父组件传值
    // $emit 自定义事件
    clickImg (url, index) {
      // 自己写自定义事件的名称 这里起名为selectOneImg
      // 后面跟着若干参数
      this.$emit('selectOneImg', url, index)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg() // 重新调取图片
    },
    getAllImg () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.data.results
        // debugger
        this.page.total = result.data.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.imgs-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
    // margin: 20px;
  }
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>
