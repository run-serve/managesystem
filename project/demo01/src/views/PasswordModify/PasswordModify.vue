<template>
  <div class="password-modify">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="accountPass">密码修改</span>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input
              type="password"
              v-model="ruleForm.newPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="surePass">
            <el-input
              type="password"
              v-model="ruleForm.surePass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >修改</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
        const enterPwd = (rule, value, callback) => {
            //rule：验证规则对象  value：输入的值 callback： 函数
            if (value === "") {
                //验证非空
                callback(new Error("请输入密码"));
            } else if (value.length < 3 || value.length > 6) {
                //验证字符长度
                callback(new Error("请输入3位到6位字符"));
            } else {
                callback();
            }
        };
        const newPwd = (_rule, value, callback) => {
            //rule：验证规则对象  value：输入的值 callback： 函数
            if (value === "") {
                //验证非空
                callback(new Error("请输入密码"));
            } else if (value.length < 3 || value.length > 6) {
                //验证字符长度
                callback(new Error("请输入3位到6位字符"));
            } else {
                if (this.ruleForm.surePass !== "") {
                //验证确认密码是否非空
                this.$refs.ruleForm.validateField("surePass"); //validateField 方法是对部分数据做校验
                }
                //成功调用
                callback();
            }
        };
        const surePwd = (_rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.newPass) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: "", //原密码
                newPass: "", //新密码
                surePass: "", //确认新密码
            },
            rules: {
                //验证
                //原密码
                pass: [{ required: true, validator: enterPwd, trigger: "blur" }],
                //新密码
                newPass: [{ required: true, validator: newPwd, trigger: "blur" }],
                // 确认新密码
                surePass: [{ required: true, validator: surePwd, trigger: "blur" }],
            },
        };
    },
  methods: {
        //修改密码
        submitForm(formName) {
            // 如果没id就弹出提示，直接return不执行下面发送axios
            if (!this.$route.query.id) {
                this.$message.error("请到账号管理列表,点击编辑后再进行密码修改操作!");
                return;
            }
            this.$refs[formName].validate((valid) => {
                //验证valid 通true  否false
                if (valid) {
                const params = {
                    id: this.$route.query.id, //接收账号列表页面路由传过来的id
                    pass: this.ruleForm.pass,
                    newPass: this.ruleForm.newPass,
                };
                this.axios
                    .post("/account/accountModifyPass", params)
                    .then((res) => {
                    let { code, reason } = res;
                    if (code === 0) {
                        //修改密码成功，弹成功提示
                        this.$message({
                        message: reason,
                        type: "success",
                        });
                        //修改成功条账号列表
                        this.$router.push("/index/AccountManagement");
                        //修改失败弹失败提示框
                    } else if (code === 1) {
                        this.$message.error(reason);
                    }
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                } else {
                console.log("error submit!!");
                return false;
                }
            });
        },
        //重置
        resetForm(formName) {
        this.$refs[formName].resetFields();
        },
    },
};
</script>

<style lang="less">
.password-modify {
  .box-card {
    width: 380px;
    .el-card__header {
      background-color: rgb(244, 244, 244);
    }
    .clearfix {
      .accountPass {
        font-weight: bold;
      }
    }
  }
}
</style>