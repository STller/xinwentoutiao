<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 表单账户信息 -->
    <!-- ref之前不要加: -->
    <el-form
      :model="formData"
      :rules="accountRules"
      ref="accountForm"
      label-width="100px"
      style="margin-left:20px"
    >
      <el-form-item prop="name" label="用户名">
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveUser" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload :http-request="uploadImg" action :show-file-list="false">
      <img class="head-img" :src="formData.photo?formData.photo:''" alt />
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      defaultImg: require('../../assets/img/404.png'),
      accountRules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名请控制在1～7字符之间' }
        ],
        email: [{ required: true, message: '邮箱不能为空' }]
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then((results) => {
        // 将成功上传的头像更新给页面数据
        this.formData.photo = results.data.data.photo
      })
    },
    // 保存用户个人信息
    saveUser () {
      this.$refs.accountForm.validate(isOk => {
        if (isOk) {
          // 调用修改资料接口
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            // 若成功 提示消息
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(results => {
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
.head-img {
  position: absolute;
  left: 700px;
  top: 150px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
