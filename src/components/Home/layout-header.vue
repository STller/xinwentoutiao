<template>
    <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="20">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="4">
            <!-- 用户头像 -->
            <img style="vertical-align:middle;width:50px" :src="userInfo.photo" alt="">
            <!-- 下拉菜单组件 -->
            <el-dropdown trigger="click">
                <!-- 匿名插槽  -->
                <span >
                {{userInfo.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 具名插槽 dropdown -->
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >个人信息</el-dropdown-item>
                    <el-dropdown-item >git地址</el-dropdown-item>
                    <el-dropdown-item >退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 个人信息对象
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      let token = window.localStorage.getItem('user-token') // 从前端缓存中获取token
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` } // 请求参数
      }).then(result => {
        this.userInfo = result.data.data // 接收数据对象
        console.log(this.userInfo)
      })
    }
  },
  // 钩子函数
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less">

</style>
