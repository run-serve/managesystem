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
                  {{ account }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personal"
                    >个人中心</el-dropdown-item
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
      // adminId: 0,
      account: "",
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "personal") {
        // const id = window.localStorage.getItem("id"); //获取存入token的id
        // this.adminId = id;
        // console.log(id);
        this.$router.push("/"); //跳个人中心
      }
      if (command === "exit") {
        window.localStorage.clear(); //清除所有token
        this.$router.push("/login"); //跳回登录页
      }
    },
    //第一种方法：通过token获取当前登录的用户名     第二种方法：单独请求接口，获取account
    getAccountName() {
      // this.account = window.localStorage.getItem("account"); //获取在login页面就存入token的account
      this.axios
      .get("/account/accountName")
      .then((res)=>{
        //接数据
        this.account = res.accountName;
      })
      .catch((err)=>{
        console.log(err);
      })
    },
  },
  created() {
    this.getAccountName();
  },
};
</script>
<style lang="less">
@import "./Rightheader.less";
</style>


