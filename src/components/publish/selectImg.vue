<template>
    <el-tabs v-model="activeName">
        <!-- ---------------------------------------------------------------- -->
        <el-tab-pane label="素材库" name="material">
            <div class="select-image-list">
                <!-- 循环生成el-card -->
                <el-card class="userImgCard" v-for="item in list" :key="item.id">

                        <!-- URL是图片地址 -->

                     <img :src="item.url" alt="">

                </el-card>
            </div>
        <!-- --------------------------------------------------------------------- -->
        <!-- 放一个分页组件 -->
        <el-row type="flex" justify="center">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            @current-change='changePage'>
            </el-pagination>
        </el-row>
        </el-tab-pane>
<!-- ------------------------------------------------------------------------------- -->
        <el-tab-pane label="点击上传" name="upLoad">
            <span class="el-icon-plus"></span>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
export default {
  data () {
    return {
      list: [], // 接收素材管理的数据
      activeName: 'material', // 默认选中的是素材库
      page: {
        tolal: 0, // 总页码数
        pageSize: 8, // 每页的数量
        currentPage: 1 // 默认请求页码
      }
    }
  },
  methods: {

    // 页码切换事件

    changePage (newPage) {
      this.page.currentPage = newPage

      this.getUserImg() // 重新请求刷新页面数据
    },

    // 获取用户头像事件
    getUserImg () {
      this.$axios({

        url: '/user/images',

        params: {

          collect: false,

          page: this.page.currentPage, // 请求参数页数

          per_page: this.page.pageSize // 请求参数每页数量
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count // 图片总数
      })
    }
  },
  created () {
    this.getUserImg()
  }
}
</script>

<style lang='less' scoped>
    .select-image-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .userImgCard{
            width: 150px;
            height: 150px;
            margin: 20px 0;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
