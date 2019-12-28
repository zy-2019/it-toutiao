<template>
    <el-card v-loading='loading'>
        <bread-crumb slot="header">
            <template slot="title">账户信息</template>
        </bread-crumb>
<!-- ------------------------------------------------------------------- -->
        <el-form label-width="100px" ref="myForm" style="margin-left:10px" :model="formData" :rules="rules">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="formData.name" style="width:40%"></el-input>
            </el-form-item>
<!-- ------------------------------------------------------------------- -->
            <el-form-item label="简介" prop="intro">
                <el-input v-model="formData.intro" style="width:40%"></el-input>
            </el-form-item >
<!-- -------------------------------------------------------------------- -->
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email" style="width:40%"></el-input>
            </el-form-item>
<!-- ---------------------------------------------------------------------- -->
            <el-form-item label="手机号">
                <el-input v-model="formData.mobile" disabled style="width:40%"></el-input>
            </el-form-item>
<!-- --------------------------------------------------------------------- -->
            <el-form-item>
                <el-button type="primary" @click="saveUserImg">保存信息</el-button>
            </el-form-item>
        </el-form>
<!-- ------------------------------------------------------------------------- -->

        <!-- 上传组件 -->

        <el-upload  class="uploadImg" action="" :http-request="uploadImg" :show-file-list="false">
            <img :src="formData.photo ? formData.photo : defaultImg" alt="">
        </el-upload>

    </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      formData: {
        id: '',
        name: '',
        intro: '',
        photo: '', // 用户头像
        email: '',
        mobile: ''
      },
      defaultImg: require('../../assets/img/header.png'),
      // 编辑用户信息   自动校验表单
      rules: {
        name: [{ required: true, message: '请输入正确的用户名' }, { min: 3, max: 5, message: '用户名长度在3到5字符' }],
        intro: [{ required: true, message: '请输入简介' }],
        email: [{ required: true, message: '请输入邮箱号' }, { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱号格式错误' }]
      }
    }
  },
  methods: {

    // 上传用户头像

    uploadImg (params) {
      this.loading = true // 打开loading加载
      let data = new FormData()
      data.append('photo', params.file)

      // 调用编辑用户头像接口
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false // 关闭loading加载
        this.formData.photo = res.data.photo
        this.$message({
          type: 'success',
          message: '用户头像修改成功'
        })
        // 开启触发监听事件 认为保存成功=>通知header组件  同步头像更新
        eventBus.$emit('updateUserInfo')
      })
    },

    // 点击保存按钮手动校验用户信息以及成功后调用接口修改信息的function
    saveUserImg () {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          // 调用保存接口
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(res => {
            // this.formData = res.data    // 没有phone的返回值所以不能全部取
            // 提示消息
            this.$message({
              type: 'success',
              message: '保存成功'
            })

            // 开启触发监听事件 认为保存成功=>通知header组件  同步头像更新
            eventBus.$emit('updateUserInfo')
          })
        }
      })
    },

    // 获取用户信息的方法
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
            border-radius: 20%
        }
    }
</style>
