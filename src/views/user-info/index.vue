<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">账户信息</template>
        </bread-crumb>
<!-- ------------------------------------------------------------------- -->
        <el-form label-width="100px" style="margin-left:10px">
            <el-form-item label="用户名">
                <el-input v-model="formData.name" style="width:40%"></el-input>
            </el-form-item>
<!-- ------------------------------------------------------------------- -->
            <el-form-item label="简介">
                <el-input v-model="formData.intro" style="width:40%"></el-input>
            </el-form-item >
<!-- -------------------------------------------------------------------- -->
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" style="width:40%"></el-input>
            </el-form-item>
<!-- ---------------------------------------------------------------------- -->
            <el-form-item label="手机号">
                <el-input v-model="formData.mobile" disabled style="width:40%"></el-input>
            </el-form-item>
<!-- --------------------------------------------------------------------- -->
            <el-form-item>
                <el-button type="primary">保存信息</el-button>
            </el-form-item>
        </el-form>
<!-- ------------------------------------------------------------------------- -->

        <!-- 上传组件 -->

        <el-upload  class="uploadImg" :http-request="uploadImg" :show-file-list="false">
            <img :src="formData.photo ? formData.photo : defaultImg" alt="">
        </el-upload>

    </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        id: '',
        name: '',
        intro: '',
        photo: '', // 用户头像
        email: '',
        mobile: ''
      },
      defaultImg: require('../../assets/img/header.png')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
    .uploadImg{
        position: absolute;
        top: 200px;
        right: 300px;
        img {
            width: 100px;
            height: 100px;
            border-radius: 40%
        }
    }
</style>
