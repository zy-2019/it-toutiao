<template>
    <!-- 外层容器 -->
    <el-container>
<!-- -------------------------------------------------------------- -->
        <el-aside style="min-height:100vh; width:230px; background-color:#353b4e" >
            <!-- 侧边栏容器 -->
            <layoutAside></layoutAside>
        </el-aside>
<!-- -------------------------------------------------------------- -->
        <el-container>

            <el-header>
                <layoutHeader></layoutHeader>
            </el-header>
            <el-main>
                <!-- 中间主要页面区域 -->
                <!-- 二级路由容器 -->
                  <router-view></router-view>
            </el-main>
        </el-container>
<!-- --------------------------------------------------------------- -->
    </el-container>
</template>

<script>

// 已经全局注册所以不要引入了

// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
//   components: {
//     layoutAside,
//     layoutHeader
//   }
}
</script>

<style>

</style>
