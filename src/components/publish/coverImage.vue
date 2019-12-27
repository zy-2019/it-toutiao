<template>
  <div class="cov-img">
      <div @click="openDialog(index)" class="cover-image-item" v-for="(item,index) in list" :key="index">
          <img :src="item ? item : userImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close='closeDialog'>

        <!-- 这里要封装一个另外的组件 并上传图片   -->

        <select-img @selectOneImg='receiveImg'></select-img>

      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      userImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {

    // 接收selectImg的传参   因为data显示的是list的数据  所以要把index也传过去  打开弹窗是可以获取到index的
    receiveImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex) // 携带index去传给父==>

      this.closeDialog() // 拿到索引后关闭弹窗  不需要自己手动去点了
    },
    openDialog (index) { // 打开弹窗
      this.dialogVisible = true
      this.selectIndex = index
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
