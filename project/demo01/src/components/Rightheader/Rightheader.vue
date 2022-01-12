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
              <img src="./lufei1.png" alt="" />
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
                  <el-dropdown-item command="personal"
                    >密码修改</el-dropdown-item
                  >
                  <el-dropdown-item command="exit">退出系统</el-dropdown-item>
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
  data() {
    return {
      adminId: 0,
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "personal") {
        this.adminId = this.$route.query.id;
        this.$router.push("/index/PasswordModify?" + `id=${this.adminId}`); //跳密码修改
      }
      if (command === "exit") {
        window.localStorage.clear(); //清除所有token
        this.$router.push("/login"); //跳回登录页
      }
    },
  },
};
</script>
<style lang="less">
@import "./Rightheader.less";
</style>


