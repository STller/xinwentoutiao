<template>
   <!-- bread-crumb是一个普通组件 -->
   <!-- separator 定义分隔符 -->
    <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">评论列表</a></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
