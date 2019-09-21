<template>
  <div class="login">
    <el-card class="el-card">
        <img src="../../assets/img/logo_index.png" alt="">
      <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree" :checked="false">我已阅读并同意用户协议和条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: { // 表单数据
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginRules: { // 登录规则集合对象
        // 决定校验规则 key（要校验的字段名）：value（数组）
        // required 表示该字段必填 如果不填 就会提示消息
        // 对象数组 一个对象就是一个校验规则
        // mobile 是规则名
        mobile: [
          { required: true, message: '请输入手机号！' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          // 两个规则
          { required: true, message: '请输入验证码！' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }
        ],
        agree: [
          { validator: function (rule, value, callBack) {
            if (value) {
              // 用户勾选了协议
              callBack()
            } else {
              // 用户没有勾选协议
              callBack(new Error('需同意协议！'))
            }
          } }
        ]
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单的规则
      // validate是一个方法 方法中传入的是一个回调函数
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          console.log('校验成功')
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          }).then(result => {
            console.log(result)
            window.localStorage.setItem('user-token', result.data.data.token) // 将后台返回的token令牌存储到前端缓存中
            this.$router.push('/home') // 跳转地址
          }) // 这里没写catch 在axios config中已经处理了错误
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
// scoped 默认让css文件 只对所在的vue起作用
// 添加lang='less' 就可以用less 写css了
.login{
  background-image: url('../../assets/img/login_bg.jpg');
  /* vh将屏幕的垂直高度分成100份 */
  width: 100%;
  height: 100vh;
  /* 自适应屏幕 */
  background-size: cover;
  display:flex;
  justify-content: center;
  // 垂直居中
  align-items: center;
  .el-card{
    width: 400px;
    height: 330px;
        img{
          display: block;
          width: 200px;
          margin: 0 auto;
        }
  }
}
</style>
