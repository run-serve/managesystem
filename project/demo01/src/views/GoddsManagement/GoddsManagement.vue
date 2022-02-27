<template >
  <div class="goods-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="system">商品管理</span>
      </div>
      <!-- 面板内容 -->
      <div class="container">
        <div class="query">
          <el-select v-model="value" clearable @change="find" placeholder="- - -选择分类- - -">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span style="margin-left: 20px">关键字：</span>
          <span>
            <el-input
              style="width: 290px"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input"
            >
            </el-input>
          </span>
          <span style="margin-left: 10px">(商品名称,条形码)</span>
          <span style="margin-left: 10px"
            ><el-button type="success" size="small">查询</el-button></span
          >
        </div>
        <div class="splitLine"></div>
        <!-- 表格 -->
        <div class="text-item">
          <el-table :data="tableData" style="width: 100%" height="100%">
            <el-table-column prop="id" label="商品条形码" width="200"> </el-table-column>
            <el-table-column prop="name" label="商品名称" > </el-table-column>
            <el-table-column prop="classify" label="所属分类"> </el-table-column>
            <el-table-column prop="price" label="售价(元)"> </el-table-column>
            <el-table-column prop="promotionPrice" label="促销价(元)"> </el-table-column>
            <el-table-column prop="marketprice" label="市场价(元)"> </el-table-column>
            <el-table-column prop="inventory" label="库存"> </el-table-column>
            <el-table-column prop="capital" label="库存总额(元)"> </el-table-column>
            <el-table-column prop="salesRental" label="销售总额(元)"> </el-table-column>
            <el-table-column  label="管理">
               
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <span style="float:left" class="left">
          <el-link type="success">首页&nbsp;&nbsp;</el-link>
          <el-link type="success">上一页&nbsp;&nbsp;</el-link>
          </span>
          <div style="display: inline-block;">
          <el-pagination background layout="prev, pager, next" :total="1000" >
          </el-pagination>
          </div>
          <span class="left">
          <el-link type="success">&nbsp;&nbsp;下一页</el-link>
          <el-link type="success">&nbsp;&nbsp;尾页</el-link>
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      tableData: [
      { id: '12987122',
        name: '好滋好味鸡蛋仔',
        classify:'小吃',//所属分类
        price:'5.00',//售价
        promotionPrice:'3.00',//促销价
        marketprice:'3.50',//市场价
        inventory:'30',//库存
        capital:'30.00',//库存总额
        salesRental:'45.00'//销售总额
      }
      ],
      //
      input: "",
      //
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      one:'',
    };
  },
  methods: {
    find(){
      let params = {
          one : this.value
      }
      console.log(params);
    },
  },
  created() {
    this.axios
      .get("/goods/goodsmanagement")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.goods-management,
.box-card {
  width: 100%;
  height: 100%;
}
.system {
  font-weight: bold;
}
/deep/.el-card__header {
  background-color: rgb(244, 244, 244);
}
.container {
  height: calc(100vh - 265px);
}
.query {
  padding: 10px 0 20px 0;
  box-sizing: border-box;
  border-bottom: 1px rgb(209, 209, 209);
}
.splitLine {
  height: 1px;
  border: 1px rgb(209, 209, 209);
  border-style: dashed;
}
/* 选择框 */
.el-select >>> .el-input__inner {
  text-align: center;
}
/* 表格 */
.text-item {
  height: calc(100vh - 400px);
  box-sizing: border-box;
}
/* 分页 */
.paging {
  padding: 25px 0 20px 0;
  /* border: 1px solid red; */
  bottom: 0;
}
.left {
    line-height: 32px;
}

</style>