<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">
                文章列表
            </template>
        </bread-crumb>

        <!-- 开始搭建页面结构 -->

        <el-form style="padding-left:50px">
            <el-form-item label="文章状态:">
                <!-- 放置一个单选组  文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
                <el-radio-group v-model="searchForm.status">
                    <el-radio :label="5">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>

                </el-radio-group>
            </el-form-item>
<!-- ------------------------------------------------------------------------ -->
            <el-form-item label="频道列表:">

                <!-- el-option label是显示值 value是存储值 -->

                <el-select placeholder="请选择频道" v-model="searchForm.channel_id" >
                    <el-option v-for='item in channels' :key='item.id' :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
<!-- ------------------------------------------------------------------------- -->
            <el-form-item label="时间选择:">
                <!-- 日期选择器  日期范围 -->
                <el-date-picker v-model="searchForm.dateRange"   type="daterange" ></el-date-picker>
            </el-form-item>
        </el-form>
<!-- --------------------------------------------------------------------------- -->
        <!-- 主要文章显示页面 -->
        <el-row type="flex" class="head" align="middle">
            <span>共找到1000条内容</span>
        </el-row>
<!-- ------------------------------------------------------------------------------ -->
        <div class="article-item" >
            <div class="left">
                <img src="../../assets/img/404.png" alt="">
                <div class="info">
                    <span>标题</span>
                    <el-tag class="tag" type="success">标签一</el-tag>
                    <span class="date">2019-12-24 15:07:01</span>
                </div>
            </div>
<!-- ---------------------------------------------------------------------------- -->
            <div class="right">
                <span><i class="el-icon-edit">修改</i></span>
                <span><i class="el-icon-delete-solid">删除</i></span>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5,
        channel_id: null,
        dateRange: [] // 日期范围
      },
      channels: [] // 接收频道数据

    }
  },
  methods: {

    // 获取文章频道的方法
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
  }
}
</script>

<style lang='less' scroped>

    .head {
        border-bottom: 1px dashed #ccc;
        height: 50px;
        margin-bottom: 30px;
    }
    .article-item {
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            // flex-direction: column;
            img{
                width: 200px;
                height: 150px;
                border-radius: 5%;
            }
            .info {
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .tag{
                    text-align: center;
                    width: 40%;
                }
            }
        }
        .right {
            span {
                margin-left: 10px;
                font-size: 12px;
                cursor: pointer;
            }
        }
    }
</style>
