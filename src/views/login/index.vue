<template>
    <div class="login">
        <el-card class="login-card">
            <div class="login-title">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>

            <el-form :model="loginForm" :rules='loginRules' ref='loginForm'>
                <el-form-item prop='phone'>
                    <el-input placeholder='请您输入手机号' v-model="loginForm.phone" ></el-input>
                </el-form-item>

                <el-form-item prop='code'>
                    <el-input style="width:60%"  placeholder='请输入验证码' v-model="loginForm.code"></el-input>
                    <el-button type="primary" style="float:right" >发送验证码</el-button>
                </el-form-item>

                <el-form-item prop='check'>
                    <el-checkbox v-model="loginForm.check" >我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>

                <el-from-item>
                    <el-button type='primary' style="width:100%" @click="login">登录</el-button>
                </el-from-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      loginForm: {
        phone: '',
        code: '',
        check: false
      },
      loginRules: {
        //   验证规则对象
        phone: [{ required: true, message: '请您输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请您输入正确的手机号' }],

        code: [{ required: true, message: '请您输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码为六位数' }],

        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('不勾选有错误信息哦'))
          }
        } }]

      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(function (isOK) {
        if (isOK) {
          console.log('通过,可以调用接口')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .login {
        background-image: url('../../assets/img/login_bg.jpg');
        height: 100vh;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card{
            width: 400px;
            .login-title{
                text-align: center;
                margin-bottom: 30px;
                img {
                    height: 45%;
                }
            }
        }
    }
</style>
