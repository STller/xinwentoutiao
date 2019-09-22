<template>
  <!-- 外边布局 卡片 -->
  <el-card>
    <!-- 内部是面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane @click="getMaterial" label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <!-- src一定要前面加 ":" -->
            <img :src="item.url">
            <div class="operate">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane @click="getMaterial" label="收藏素材" name="collect"></el-tab-pane>
    </el-tabs>
  </template>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中 all 标签
      list: []
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: false }
      }).then((result) => {
        // debugger
        this.list = result.data.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
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
