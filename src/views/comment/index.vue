<template>
    <!-- 卡片组件 -->
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">评论管理</template>
        </bread-crumb>
        <el-table :data = list v-loading='loading'>
            <el-table-column prop="title" width="600" label="标题"></el-table-column>
            <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope='obj'>

                     <!-- 需要根据状态来判断是要关闭还是打开 -->
                <el-button size="small" type="text">修改</el-button>
                <el-button @click="changeCommentState(obj.row)" size="small" type="text">{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>

                </template>

            </el-table-column>
        </el-table>

        <!-- 底部定义的评论分页组件                -->
        <el-row type="flex" justify="center" style="height:80px" align="middle">
            <el-pagination  background
  layout="prev, pager, next"
  :total="page.total" :page-size="page.pageSize"  :current-page="page.currentPage"  @current-change='changePage'>
        </el-pagination>
        </el-row>

    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 接收数据

      loading: false,
      //   page对象专门去存放分页数据信息
      page: {
        total: 0, // 总页数是动态获取的       ======>要从get方法参数里面获取总页数的  别傻等啦？？？？
        pageSize: 10, // 每页显示条目个数
        currentPage: 1 // 默认页码是1
      }
    }
  },
  methods: {

    // 点击页码切换数据使用的方法
    changePage (newPage) {
      this.page.currentPage = newPage // 把最新页码赋值给当前页码

      this.getComment() // 刷新页面数据
    },
    getComment () {
      this.loading = true // 打开进度条
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false // 数据请求回来进度条
      })
    },
    // 定义一个格式化的函数  用于处理布尔值
    formatterBoolean (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    changeCommentState (row) {
      let mess = row.comment_status ? '关闭' : '打开' // 根据此状态进行提示
      this.$confirm(`确定要进行${mess}操作吗`, '提示', {

      }).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 和当前的状态是相反的
        }).then(res => {
          // 到then这里表示执行成功
          this.getComment() // 重新拉取请求数据
        })
      })
    }
  },
  //   页面渲染完成=>>>>加载数据
  created () {
    this.getComment() // 获取评论数据
  }
}
</script>

<style>

</style>
