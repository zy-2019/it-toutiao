<template>
  <div class="login">
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>

      <!-- 这里放一个表单 -->
      <el-form :model='loginForm' :rules="loginRulus" ref="test">
<!-- --------------------------------------------------------------------- -->
        <el-form-item prop="mobile">
          <!-- 这是一个表单域 -->
          <el-input  placeholder="请您输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
<!-- ---------------------------------------------------------------------- -->
        <el-form-item prop="code">
          <el-input style="width:60%" placeholder="请您输入验证码" v-model="loginForm.code"></el-input>
          <el-button type="primary" style="float:right">发送验证码</el-button>
        </el-form-item>
<!-- ---------------------------------------------------------------------- -->
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">不选中不能进行下一步啊</el-checkbox>
        </el-form-item>
<!-- ---------------------------------------------------------------------- -->
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%">登录</el-button>
        </el-form-item>
<!-- ----------------------------------------------------------------------- -->
      </el-form>
    </el-card>
  </div>
</template>

<script>

// import router from '../../router'

export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRulus: {
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码输入有误' }],
        check: [{ validator: function (rulue, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('必须要选中哦'))
          }
        } }]
      }

    }
  },
  // 最后是要手动校验
  methods: {
    login () {
      this.$refs.test.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations', // 请求地址 如果axios没有指定类型的话默认是走get路线的
            method: 'post',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')

            // 在进入catch之前已经对状态码做出相应的处理了  所以在这儿就不需要在catch里判断了
          })
        }
      })
    }
  }
}

</script>

<style lang='less' scoped>
  .login{
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-card{
        width: 450px;
        .title{
          text-align: center;
          margin-bottom: 30px;
          img{
            height: 50px;
          }
        }
    }
  }
</style>
