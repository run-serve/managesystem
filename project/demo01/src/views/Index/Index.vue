<template >
    <div class="index">
      <!-- 布局容器 -->
        <el-container>
            <!-- 左边 -->
           <el-aside width="200px">
               <!-- 导航栏 -->
               <Leftnav></Leftnav>
           </el-aside>
        <!-- 右边 -->
        <el-container>
            <!-- 头部 -->
            <el-header>
                <Rightheader></Rightheader>
            </el-header>
            <!-- 内容 -->
            <el-main>
                <!-- 路由出口 -->
                <router-view></router-view>
            </el-main>
                
            <el-footer>
                <!-- 底部 -->
                <Rightfooter></Rightfooter>
            </el-footer>
        </el-container>

        </el-container>
    </div>
</template>

<script>
//引入组件
import Leftnav from '@/components/Leftnav/Leftnav.vue'
import Rightheader from '@/components/Rightheader/Rightheader.vue'
import Rightfooter from '@/components/Rightfooter/Rightfooter.vue'
export default {
    //注册组件
    components:{
        Leftnav,
        Rightfooter,
        Rightheader
    }
}
</script>

<style lang="less">
@import './index.less';
</style>