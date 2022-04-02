<template >
  <div class="goods-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="system">商品添加</span>
      </div>
      <!-- 面板内容 -->
      <!-- <div class="container"> -->
        <el-form
          :model="goodsAddForm"
          :rules="rules"
          ref="goodsAddForm"
          class="demo-ruleForm"
        >
        <el-form-item label="所属分类" prop="cateName"><br>
            <el-select v-model="goodsAddForm.cateName" clearable  placeholder="- - -选择分类- - -">
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="肉类" value="肉类"></el-option>
              <el-option label="蔬菜类" value="蔬菜类"></el-option>
              <el-option label="生活用品类" value="生活用品类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品条形码" prop="barCode">
            <el-input v-model="goodsAddForm.barCode"></el-input>
          </el-form-item>

            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="goodsAddForm.goodsName" autocomplete="off"></el-input>
            </el-form-item>

            
            <el-form-item label="商品进价" prop="costPrice">
              <el-input v-model="goodsAddForm.costPrice"></el-input>
            </el-form-item>

            
            <el-form-item label="市场价" prop="marketPrice">
              <el-input v-model="goodsAddForm.marketPrice"></el-input>
            </el-form-item>

            
            <el-form-item label="商品售价" prop="salePrice">
              <el-input v-model="goodsAddForm.salePrice"></el-input>
            </el-form-item>

            
            <el-form-item label="入库数量" prop="goodsNum">
              <el-input v-model="goodsAddForm.goodsNum"></el-input>
            </el-form-item>

            
            <el-form-item label="商品重量" prop="goodsWeight">
              <el-input v-model="goodsAddForm.goodsWeight"></el-input>
            </el-form-item>

            <el-form-item label="商品单位" prop="unit"><br>
                <el-select v-model="goodsAddForm.unit" clearable placeholder="- - -选择单位 - - -">
                  <el-option label="个" value="个"></el-option>
                  <el-option label="包" value="包"></el-option>
                  <el-option label="条" value="条"></el-option>
                  <el-option label="支" value="支"></el-option>
                  <el-option label="瓶" value="瓶"></el-option>
                  <el-option label="桶" value="桶"></el-option>
                  <el-option label="袋" value="袋"></el-option>
                </el-select>
              </el-form-item>

          <el-form-item label="会员优惠" prop="discount"><br>
            <el-radio-group v-model="goodsAddForm.discount">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item label="是否促销" prop="promotion"><br>
            <el-radio-group v-model="goodsAddForm.promotion">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="商品简介" prop="goodsDesc">
            <el-input type="textarea" v-model="goodsAddForm.goodsDesc" placeholder="不超过200字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('goodsAddForm')"
              >添加</el-button
            >
            <el-button @click="resetForm('goodsAddForm')">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- </div> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsAddForm: {
        cateName : "",//分类名字
        barCode:"",//商品条形码
        goodsName: "",//商品名称
        costPrice: "",//商品进价
        marketPrice:"",//市场价
        salePrice:"",//商品售价
        goodsNum:"",//入库数量
        goodsWeight:"",//商品重量
        unit:"",//单位
        discount:"",//会员优惠
        promotion:"",//促销
        goodsDesc: "",//商品简介
        // type: [],
      },
      //验证
       rules: {
            barCode:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
               goodsName:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
               costPrice:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
               marketPrice:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
               salePrice:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
              goodsNum:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
               goodsWeight:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
              // discount:[
              // { required: true, message: '请输入商品名称', trigger: 'blur' }
              // ],
              // promotion:[
              // { required: true, message: '请输入商品名称', trigger: 'blur' }
              // ],
               goodsDesc:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
              ],
        }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //浅拷贝
          const list = this.goodsAddForm;
          const params = Object.assign({},list);
          console.log(params);
         this.axios
            .post("/goods/goodsAdd/", params)
            .then((res) => {
              //接受后端数据
             console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error('请完整添加商品数据');
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
};
</script>

<style scoped>
.goods-add,
.box-card {
  width: 100%;
  height: 100%;
}
/deep/.el-card__body{
  height: calc(100vh - 260px);
  overflow: auto;
}
.system {
  font-weight: bold;
}
/deep/.el-card__header {
  background-color: rgb(244, 244, 244);
}
/* 容器 */
.container {
   /* height: calc(100vh - 256px); */
    /* border: 1px red solid; */
}


</style>