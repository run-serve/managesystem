// 人口文件
import Vue from 'vue'
//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//公用样式
import './assets/styles/css/Base.less'

import App from './App.vue'
import router from './router'


Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
