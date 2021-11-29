// 路由分配文件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
   //登录
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login/Login.vue')
  },
  //后台首页(容器)
  {
    path: '/index',
    component: () => import( '../views/Index/Index.vue'),
    children:[
    //默认系统信息
      {
       path: '',
       name: '',
       component: () => import( '../views/SystemInformation/SystemInformation.vue')
      },
    //账号模块
      {
        path: 'accountadd',
        name: 'accountadd',
        component: () => import( '../views/AccountAdd/AccountAdd.vue')
      },
      {
        path: 'accountmanagement',
        name: 'accountmanagement',
        component: () => import( '../views/AccountManagement/AccountManagement.vue')
      },
      {
        path: 'passwordmodify',
        name: 'passwordmodify',
        component: () => import( '../views/PasswordModify/PasswordModify.vue')
      },
      //商品模块
      {
        path: 'goodsadd',
        name: 'goodsadd',
        component: () => import( '../views/GoodsAdd/GoodsAdd.vue')
      },
      {
        path: 'goddsmanagement',
        name: 'goddsmanagement',
        component: () => import( '../views/GoddsManagement/GoddsManagement.vue')
      },
      //统计管理模块
      {
        path: 'salesstatistics',
        name: 'salesstatistics',
        component: () => import( '../views/SalesStatistics/SalesStatistics.vue')
      },
      {
        path: 'stockstatistics',
        name: 'stockstatistics',
        component: () => import( '../views/StockStatistics/StockStatistics.vue')
      },
      //进货管理模块
      {
        path: 'inventoryadd',
        name: 'inventoryadd',
        component: () => import( '../views/InventoryAdd/InventoryAdd.vue')
      },
      {
        path: 'inventorymanagement',
        name: 'inventorymanagement',
        component: () => import( '../views/InventoryManagement/InventoryManagement.vue')
      },
      //出货管理模块
      {
        path: 'saleslist',
        name: 'saleslist',
        component: () => import( '../views/SalesList/SalesList.vue')
      },
      {
        path: 'outboundgoods',
        name: 'outboundgoods',
        component: () => import( '../views/OutboundGoods/OutboundGoods.vue')
      },
      {
        path: 'goodsreturn',
        name: 'goodsreturn',
        component: () => import( '../views/GoodsReturn/GoodsReturn.vue')
      },
    ],
    
  }
]

const router = new VueRouter({
  mode :'history',
  routes
})

export default router
