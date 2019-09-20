<template>
    <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="21">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3">
            <!-- 用户头像 -->
            <img style="vertical-align:middle" src="../../assets/img/avatar.jpg" alt="">
            <!-- 下拉菜单组件 -->
            <el-dropdown trigger="click">
                <!-- 匿名插槽  -->
                <span >
                83期同学
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

}
</script>

<style lang="less">

</style>
