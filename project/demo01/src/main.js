// 人口文件
import Vue from 'vue'
//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入excel插件
import XLSX from 'xlsx'

//公用样式
import './assets/styles/css/Base.less'
//iconfont样式
import './assets/styles/css/iconfont.css';
import './assets/styles/css/demo.css';

import App from './App.vue'
import router from './router'

//引入echarts
import * as echarts from 'echarts'

//封装axios
import request  from './api/request'
// 把request挂载Vue的原型上 所有vue实例对象共享
Vue.prototype.axios = request;

Vue.prototype.XLSX = XLSX;

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.config.productionTip = false

//路由拦截
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');//获取token
  //如果没有token
  if(!token){
    //如果是去登录，就放行，否则跳login
    if(to.path === '/login'){
     next(); //放行
    }else{
      next({path:'/login'});
    }
  }else{
    next(); //放行
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
