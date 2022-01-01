// 人口文件
import Vue from 'vue'
//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//公用样式
import './assets/styles/css/Base.less'
//iconfont样式
import './assets/styles/css/iconfont.css';
import './assets/styles/css/demo.css';

import App from './App.vue'
import router from './router'

//封装axios
import request  from './api/request'
// 把request挂载Vue的原型上 所有vue实例对象共享
Vue.prototype.axios = request;




Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
