// 路由分配文件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //默认根目录
  {
    path:'/',
    redirect:'/login'//路由重定向
  },
   //登录
  {
    path: '/login',//路径
    name: 'login',//名字
    component: () => import( '../views/Login/Login.vue')//路径对应的组件
  },
  //后台首页(容器)
  {
    path: '/index',
    component: () => import( '../views/Index/Index.vue'),
    //二级路由
    children:[
    //默认系统信息
      {
       path: '',
       name: '',
       component: () => import( '../views/SystemInformation/SystemInformation.vue')
      },
    //账号模块
      {
        path: '/index/accountadd',
        name: 'accountadd',
        component: () => import( '../views/AccountAdd/AccountAdd.vue')
      },
      {
        path: '/index/accountmanagement',
        name: 'accountmanagement',
        component: () => import( '../views/AccountManagement/AccountManagement.vue')
      },
      {
        path: '/index/passwordmodify',
        name: 'passwordmodify',
        component: () => import( '../views/PasswordModify/PasswordModify.vue')
      },
      //商品模块
      {
        path: '/index/goodsadd',
        name: 'goodsadd',
        component: () => import( '../views/GoodsAdd/GoodsAdd.vue')
      },
      {
        path: '/index/goddsmanagement',
        name: 'goddsmanagement',
        component: () => import( '../views/GoddsManagement/GoddsManagement.vue')
      },
      //统计管理模块
      {
        path: '/index/salesstatistics',
        name: 'salesstatistics',
        component: () => import( '../views/SalesStatistics/SalesStatistics.vue')
      },
      {
        path: '/index/stockstatistics',
        name: 'stockstatistics',
        component: () => import( '../views/StockStatistics/StockStatistics.vue')
      },
      //进货管理模块
      {
        path: '/index/inventoryadd',
        name: 'inventoryadd',
        component: () => import( '../views/InventoryAdd/InventoryAdd.vue')
      },
      {
        path: '/index/inventorymanagement',
        name: 'inventorymanagement',
        component: () => import( '../views/InventoryManagement/InventoryManagement.vue')
      },
      //出货管理模块
      {
        path: '/index/saleslist',
        name: 'saleslist',
        component: () => import( '../views/SalesList/SalesList.vue')
      },
      {
        path: '/index/outboundgoods',
        name: 'outboundgoods',
        component: () => import( '../views/OutboundGoods/OutboundGoods.vue')
      },
      {
        path: '/index/goodsreturn',
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
