<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form
      ref="publishForm"
      :rules="publishRules"
      :model="formData"
      label-width="100px"
      style="margin-left:0px"
    >
      <!-- 表单 -->
      <!-- 标题部分 -->
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:300px"></el-input>
      </el-form-item>
      <!-- 内容部分 -->
      <el-form-item prop="content" label="内容">
        <quill-editor
          style="height:200px"
          v-model="formData.content"
          placeholder="请输入内容"
          :rows="5"
          type="textarea"
        ></quill-editor>
      </el-form-item>
      <!-- 封面部分 -->
      <el-form-item style="margin-top:100px" prop="cover" label="封面">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- 封面组件 -->
        <!-- 子组件cover-img获取父组件的值 -->
        <!-- 给谁传就在谁标签上写属性 -->
        <!-- 传递父组件的images到子组件 -->

        <!-- 这里子组件传来了图片的地址数据 接收它！！！！ -->
        <cover-img @selectImg='changImg' :images='formData.cover.images'></cover-img>

      </el-form-item>
      <!-- 频道部分 -->
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option :value="item.id" :label="item.name" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 发布文章与存入草稿 按钮 -->
      <el-form-item>
        <el-button @click="publish(false)" type="primary">发布文章</el-button>
        <el-button @click="publish(true)" type="warning">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [],
      // 表单数据对象
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // -1自动 0无图 1单图 3三图
          images: [] // params的格式一定要按照接口文档的要求来
        },
        channel_id: null
      },
      publishRules: {
        // 发布规则
        title: [
          { required: true, message: '标题不能为空' },
          // 如果当前数据类型是字符串 minmax代表长度
          // 如果当前数据类型是数值 minmax代表最大最小值
          { min: 5, max: 30, message: '长度请控制在5～30！' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    changImg (url, index) {
      // 接收从子组件传来的值
      // 数据经历了两层传递 更改 images 的数据
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        return index === i ? url : item
      })
    },
    // radio类型改变事件
    changeType () {
    //   alert(this.formData.cover.type) // 显示当前radio-type选项
      if (this.formData.cover.type === 1) {
        // 当type为1 图片数组有一个
        // image地址不能是本地的图片
        this.formData.cover.images = ['http://toutiao.meiduo.site/FmavYB5dTWpnf3X8Uo5eBdK7BRMW']
      } else if (this.formData.cover.type === 3) {
        // 当type为3 图片数组有三个
        this.formData.cover.images = ['', '', '']
      } else {
        //   否则图拼啊数组没有值
        this.formData.cover.images = []
      }
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // debugger
        this.channels = result.data.data.channels
      })
    },
    // 发布文章 validate
    publish (status) {
      // 发布文章时候判断是修改还是新增 条件就是有没有articleID
      this.$refs.publishForm.validate(isOk => {
        let { articleId } = this.$route.params
        this.$axios({
          params: { status },
          data: this.formData,
          url: articleId ? `/articles/${articleId}` : '/articles',
          method: articleId ? 'put' : 'post' // articleId存在就是修改文章 不存在就是发布新文章
        }).then(() => {
          this.$router.push('/home/articles')
        })
      })
    },
    getArticleById (id) {
      this.loading = true
      this.$axios({
        url: `/articles/${id}`
      }).then(results => {
        // 通过debugger查看返回的数据格式来获取值！！！！！！！！！！！！！
        this.formData = results.data.data
        this.loading = false
      })
    }
  },
  created () {
    this.getChannels()
    // 获取文章的ID 解构赋值
    // 有就是编辑文章 没有 就是新增文章
    let { articleId } = this.$route.params

    // 如果articleId存在 则执行后边的逻辑
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
