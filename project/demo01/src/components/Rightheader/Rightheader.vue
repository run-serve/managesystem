<template>
    <div class="right-header">
        <!-- 布局容器 -->
        <el-row :gutter="20">
            <!-- 左 -->
            <el-col :span="20">
                <i class="icon iconfont">&#xe652;</i>
                <span class="title">Super Connection Management</span>
            </el-col>
            <!-- 右 -->
            <el-col :span="4">
                <el-row>
                    <el-col :span="8">
                        <!-- 头像 -->
                        <div class="avatar">
                            <img src="./lufei1.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <!-- 下拉 -->
                        <div class="drop-down">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    admin
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

      
    </div>
</template>
<script>
export default {
    methods: {
      handleCommand(command) {
        console.log('参数:', command)
      }
    }
}
</script>
<style lang="less">
    @import './Rightheader.less';
</style>


