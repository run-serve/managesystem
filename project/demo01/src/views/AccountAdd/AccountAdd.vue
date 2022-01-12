<template>
  <div class="account-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="accountWt">添加管理员账号</span>
      </div>
      <!-- 添加账号表单 -->
      <div class="from-style">
        <el-form
          :model="accountFrom"
          status-icon
          :rules="rules"
          ref="accountFrom"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
            <el-input
              type="text"
              v-model="accountFrom.account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="accountFrom.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="accountFrom.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 用户组 -->
          <el-form-item label="选择用户组" prop="userGroup">
            <el-select v-model="accountFrom.userGroup">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('accountFrom')"
              >添加</el-button
            >
            <el-button @click="resetForm('accountFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const validatePwd = (rule, value, callback) => {
      //rule：验证规则对象  value：输入的值 callback： 函数
      if (value === "") {
        //验证非空
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        //验证字符长度
        callback(new Error("请输入3位到6位字符"));
      } else {
        if (this.accountFrom.checkPass !== "") {
          //验证确认密码是否非空
          this.$refs.accountFrom.validateField("checkPass"); //validateField 方法是对部分数据做校验
        }
        //成功调用
        callback();
      }
    };
    const checkPwd = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountFrom.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      accountFrom: {
        account: "", //账号
        password: "", //密码
        checkPass: "", //确认密码
        userGroup: "", //选择用户
      },
      rules: {
        // 账号
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" }, //验证非空
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }, //验证字符长度
        ],
        // 密码
        password: [{ required: true, validator: validatePwd, trigger: "blur" }], //自定义验证
        // 确认密码
        checkPass: [{ required: true, validator: checkPwd, trigger: "blur" }], //自定义验证
        // 用户组
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }, // 非空验证
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //验证valid 通true  否false
        if (valid) {
          // 收集添加账号信息
          const params = {
            account: this.accountFrom.account,
            password: this.accountFrom.password,
            userGroup: this.accountFrom.userGroup,
          };
          //发送axios
          this.axios
            .post("/account/accountadd/", params)
            .then((res) => {
              //接受后端数据
              let { code, reason } = res;
              if (code === 0) {
                //成功
                //弹成功提示框
                this.$message({
                  message: reason,
                  type: "success",
                });
                //跳账号管理列表
                this.$router.push("/index/accountmanagement");
              } else if (code === 1) {
                //失败
                //  弹失败框
                this.$message.error(reason);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          //   console.log(params);
        } 
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import "./AccountAdd.less";
</style>