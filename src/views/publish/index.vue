<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" :rules="publishRules" :model="formData" label-width="50px" style="margin-left:100px">
      <!-- 表单 -->
      <!-- 标题部分 -->
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:300px"></el-input>
      </el-form-item>
      <!-- 内容部分 -->
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" placeholder="请输入内容" :rows="5" type="textarea"></el-input>
      </el-form-item>
      <!-- 封面部分 -->
      <el-form-item prop="cover" label="封面">
        <el-radio-group v-model="formData.cover.title">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道部分 -->
      <el-form-item prop="channel_id" v-model="formData.channel_id" label="频道">
        <el-select>
          <el-option :value="item.id" :label="item.name" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 发布文章与存入草稿 按钮 -->
      <el-form-item>
        <el-button @click="publish" type="primary">发布文章</el-button>
        <el-button type="info">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      // 表单数据对象
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // -1自动 0无图 1单图 3三图
          images: ''
        },
        channel_id: null
      },
      publishRules: { // 发布规则
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // debugger
        this.channels = result.data.data.channels
      })
    },
    // 发布文章 validate
    publish () {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {}
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
