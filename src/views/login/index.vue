<template>
    <div class="login">
        <el-card class="login-card">
            <div class="login-title">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>

            <el-form>
                <el-form-item>
                    <el-input placeholder='请您输入手机号' v-model="loginForm.name" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input style="width:60%"  placeholder='请输入验证码'></el-input>
                    <el-button type="primary" style="float:right" >发送验证码</el-button>
                </el-form-item>

                <el-form-item>
                    <el-checkbox >我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>

                <el-from-item>
                    <el-button type='primary' style="width:100%">登录</el-button>
                </el-from-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        phone: ''
      }
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
            // height: 300px;
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
