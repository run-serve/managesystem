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
import {Message} from 'element-ui'
router.beforeEach((to, from, next) => {
  const timeOver = 10000;
  const token = window.localStorage.getItem('token');//获取token
  const tokenStartTime = window.localStorage.getItem('tokenStartTime');//获取存储token的开始时间   
  // 如果没有token
  if(!token){
    if(to.path === '/login'){//如果是去登录，就放行
     next(); //放行
    }else{  //否则跳login
      next({path:'/login'});
    }
  }
  if(token){
      // let url = location.href;
      // let urls= url.substring(url.lastIndexOf("/") + 1);
      let date = new Date().getTime();
      if(date - tokenStartTime > timeOver) {// 如果大于说明是token过期了
        window.localStorage.clear(); //如果超过时间清除所有token
        Message.warning("登录状态已过期,请重新登录!")
        next({path:'/login'});
        // console.clear();
      }
      
      else{
        next();
        // this.$router.push("url");
      }
    
    
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
