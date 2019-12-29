<template>
    <el-tabs v-model="activeName" v-loading='loading'>
<!-- ---------------------------------------------------------------- -->
        <el-tab-pane label="素材库" name="material">
            <div class="select-image-list">
                <!-- 循环生成el-card -->
                <el-card class="userImgCard" v-for="item in list" :key="item.id">
                        <!-- URL是图片地址 -->
                        <!-- 携带地址传参 -->
                     <img @click="changeImg(item.url)" :src="item.url" alt="">

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

        <!-- 上传用户头像 -->

        <el-tab-pane label="点击上传" name="upLoad"  >
            <el-upload class="uploadImg" :http-request="uploadImg"  action="" :show-file-list="false">
                <span class="el-icon-plus"></span>
            </el-upload>
        </el-tab-pane>
    </el-tabs>

</template>

<script>

export default {
  data () {
    return {
      loading: false,
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

    //   点击上传图片事件
    uploadImg (params) {
      this.loading = true // 打开loading
      let data = new FormData() // 定义formdata收集数据

      data.append('image', params.file) // 加入请求参数

      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.loading = false
        this.$emit('selectOneImg', res.data.url)

        // 添加成功提示一把

        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        })
      })
    },
    //   点击图片时触发
    changeImg (url) {
      this.$emit('selectOneImg', url) //                   通过自定义事件第一次子传父
    },

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
    .uploadImg{
        display: flex;
        justify-content: center;
        span{
            font-size: 50px;
            padding: 50px;
            border: 1px dashed #ccc;
        }
    }
</style>
