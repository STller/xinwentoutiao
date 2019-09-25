<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form label-width="50px" style="margin-left:100px">
        <!-- 表单 -->
        <!-- 标题部分 -->
        <el-form-item label="标题">
            <el-input style="width:300px"></el-input>
        </el-form-item>
        <!-- 内容部分 -->
        <el-form-item label="内容">
            <el-input placeholder="请输入内容" :rows="5" type="textarea"></el-input>
        </el-form-item>
        <!-- 封面部分 -->
        <el-form-item label="封面">
            <el-radio-group>
                <el-radio>单选</el-radio>
                <el-radio>三图</el-radio>
                <el-radio>无图</el-radio>
                <el-radio>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 频道部分 -->
        <el-form-item label="频道">
            <el-select>

            </el-select>
        </el-form-item>
        <!-- 发布文章与存入草稿 按钮 -->
        <el-form-item>
            <el-button type="primary">发布文章</el-button>
            <el-button type="info">存入草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {}
</script>

<style>
</style>
