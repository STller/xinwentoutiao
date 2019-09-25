<template>
  <div class="cover-image">
      <!-- v-for生成封面的图片 -->
      <div class="cover-item" v-for="(item,index) in images" :key="index">
          <img @click="openLayer(index)" :src="item?item:defaultImg" alt="">
      </div>
      <!-- 弹层组件 -->
      <el-dialog @close='dialogVisible = false' :visible="dialogVisible">
          <!-- 里面是素材内容 -->
          <!-- 只能在当前实例的模版上接收传来的数据 -->
        <select-img @selectOneImg='receiveImg'></select-img>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 是否显示弹层
      index: -1
    }
  },
  methods: {
    // 接收子组件传过来的值
    receiveImg (url) {
      this.$emit('selectImg', url, this.index) // 又是自定义事件 该url刚刚从子组件传过来 又要继续往上传··········
      this.dialogVisible = false
    },
    openLayer (index) {
      this.dialogVisible = true
      this.index = index
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
    .cover-item{
        border: 1px solid #cccccc;
        padding: 10px;
        width: 190px;
        height: 190px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
