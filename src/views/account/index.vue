<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 表单账户信息 -->
    <el-form label-width="100px" style="margin-left:20px">
        <el-form-item label='用户名'>
            <el-input v-model="formData.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label='简介'>
            <el-input v-model="formData.intro" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label='邮箱'>
            <el-input v-model="formData.email" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label='手机号'>
            <el-input disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">保存信息</el-button>
        </el-form-item>
    </el-form>
    <img class="head-img" :src="formData.photo?formData.photo:''" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      defaultImg: require('../../assets/img/404.png')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then((results) => {
        this.formData = results.data.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-img{
    position: absolute;
    left: 700px;
    top: 150px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
</style>
