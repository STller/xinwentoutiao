<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 左边栏 -->
    <layout-aside>左侧内容</layout-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>头部</el-header>
      <!-- 主要区域 -->
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from '../../components/Home/layout-aside'
export default {
  components: {
    'layout-aside': LayoutAside
  }
}
</script>

<style>

</style>
