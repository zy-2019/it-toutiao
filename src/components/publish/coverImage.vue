<template>
  <div class="cov-img">
      <div @click="openDialog" class="cover-image-item" v-for="(item,index) in list" :key="index">
          <img :src="item ? item : userImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close='closeDialog'>

        <!-- 这里要封装一个另外的组件 并上传图片   -->
        <select-img></select-img>

      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      userImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  methods: {
    openDialog () { // 打开弹窗
      this.dialogVisible = true
    },
    closeDialog () { // 关闭弹窗
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
    .cov-img {
        margin:20px 100px;
        display: flex;
        .cover-image-item{
            width: 250px;
            height: 250px;
            border: 1px solid #ccc;
            margin: 5px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
