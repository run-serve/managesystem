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
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <!-- 用户组 -->
        <el-table-column prop="name" label="用户组">
        </el-table-column>
        <!-- 日期 -->
        <el-table-column prop="address" label="日期" show-overflow-tooltip>
           <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
            
        </el-table-column>
      </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            accountTableData:[],//表格数据
        };
    }
};
</script>

<style lang="less">
@import "./AccountManagement.less";
</style>