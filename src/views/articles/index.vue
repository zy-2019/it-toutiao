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
                <el-radio-group v-model="searchForm.status" @change="changeCondition">

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
                    <el-option @change="changeCondition" v-for='item in channels' :key='item.id' :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
<!-- ------------------------------------------------------------------------- -->
            <el-form-item label="时间选择:">
                <!-- 日期选择器  日期范围 -->
                <el-date-picker @change="changeCondition" value-format="yyyy-MM-dd"  v-model="searchForm.dateRange" type="daterange" ></el-date-picker>
            </el-form-item>
        </el-form>
<!-- --------------------------------------------------------------------------- -->
        <!-- 主要文章显示页面 -->
        <el-row type="flex" class="head" align="middle">
            <span>共找到{{page.total}}条内容</span>
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
                <span><i class="el-icon-edit" @click="modifyArticle(item.id)">修改</i></span>
                <span @click="delArticle(item.id)"><i class="el-icon-delete-solid">删除</i></span>
            </div>
        </div>
<!-- ----------------------------------------------------------------------------- -->
  <!-- 分页组件 -->
        <el-row type="flex" justify="center" style="height:80px" align="middle">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            @current-change='changePage'>
          </el-pagination>
        </el-row>
<!-- ------------------------------------------------------------------------------ -->
    </el-card>
</template>

<script>
export default {
  data () {
    return {

      searchForm: { // 把表单里的三个查询条件封装在一个对象里面
        status: 5, // 默认选中全部

        channel_id: null, // 文章所属频道id      ------------------------??????这块儿明天要听一下视频

        dateRange: [] // 日期范围   需要看文档中的返回类型
      },
      channels: [], // 接收频道数据

      list: [], // 接收整个article-item数组   渲染页面数据

      defaultImg: require('../../assets/img/404.png'), // 动态获取图片定义的变量

      // 分页组件的定义对象
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
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

    // 这个过滤器是根据不同的status去给出相应的样式
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

    // 点击修改文章的方法

    // 当两个不同的路由的地址 对应同一个组件的时候,如果相互切换,组件实例并不会销毁,也就是不会执行钩子函数的一系列操作

    modifyArticle (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },

    // ！！！！！！！！！条件或页码改变时都要重新获取当前页码数和每页数量！！！！！！！！！！！！！！！！！！
    // 条件改变时 => 强制页码到第一页 => 收集参数  =>组合 =>查询
    changeCondition () {
      this.page.currentPage = 1

      this.getchangeCondition() // 调用方法去刷新页面数据
    },

    // 页码改变时的方法 => 设置最新页码 => 收集原来的条件参数 => 组合 =>查询
    changePage (newpage) {
      this.page.currentPage = newpage

      this.getchangeCondition()
    },

    // 改变条件进行筛选           第一种的方法
    getchangeCondition () {
      let params = {

        page: this.page.currentPage, //   获取当前页码数

        per_page: this.page.pageSize, //  获取每页数量

        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 这里的5是前端自己定义的标识  如果等于5表示查全部 给个null 因为全部是不传的

        channel_id: this.searchForm.channel_id,

        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,

        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }

      this.getArtiales(params) // 传参
    },

    // 删除文章的方法

    delArticle (id) {
      this.$confirm('您确定要删除吗').then(() => {
        // 调用删除接口
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getchangeCondition() // 重新请求页面数据
        })
      })
    },

    //  获取文章的方法
    getArtiales (params) {
      this.$axios({
        url: '/articles',

        params
      }).then(res => {
        this.list = res.data.results // 获取整个文章列表

        this.page.total = res.data.total_count // 获取文章总数
      })
    },
    // 获取所有文章频道的方法
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

    this.getChannels({ page: 1, per_page: 10 }) // 获取频道数据
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
