<template >
  <div class="stock-statistics">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="system">进货统计</span>
      </div>
      <!-- 面板内容 -->
      <div class="text-item">
        <div class="block">
          <span class="demonstration">时间&nbsp;：&nbsp;</span>
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            @change="salesReports"
          >
          </el-date-picker>
        </div>
        <!-- 具备宽高的容器 -->
        <div class="container" id="box"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";//Js日期处理类库
export default {
  data() {
    return {
      value2: "",
      starTime: null, //开s始时间
      endTime: null, //结束时间
    };
  },
  methods: {
    salesReports(val) {
      if (val) {
        this.starTime = val[0], 
        this.endTime = val[1];
        //  console.log(this.starTime);
        //  console.log(this.endTime);
      } else {
        this.starTime = 0,
        this.endTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"); //日期处理并赋值
        console.log(this.starTime);
        console.log(this.endTime);
      }
      //选中dom,使用echarts初始化
      const myCharts = this.$echarts.init(document.getElementById("box"));
      // console.log(myCharts);
      // 收集数据
      let params = {
        starTime: this.starTime,
        endTime: this.endTime,
      };
      //发axios拿数据
      this.axios
        .post("/sales/salesdata", params)
        .then((res) => {
          let sales = {
            ctimeArr: [],
            values: [],
          };
          //循环数组
          res.forEach((ietm) => {
            sales.ctimeArr.push(moment(ietm.ctime).format("YYYY-MM-DD")); //赋值给对象数组并做时间格式化处理
            sales.values.push(ietm.values);
          });
          // console.log(sales);
          // option.xAxis.data = sales.ctimeArr;
          // console.log(option.xAxis.data);
          // option.series.data = sales.values;
          // console.log(option.series.data);

          // 报表 配置
          const option = {
            tooltio: {
              //提示
              show: true,
            },
            legend: {
              //图例
              data: ["进货"],
            },
            xAxis: {
              //x轴
              type: "category",
              data: sales.ctimeArr,
            },
            yAxis: {
              //y轴
              type: "value",
            },
            series: [
              //核心配置
              {
                name: "进货",
                type: "bar",
                data: sales.values,
              },
            ],
          };
          // 使用数据生成报表
          myCharts.setOption(option);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // 生命周期  钩子函数（created是实例初始化完成，但是还没挂载dom，适合去发ajax；mounted是实例已经创建完成，挂载dom完成，适合操作dom）
  mounted() {
    this.salesReports();
  },
};
</script>

<style scoped>
.stock-statistics,
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
/* 选择时间 */
.block {
  margin-left: 123px;
}
/* 容器 */
.container {
  height: calc(100vh - 300px);
}
</style>