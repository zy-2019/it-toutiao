<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">
                素材管理
            </template>
        </bread-crumb>
        <!-- 标签页 -->
        <!-- 单词别再写错啦我是真的怕啦 -->
        <el-tabs v-model="activeName" @tab-click='changeTab'>
            <!-- 生成页面结构 -->
            <el-tab-pane label="全部图片" name="all">
                <!-- {{list}} 根据除传回的id进行操作 -->
                <div class="img-list">
                    <!-- v-for 进行循环 -->
                    <el-card class="img-card" v-for='item in list' :key="item.id">
                        <img :src="item.url" alt="">
                        <el-row class="icon" type="flex" align="middle" justify="space-around">
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
                </div>

                </el-tab-pane>
            <el-tab-pane label="收藏图片" name="collect">
                <div class="img-list">
                    <!-- v-for 进行循环 -->
                    <el-card class="img-card" v-for='item in list' :key="item.id">
                        <img :src="item.url" alt="">
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前选中的标签
      list: [] // 接收素材数据
    }
  },
  methods: {
    changeTab () {
      this.getMaterial() // 调用数据方法
    },

    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect' // 传false是获取所有的数据 传true是获取收藏的数据  如果等于collect那么就是true
        }
      }).then(res => {
        this.list = res.data.results // 获取所有的图片数据  这有可能是全部有可能是收藏
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
                background: #ccc
            }
        }
    }
</style>
