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
              <!-- 删除 -->
              <el-button
                style="margin-left: 10px"
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
          <div>
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
                <el-option label="超级管理员" value="超级管理员"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- style="transform: translateX(50px);" -->
          <el-form-item>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('accountEditFrom')"
              >确认修改</el-button
            >
            <!-- 密码修改跳转 -->
            <el-button type="danger" @click="modifypass">密码修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 批量删除 -->
      <div class="card-bottom">
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete()"
          >批量删除</el-button
        >
        <el-button type="primary" icon="el-icon-caret-left" @click="deselect()"
          >取消选择</el-button
        >
        <!-- 分页 -->

        <el-pagination
          class="pagination-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 10, 20, 30]"
          :page-size="3"
          :total="count"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
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
    this.ListInformationPage();
  },
  data() {
    return {
      count: 0, //计数
      loading: false, //加载
      accountTableData: [], //表格数据
      formLabelWidth: "120px",
      dialogFormVisible: false, //dialog 开关
      accountEditFrom: {
        account: "", //修改账号
        userGroup: "", //修改用户组
      },
      editId: 0, //修改的id默认为0
      fromIdData: [], //存表格选中状态的id
      currentPage: 1, //当前页
      pageSize: 3, //当前页多少条记录
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
    // 按照分页显示账号列表
    ListInformationPage() {
      this.loading = true;
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      this.axios
        .get("/account/accountListPage", params)
        .then((res) => {
          let {count,data} = res;
          this.accountTableData = data;//接分页数据
          this.count = count; //接账号列表记录总数

          //优化当一页数据删除完后，会停留在当前页，显示无数据，进行优化
          if(!data.length && this.currentPage > 1){
               this.currentPage -= 1;//当前页码自减1
               this.ListInformationPage();//再掉自己
          };
            //加载
          setTimeout(() => {
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    // 删除账号
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
                this.ListInformationPage();
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
    //批量删除账号
    batchDelete() {
      // 如果不选就弹出提示，直接return不执行下面发送axios
      if (!this.fromIdData.length) {
        this.$message.error("你是不是傻逼,请选择以后再操作!");
        return;
      }
      // 优化删除
      this.$confirm("此操作将永久删除已选中的账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = { idArr: this.fromIdData };
          this.axios
            .get("/account/accountBatch", params)
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
                this.ListInformationPage();
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
            message: "已取消批量删除",
          });
          this.deselect();
        });
    },
    // 取消选择
    deselect() {
      // 整个表格调用取消选择方法;
      // clearSelection():用于多选表格，清空用户的选择
      this.$refs.accountTableData.clearSelection();
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      // val就是选中的数组，遍历数据，提取id存入数组
      this.fromIdData = val.map((i) => i.id);
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
                this.ListInformationPage();
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
    // 每页条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.ListInformationPage();
    },
    // 当前页面变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.ListInformationPage();
    },
    //密码修改跳转
    modifypass() {
      //路由传值并跳转
      this.$router.push("/index/PasswordModify?" + `id=${this.editId}`);
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

<style scoped>
.account-management,
.box-card {
  height: 100%;
}
/deep/.el-card__header {
  background-color: rgb(244, 244, 244);
}
.accountWt {
  font-weight: bold;
}
.text-item {
  height: calc(100vh - 305px);
  box-sizing: border-box;
}
.card-bottom {
  margin-top: 15px;
}
.pagination-right {
  float: right;
  transform: translateY(6px) !important;
}
/deep/ .el-pagination {
  padding: 0;
}
.pagination-right >>> .btn-next {
  margin-right: 0;
}
/* 编辑按钮dialog内表单样式 */
/deep/ .el-form-item__label {
  text-align: left;
}
.el-form-item >>> .el-input {
  transform: translateX(-45px);
}
</style>
