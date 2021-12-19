<template>
  <div class="account-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户管理</span>
      </div>
      <div class="text-item">
        <!-- 账户管理表格 -->
        <el-table
          ref="accountTableData"
          :data="accountTableData"
          tooltip-effect="dark"
          style="width: 100%"
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
            <template slot-scope="scope">{{ scope.row.ctime }}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    // this.listInformation();
    this.axios
      .get("http://127.0.0.1:666/account/accountList")
      .then((response) => {
        this.accountTableData = response.data;
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      accountTableData: [], //表格数据
    };
  },
  // listInformation(){
  //   this.axios.get('http://127.0.0.1:666/account/accountList')
  //   .then(res =>{
  //       // if(code === 0){
  //       //   this.accountTableData=res.data.data;
  //       // }
  //       console.log(res.data);
  //   })
  //   .catch(err =>{
  //     console.log(err);
  //   })
  // }
};
</script>

<style lang="less">
@import "./AccountManagement.less";
</style>