<template>
    <!-- 外层容器 -->
    <el-container>
<!-- -------------------------------------------------------------- -->
        <el-aside style="height:100vh; width:230px; background-color:#353b4e" >
            <!-- 侧边栏容器 -->
            <layoutAside></layoutAside>
        </el-aside>
<!-- -------------------------------------------------------------- -->
        <el-container>

            <el-header>
                <layoutHeader></layoutHeader>
            </el-header>
            <el-main>
                主要区域
            </el-main>
        </el-container>
<!-- --------------------------------------------------------------- -->
    </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    layoutAside,
    layoutHeader
  }
}
</script>

<style>

</style>
