<template >
  <div class="login">
    <div class="login-wrapper">
      <h2 class="title">华联超市管理系统</h2>
      <el-form
        :model="LoginForm"
        status-icon
        :rules="rules"
        ref="LoginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <!-- 如果用了封装组件的话,如element,这个时候使用按键修饰符需要加上.native -->
        <el-form-item label="账号" prop="account" @keydown.enter.native="submitForm('LoginForm')">
          <el-input
            type="text"
            v-model="LoginForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" @keydown.enter.native="submitForm('LoginForm')">
          <el-input
            type="password"
            v-model="LoginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" @keydown.enter.native="submitForm('LoginForm')">
          <el-input
            type="password"
            v-model="LoginForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('LoginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('LoginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validatePwd = (_rule, value, callback) => {
      //rule：验证规则对象  value：输入的值 callback： 函数
      if (value === "") {
        //验证非空
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        //验证字符长度
        callback(new Error("请输入3位到6位字符"));
      } else {
        if (this.LoginForm.checkPass !== "") {
          //验证确认密码是否非空
          this.$refs.LoginForm.validateField("checkPass");
        }
        //成功调用
        callback();
      }
    };
    const checkPwd = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.LoginForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      LoginForm: {
        account: "", //账号
        password: "", //密码
        checkPass: "", //确认密码
        adminId:0
      },
      rules: {
        //验证
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" }, //验证非空
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }, //验证字符长度
        ],
        password: [{ required: true, validator: validatePwd, trigger: "blur" }],
        checkPass: [{ required: true, validator: checkPwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //所用前端验证通过valid就是true 否则false
        if (valid) {
          //收集账号和密码
          const params = {
            account: this.LoginForm.account,
            password: this.LoginForm.password,
          };
          // 发送axios给后台
          this.axios
            .post("/login/loginSign", params)
            .then((res) => {
              let { code, reason, token,id,account} = res;
              // this.adminId = id;
              if (code === 0) {
                 //把token存入浏览器，存键值对                    
                window.localStorage.setItem('token',token);
                window.localStorage.setItem('id',id); 
                window.localStorage.setItem('account',account);
                this.$message({
                  message: reason,
                  type: "success",
                });
                //登录成功路由跳转到首页
                this.$router.push("/index");
              } else if (code === 1) {
                // 登录失败提示
                this.$message.error(reason);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error("请输入账号和密码 !");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import "./LoginStyle.less";
</style>