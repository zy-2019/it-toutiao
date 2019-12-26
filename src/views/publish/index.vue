<template>
    <el-card v-loading='loading'>

        <!-- 面包屑组件>>>>>>>>>>>>>>>>显示当前页面的路径，快速返回之前的任意页面 -->
        <bread-crumb slot="header">
            <template slot="title">
                发布文章
            </template>
        </bread-crumb>

        <!-- 页面结构搭建 -->
        <el-form style="margin-left:15px" label-width="100px" ref="publishForm" :model="formData" :rules="publishRules">

            <el-form-item label="标题" prop="title">
                <el-input placeholder="请输入标题" style="width:60%" v-model="formData.title"></el-input>
            </el-form-item>
    <!-- --------------------------------------------------------------------- -->
            <el-form-item label="内容" prop="content" >

                <quill-editor v-model="formData.content" style="height:300px">

                </quill-editor>

            </el-form-item>
    <!-- ---------------------------------------------------------------------- -->
            <el-form-item label="封面" prop="cover" style="margin-top:120px">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <!-- {{formData.cover}} -->
            </el-form-item>

            <cover-image :list='formData.cover.images'>
                <!-- 这里是一个封面组件 -->
            </cover-image>
    <!-- ------------------------------------------------------------------------- -->
            <el-form-item label="频道" prop="channel_id">
                <el-select v-model="formData.channel_id">
                    <!-- 根据elementUI对应的规则 id是存储值  name是显示值 -->
                    <el-option v-for='item in channels' :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
    <!-- ------------------------------------------------------------------------- -->
            <el-form-item>
                <el-button type="primary" @click="publishArticles()">发布文章</el-button>
                <!-- @click="publishArticles()  不传参会默认false -->
                <el-button @click="publishArticles(true)">存入草稿</el-button>
            </el-form-item>

        </el-form>

    </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [], // 定义接收频道数据

      // 表单校验和校验规则绑定  在每一项里边需要v-model双向进行绑定
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        // 文章封面类型 -1:自动，0-无图，1-1张，3-3张
        cover: {
          type: 0, // 默认先给个0

          images: [] // 放制封面地址的数组
        },
        channel_id: null // 文章所属频道id  先给个null
      },

      //   自动校验规则  title  content  channel_id   是必填项  prop是要校验的字段名
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空' }, {
          min: 5,
          man: 25,
          message: '标题的长度在5到25个字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  watch: {
    // 监听$route来判断是修改页面还是发布页面   vue.js文档里查看
    $route: function (to, from) {
      if (to.params.articleId) {
        //   是修改页面
      } else {
        // 是发布页面的话  就要清空内容  把上面定义的拉下来
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          // 文章封面类型 -1:自动，0-无图，1-1张，3-3张
          cover: {
            type: 0, // 默认先给个0

            images: [] // 放封面地址的数组
          },
          channel_id: null
        }
      }
    },

    // 监听封面类型的改变
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = [] // 无图或者是自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三图
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },

    // 点击手动校验表单方法   ===>  成功后发布到文章或草稿  ===>通过articleId判断是发布还是修改页面
    publishArticles (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          // 要先判断是发布还是修改页面

          let { articleId } = this.$route.params //   获取动态路由参数

          this.$axios({

            url: articleId ? `/articles/${articleId}` : '/articles',

            method: articleId ? 'put' : 'post',

            params: { draft }, // 查询参数

            data: this.formData // 请求体参数

          }).then(res => {
            // 这里是根据elementUI来提示的
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })
        }
      })
    },

    // 通过id查询文章数据的方法
    getArticleId (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.loading = false
        this.formData = res.data // 将数据赋值给formData
      })
    }
  },
  created () {
    this.getChannels() // 加载频道数据的方法

    let { articleId } = this.$route.params // 获取动态路由参数

    articleId && this.getArticleId(articleId) // 先判断有没有ArtialeId   用的是且方法  如果有直接获取文章数据 在传入参数
  }
}
</script>

<style>

</style>
