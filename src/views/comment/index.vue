<template>
    <!-- 卡片组件 -->
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">评论管理</template>
        </bread-crumb>
        <el-table :data = list>
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
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [] // 接收数据
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        this.list = res.data.results
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
          params: { article_id: row.id },
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
