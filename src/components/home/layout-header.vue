<template>
        <!-- 先定义一行，不需要额外的盒子 -->
        <el-row class="layout-header" type="flex" align="middle">

            <el-col :span="12" class="left">
                <i class="el-icon-s-fold" ></i>
                <span>内蒙古<strong style="color:red; font-size:25px"><em>浪滔滔</em></strong>教育科技股份有限公司</span>
            </el-col>

            <el-col :span="12" class="right">
                <el-row type="flex" justify="end" align="middle">
                    <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">

                    <!-- 下拉菜单组件 -->
                    <el-dropdown @command="checkMenu">
                        <span class="el-dropdown-link">{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                            <el-dropdown-item command='git'>git地址</el-dropdown-item>
                            <el-dropdown-item command='logout'>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-col>
        </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {}, // 定义一个用户对象用于接收data传来的数据
      defaultImg: require('../../assets/img/header.png')
    }
  },
  created () {
    // let token = localStorage.getItem('user-token')  //已经统一处理请求在此处不需要定义了

    this.getUserInfo() // 相同的事件封装在methods里面了
    // 开启监听事件
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo() // 更新用户信息
    })
  },
  methods: {

    // 更新用户信息的function

    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
      }).then(res => {
        this.userInfo = res.data
      })
    },

    checkMenu (command) {
    //   this.$message('触发了' + command)
      if (command === 'info') {
        this.$router.push('/home/userinfo') // 跳转账户信息页
      } else if (command === 'git') {
        window.location.href = 'http://www.baidu.com'
      } else {
        window.localStorage.removeItem('user-token') // 删除令牌
        this.$router.push('/login') // 跳转登录页
      }
    }
  }
}
</script>

<style lang='less' scoped>

    .layout-header{
        height: 40px;
        background-color: cornflowerblue;
        .left{
            font-size: 20px;
            span{
                font-size: 15px;
                margin-left: 5px;
                color: #2c3e50;
                background-color: yellow;
            }
        }
        .right{
            img{
                width: 20px;
                height: 20px;
                margin-right: 10px
            }
        }
    }
</style>
