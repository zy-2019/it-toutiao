<template>
    <el-card>

        <!-- 面包屑组件>>>>>>>>>>>>>>>>显示当前页面的路径，快速返回之前的任意页面 -->
        <bread-crumb slot="header">
            <template slot="title">
                发布文章
            </template>
        </bread-crumb>

        <!-- 页面结构搭建 -->

        <el-form style="margin-left:15px" label-width="100px">

            <el-form-item label="标题">
                <el-input placeholder="请输入标题" style="width:60%"></el-input>
            </el-form-item>
    <!-- --------------------------------------------------------------------- -->
            <el-form-item label="内容">

                <el-input type="textarea" :rows="4">

                </el-input>

            </el-form-item>
    <!-- ---------------------------------------------------------------------- -->
            <el-form-item label="封面">
                <el-radio-group>
                    <el-radio>单图</el-radio>
                    <el-radio>三图</el-radio>
                    <el-radio>无图</el-radio>
                    <el-radio>自动</el-radio>
                </el-radio-group>
            </el-form-item>
    <!-- ------------------------------------------------------------------------- -->
            <el-form-item label="频道">
                <el-select>
                    <el-option>javascript</el-option>
                </el-select>
            </el-form-item>
    <!-- ------------------------------------------------------------------------- -->
            <el-form-item>
                <el-button type="primary">发布文章</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>

        </el-form>

    </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
