<template>
 <el-carousel :interval="4000" type="card" height='200px' arrow="always">
            <el-carousel-item v-for="item in list" :key="item">
                <img :src="item" alt="">
            </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['', '', '']
    }
  }
}
</script>

<style lang='less' scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
      width: 100%;
  }
</style>
