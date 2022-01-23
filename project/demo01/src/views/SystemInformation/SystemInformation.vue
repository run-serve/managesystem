<template >
  <div class="system-information">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="system">系统信息</span>
      </div>

      <div>
        <el-alert title="设置了回调的 alert" type="warning" @close="hello">
        </el-alert>
        <div class="tow-alter">
        <el-alert  title="不可关闭的 alert" type="success" :closable="false">
        </el-alert>
        </div>
      </div>

      <div class="son-card">
        <el-card class="box-card2">
          <div slot="header" class="clearfix2">
            <span class="system">销售排行</span>
          </div>
          <div class="system-table">
            <el-table :data="tableData" style="width: 100%" height="100%">
              <el-table-column prop="name" label="商品名称" width="180">
              </el-table-column>
              <el-table-column prop="address" label="销量"> </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card3">
          <div slot="header" class="clearfix3">
            <span class="system">缺货商品</span>
          </div>
          <div class="system-table">
            <el-table :data="tableData" style="width: 100%" height="100%">
              <el-table-column prop="date" label="商品名称" width="180">
              </el-table-column>
              <el-table-column prop="name" label="库存" width="180">
              </el-table-column>
              <el-table-column prop="address" label="操作"> </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    hello() {
      alert("Hello World!");
    },
  },
};
</script>

<style scoped>
.system-information,
.box-card {
  width: 100%;
  height: 100%;
}
.son-card {
  width: 100%;
  padding-top: 20px;
  box-sizing: border-box;
  
}
.tow-alter{
  padding-top: 10px;
  box-sizing: border-box;
}
.box-card2,
.box-card3 {
  width: 800px;
}
.box-card2 {
  float: left;
}
.box-card3 {
  float: right;
}
/deep/.el-card__header {
  background-color: rgb(244, 244, 244);
}
.system {
  font-weight: bold;
}
.system-table{
  height: calc(65vh - 144px);
  box-sizing: border-box;
}
</style>