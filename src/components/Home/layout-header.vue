<template>
    <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="20">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="4">
            <!-- 用户头像 -->
            <img style="vertical-align:middle;width:50px;border-radius:50%" :src="userInfo.photo" alt="">
            <!-- 下拉菜单组件 -->
            <!-- 注册command事件 -->
            <el-dropdown @command="commonClick" trigger="click">
                <!-- 匿名插槽  -->
                <span >
                {{userInfo.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 具名插槽 dropdown -->
                <el-dropdown-menu slot="dropdown">
                    <!-- command属性会在触发点击时 携带给command事件对应的方法 -->
                    <el-dropdown-item command="account">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="lgout">退出</el-dropdown-item>
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
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data.data // 接收数据对象
      })
    },
    commonClick (key) { // key是command属性携带回来的
      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        //   去项目的git地址
        window.location.href('https://github.com/STller/83heimatoutiao')
      } else if (key === 'lgout') {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  // 钩子函数
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>

</style>
