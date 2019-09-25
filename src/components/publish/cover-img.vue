<template>
  <div class="cover-image">
      <!-- v-for生成封面的图片 -->
      <div class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
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
