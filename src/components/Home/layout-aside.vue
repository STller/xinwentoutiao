<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png">
    </div>
<!-- router为true 启动路由功能 -->
    <el-menu :router="true" active-text-color="#ffd04b" text-color="#adafb5" class="el-menu">
      <!-- 不带下拉列表 -->
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <!-- title插槽 -->
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 带下拉列表 -->
      <el-submenu index="2">
        <!-- title插槽 -->
        <!-- slot="title"等于是把该template当成是submenu的标题 -->
        <template slot="title">
          <i class="el-icon-document"></i>
          内容管理
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/gradata">图文数据</el-menu-item>
        <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanpic">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span slot="title" >账户信息</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-aside{
  width: 200px;
  height: 100vh;
  .el-menu{
    background-color: #353b4e;
    border-right: 0px solid #000;
  }
  .title{
    text-align: center;
    // margin-top: 20px;
  }
}

</style>
