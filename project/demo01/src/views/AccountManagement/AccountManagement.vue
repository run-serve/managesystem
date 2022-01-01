<template>
  <div class="account-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="accountWt">账户管理</span>
      </div>
      <div class="text-item">
        <!-- 账户管理表格 -->
        <el-table 
          class="accountTable"
          v-loading="loading"
          ref="accountTableData"
          :data="accountTableData"
          tooltip-effect="dark"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- 账号 -->
          <el-table-column label="账号">
            <template slot-scope="scope">{{ scope.row.account }}</template>
          </el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="name" label="用户组">
            <template slot-scope="scope">{{ scope.row.usergroup }}</template>
          </el-table-column>
          <!-- 日期 -->
          <el-table-column prop="address" label="日期" show-overflow-tooltip>
            <template slot-scope="scope">{{
              scope.row.ctime | filtersCtime
            }}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="handleEdit(scope.row.id)"
                >编辑</el-button
              >
              <!-- 修改账户信息弹框 -->
              <el-dialog
                title="修改账户信息"
                :visible.sync="dialogFormVisible"
                width="400px"
              >
                <el-form
                  :model="accountEditFrom"
                  :rules="rules"
                  ref="accountEditFrom"
                  status-icon
                  class="demo-ruleForm"
                >
                  <!-- 账号 -->
                  <el-form-item
                    label="账号"
                    :label-width="formLabelWidth"
                    style="width: 336px"
                    prop="account"
                  >
                    <el-input v-model="accountEditFrom.account"></el-input>
                  </el-form-item>
                  <!-- 用户组 -->
                  <el-form-item
                    label="用户组"
                    :label-width="formLabelWidth"
                    prop="userGroup"
                  >
                    <el-select
                      v-model="accountEditFrom.userGroup"
                      placeholder="请选择用户组"
                    >
                      <el-option label="普通用户" value="普通用户"></el-option>
                      <el-option
                        label="超级管理员"
                        value="超级管理员"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="margin-left: 150px">
                    <el-button @click="dialogFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="submitForm('accountEditFrom')"
                      >确认修改</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-dialog>
              <!-- 删除 -->
              <el-button
                style="margin-left:10px"
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 批量删除 -->
        <div style="margin-top:20px">
          <el-button type="danger" @click="batchDelete()">批量删除</el-button>
          <el-button type="primary" @click="deselect()">取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入日期格式化模块moment
import moment from "moment";
export default {
  // 生命周期钩子函数
  created() {
    this.ListInformation();
  },
  data() {
    return {
      loading: false, //加载
      accountTableData: [], //表格数据
      formLabelWidth: "120px",
      dialogFormVisible: false, //dialog 开关
      accountEditFrom: {
        account: "", //修改账号
        userGroup: "", //修改用户组
      },
      editId: 0, //修改的id默认为0
      fromIdData:[],//存表格选中状态的id
      rules: {
        //验证
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" }, //验证非空
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }, //验证字符长度
        ],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }, // 非空验证
        ],
      },
    };
  },
  methods: {
    //账号列表
    ListInformation() {
      this.loading = true;
      this.axios
        .get("/account/accountList")
        .then((res) => {
          this.accountTableData = res;
          setTimeout(() => {
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    // 打开删除账号对话框
    handleDelete(id) {
      // 优化删除
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get("/account/accountdel", { id })
            .then((res) => {
              // 接受后端传回的数据
              let { code, reason } = res;
              if (code === 0) {
                //删除成功
                //弹删除成功提示框
                this.$message({
                  message: reason,
                  type: "success",
                });
                // 删除过后刷新列表
                this.ListInformation();
              } else if (code === 1) {
                //失败
                //弹失败框
                this.$message.error(reason);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    batchDelete(){
      // 优化删除
      this.$confirm('此操作将永久删除已选中的账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 取消选择
    deselect(){
      // 整个表格调用取消选择方法
      this.$refs.accountTableData.clearSelection();
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val){
      // val就是选中的数组，遍历数据，提取id存入数组
        this.fromIdData=val.map(i=>i.id)
    },
    //编辑修改列表账户信息
    handleEdit(id) {
      this.dialogFormVisible = !this.dialogFormVisible;
      // 保留修改这条的id
      this.editId = id;
      // 发送axios
      this.axios
        .get("/account/accountedit", { id })
        .then((res) => {
          //接受后端传回的值
          this.accountEditFrom.account = res.account;
          this.accountEditFrom.userGroup = res.usergroup;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 确认编辑修改
    submitForm(fromTest) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.$refs[fromTest].validate((valid) => {
        // 验证修改账号数据是否通过
        if (valid) {
          //  收集账号信息
          const params = {
            id: this.editId,
            account: this.accountEditFrom.account,
            userGroup: this.accountEditFrom.userGroup,
          };
          this.axios
            .post("/account/accounteditsave", params)
            .then((res) => {
              //接受后端传回的值
              let { code, reason } = res;
              if (code === 0) {
                // 编辑修改成功
                // 弹编辑修改成功提示
                this.$message({
                  message: reason,
                  type: "success",
                });
                // 修改过后刷新列表
                this.ListInformation();
              } else if (code === 1) {
                //失败
                //弹失败框
                this.$message.error(reason);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  //过滤器时间格式化
  filters: {
    filtersCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD hh:mm:ss");
    },
  },
};
</script>

<style lang="less">
@import "./AccountManagement.less";
</style>