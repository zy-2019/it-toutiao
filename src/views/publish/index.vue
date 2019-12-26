<template>
    <el-card>

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

                <el-input v-model="formData.content" type="textarea" :rows="4">

                </el-input>

            </el-form-item>
    <!-- ---------------------------------------------------------------------- -->
            <el-form-item label="封面" prop="cover">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
    <!-- ------------------------------------------------------------------------- -->
            <el-form-item label="频道" prop="channel_id">
                <el-select v-model="formData.channel_id">
                    <!-- 根据elementUI对应的规则 id是存储值  name是显示值 -->
                    <el-option v-for='item in channels' :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
    <!-- ------------------------------------------------------------------------- -->
            <el-form-item>
                <el-button type="primary" @click="publishArticles">发布文章</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>

        </el-form>

    </el-card>
</template>

<script>
export default {
  data () {
    return {
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
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },

    // 手动校验表单方法
    publishArticles () {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          console.log('校验通过')
        }
      })
    }
  },

  created () {
    this.getChannels() // 加载频道数据的方法
    // this.publishArticles()
  }

}
</script>

<style>

</style>
