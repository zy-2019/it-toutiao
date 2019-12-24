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
        <div class="article-item" v-for="item in list" :key='item.id.toString()'>
            <div class="left">
                <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
                <div class="info">
                    <span>{{item.title}}</span>

                    <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
                    <el-tag :type='item.status | filterType' class="tag">{{item.status | filterStatus }}</el-tag>
                    <span class="date">{{item. pubdate}}</span>
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
      channels: [], // 接收频道数据

      list: [], // 接收整个article-item数组

      defaultImg: require('../../assets/img/404.png') // 动态获取图片
    }
  },

  //   定义一个过滤器去处理文章状态信息
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'

        default:
          break
      }
    },

    // 根据不同的status去给出相应的样式

    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'danger'
        case 2:
          return 'success'
        case 3:
          return 'info'

        default:
          break
      }
    }
  },
  methods: {

    //  获取文章的方法
    getArtiales () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        this.list = res.data.results
      })
    },
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
    this.getArtiales() // 获取文章数据
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
        margin-bottom: 20px;
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
                    width: 60px;
                }
                .date {
                    font-size: 14px;
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
