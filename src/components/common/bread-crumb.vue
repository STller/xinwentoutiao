<template>
   <!-- bread-crumb是一个普通组件 -->
   <!-- separator 定义分隔符 -->
    <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <!-- 面包屑组件 定义一个具名插槽 定义name属性为title -->
            <slot name="title"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
