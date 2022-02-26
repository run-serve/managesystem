<template >
  <div class="system-information">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="system">系统信息</span>
      </div>

      <div>
        <!-- #67C23A -->
        <el-alert type="info" show-icon  @close="hello">
          <span style="font-size:13px">
            商品总数:{{ total }}&nbsp;&nbsp;
            已销售的总金额:{{ 9999 }}&nbsp;&nbsp;
            库存商品总价:{{ 1234 }}
          </span>
        </el-alert>
        <div class="tow-alter">
          <el-alert type="info" show-icon :closable="false">
            <!-- 导入Excel -->
            <el-upload
              action=""
              :on-change="handleChange"
              :file-list="fileListUpload"
              :show-file-list="false"
              accept=".xls,.xlsx"
              :auto-upload="false"
            >
              <el-button
                class="importBtn"
                size="mini"
                type="success"
                :loading="disbtn"
                icon="el-icon-upload"
                >数据导入</el-button
              >
            </el-upload>
          </el-alert>
        </div>
      </div>

      <div class="son-card">
        <el-card class="box-card2">
          <div slot="header" class="clearfix2">
            <span class="system">销售排行</span>
          </div>
          <div class="system-table">
            <el-table :data="tableData" height="100%">
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
            <el-table :data="tableDataTwo" height="100%">
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
      tableData: [],
      tableDataTwo:[],
      fileListUpload: [],
      disbtn: false,
      total:"",//商品总数
      totalAmount:"",//销售总金额
      totalInventoryPrice:"",//库存总价
    };
  },
  methods: {
    hello() {
      alert("Hello World!");
    },
    // 上传附件
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      this.doBegin();
      // this.informationAggregation();
    },
    //判断上传的文件格式
    doBegin() {
      if (
        this.fileTemp.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        this.fileTemp.type == "application/vnd.ms-excel"
      ) {
        this.disbtn = true;
        this.importfxx(this.fileTemp);
      } else {
        this.$message({
          type: "warning",
          message: "附件格式错误，请删除后重新上传！",
        });
      }
    },
    // Excel 转化
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; // 是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; // 是否将文件读取为二进制字符串
        var pt = this;
        var wb; // 读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              // 手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); // outdata就是你想要的东西
          this.da = [...outdata];
          let arr = [];
          this.da.map((v) => {
            let obj = {};
            obj.name = v["姓名"];
            obj.address = v["年龄"];
            arr.push(obj);
            _this.tableData = [...arr];
            this.total = _this.tableData.length;
            _this.informationAggregation(this.total);
            _this.disbtn = false;
          });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    informationAggregation(count){
      // console.log(count);
      this.total = count;
    }
  },
  created(){
    this.informationAggregation(0);
  }
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
  clear: both;
}
.tow-alter {
  padding-top: 10px;
  box-sizing: border-box;
}
.box-card2,
.box-card3 {
  width: calc(100vh - 150px);
  display: inline-block;
}
/* .box-card2 {
  float: left;
} */
.box-card3 {
  float: right;
}
/deep/.el-card__header {
  background-color: rgb(244, 244, 244);
}
.system {
  font-weight: bold;
}
.system-table {
  height: calc(100vh - 465px);
  box-sizing: border-box;
}
/* 导入按钮 */
.importBtn{
  margin: 0;
  padding: 0;
  height:26px;
  width: 80px;
}
/* alter */
.el-alert{
  background-color:#f0f9eb;
}
.el-alert--info.is-light{
  color: pink;
}
</style>