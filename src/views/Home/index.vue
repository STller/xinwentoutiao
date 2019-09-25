<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 左边栏 -->
    <el-aside class="el-aside" width="200px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container style="background-color:#f1f1f1">
      <!-- 头部 -->
      <el-header style="padding:0">
        <layout-header style="background-color:#ffffff;padding:0 20px"></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main style="padding:0">
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
}
</script>

<style scoped>
.el-aside{
  background-color: #323745;
}
</style>
