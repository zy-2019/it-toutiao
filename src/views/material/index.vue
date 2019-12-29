<template>
    <el-card v-loading='loading'>
        <bread-crumb slot="header">
            <template slot="title">
                素材管理
            </template>
        </bread-crumb>

        <!-- 上传图片组件 -->
        <el-row type="flex" justify="end">
          <el-upload action="" :http-request="uploadImg" :show-file-list="false">
            <el-button type="primary" size='small'>点击上传</el-button>
          </el-upload>
        </el-row>

        <!-- 标签页 -->
        <!-- 单词别再写错啦我是真的怕啦 -->
        <el-tabs v-model="activeName" @tab-click='changeTab'>
            <!-- 生成页面结构 -->
            <el-tab-pane label="全部图片" name="all">
                <!-- {{list}} 根据除传回的id进行操作 -->
                <div class="img-list">
                    <!-- v-for 进行循环 -->
                    <el-card class="img-card" v-for='(item,index) in list' :key="index">
                        <img @click="openDialog(index)" :src="item.url" alt="">
                        <el-row class="icon" type="flex" align="middle" justify="space-around">
                            <!-- 根据当前是否收藏的状态来决定是否给字体颜色 -->
                            <i class="el-icon-star-on" @click="coolectOrcancel(item)" :style="{ color : item.is_collected ? 'red' : '#000'}"></i>
                            <i class="el-icon-delete-solid" @click="deleteImg(item.id)"></i>
                        </el-row>
                    </el-card>
                </div>

            </el-tab-pane>
            <el-tab-pane label="收藏图片" name="collect">
                <div class="img-list">
                    <!-- v-for 进行循环 -->
                    <el-card class="img-card" v-for='(item,index) in list' :key='index'>
                        <img @click="openDialog(index)"  :src="item.url" alt="">
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- 这里是公共分页组件     因为每次切换总页数是不一样的  所以才不影响 -->

        <el-row type="flex" justify="center" style="height:80px" align="middle">
            <el-pagination  background
  layout="prev, pager, next"
  :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change='changePage'>
        </el-pagination>
        </el-row>
  <!-- ------------------------------------------------------------------------- -->
      <!-- 点击图片显示弹层 -->
      <!-- 放在最下面直接弹出 -->

        <el-dialog @opened='openCarousel' :visible="dialogVisible" @close='dialogVisible = false'>
            <el-carousel ref="myCarousel" indicator-position="outside">
              <el-carousel-item v-for="(item,index) in list" :key="index">
                <img style="width:100%;height:100%" :src="item.url" alt="">
              </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      activeName: 'all', // 当前选中的标签
      list: [], // 接收素材数据

      loading: false, // loading加载的变量

      // page对象专门去存放分页数据信息
      page: {
        total: 0, // 总页数是动态获取到的   要从get方法参数里面获取总页数的  别傻等啦？？？？
        pageSize: 8, // 每页显示条目个数
        currentPage: 1 // 默认页码是1
      },
      CarouselIndex: -1
    }
  },
  methods: {

    // 获取走马灯的实例
    openCarousel () {
      this.$refs.myCarousel.setActiveItem(this.CarouselIndex)
    },
    // 点击打开弹层的function
    openDialog (index) { // 要把图片索引拿到
      this.dialogVisible = true // 异步更新没有办法在弹层中立刻设置索引

      this.CarouselIndex = index // 先把索引存一下
    },

    // 点击取消收藏或收藏图片
    coolectOrcancel (item) {
      // 获取当前状态 判断item.is_collected true or false ?
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: {
          collect: !item.is_collected // 取反  因为收藏和取消收藏是逆着的
        }
      }).then(res => {
        this.getMaterial() // 重新请求页面的数据
      })
    },

    // 删除当前点击图片
    deleteImg (id) {
      this.$confirm('您确定要删除吗').then(res => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(res => {
          this.getMaterial() // 重新请求页面数据
        })
      })
    },

    // 上传图片的方法
    uploadImg (params) {
      console.log(params) // 看下传过去的参数是什么?????????????????????????

      // alert(1)
      this.loading = true //  上传时打开 loading加载

      let data = new FormData()

      data.append('image', params.file) // 文件加入到参数中

      // 发送请求
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.loading = false // 上传成功后关闭loading

        this.getMaterial() // 直接调用拉取数据的方法
      })
    },
    // 切换页签的方法
    changeTab () {
      this.page.currentPage = 1 // 当点击切换页签的时候回到第一页 因为他两共用的一个list数据 例如（在全部的第二页 点击收藏的时候应该从收藏的第一页开始）而不是第二页

      this.getMaterial() // 调用数据方法
    },
    // 页码切换数据
    changePage (newPage) { // 点击页码切换数据  根据element-ui规则  返回的参数是当前页
      this.page.currentPage = newPage
      this.getMaterial() // 调用方法 刷新页面数据
    },
    getMaterial () {
      this.loading = true // 打开loading加载

      this.$axios({

        url: '/user/images', // 收藏和获取共用一个接口
        params: {
          page: this.page.currentPage, // 后端返回的当前页数

          per_page: this.page.pageSize, // 后端返回的每页数量

          collect: this.activeName === 'collect' // 这里传false是获取所有的数据 传true是获取收藏的数据  如果等于collect那么就是true
        }
      }).then(res => {
        console.log(res)

        this.list = res.data.results // 获取所有的图片数据  这儿有可能是全部有可能是收藏

        this.page.total = res.data.total_count // 从后台获取到动态总数信息

        this.loading = false // 关闭loading加载
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
    .img-list{
        display: flex;
        flex-wrap:wrap;
        .img-card{
            width: 200px;
            height: 220px;
            margin: 20px 25px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }
            .icon{
                 font-size: 20px;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 30px;
                background-color: skyblue;
                i {
                  cursor: pointer
                }
            }
        }
    }
</style>
