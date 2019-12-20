<template>
        <!-- 先定义一行，不需要额外的盒子 -->
        <el-row class="layout-header" type="flex" align="middle">

            <el-col :span="12" class="left">
                <i class="el-icon-s-fold" ></i>
                <span>江苏传智播客教育科技股份有限公司</span>
            </el-col>

            <el-col :span="12" class="right">
                <el-row type="flex" justify="end" align="middle">
                    <img :src="!userInfo.photo ? userInfo.photo : defaultImg" alt="">

                    <!-- 下拉菜单组件 -->
                    <el-dropdown>
                        <span class="el-dropdown-link">{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item>git地址</el-dropdown-item>
                            <el-dropdown-item >退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-col>
        </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 定义一个用户对象用于接收data传来的数据
      defaultImg: require('../../assets/img/header.png')
    }
  },
  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      this.userInfo = res.data.data
    })
  }
}
</script>

<style lang='less' scoped>

    .layout-header{
        height: 40px;
        .left{
            font-size: 20px;
            span{
                font-size: 15px;
                margin-left: 5px;
                color: #2c3e50;
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
