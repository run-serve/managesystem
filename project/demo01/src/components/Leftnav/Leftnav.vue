<template>
  <div class="left-nav">
    <!-- 导航组件 -->
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(48, 65, 86)"
      active-text-color="rgb(64, 158, 255)"
      text-color="#fff"
      unique-opened
      router
    >
    <el-submenu 
    v-for="(menu, index) in menuData" 
    :key="index" 
    :index="(index + 1) + ''"
    >
        <template slot="title">
            <span class="icon iconfont" v-html="menu.icon_code"></span>
            <span>{{menu.menuTitle}}</span>
        </template> 
        <el-menu-item 
            v-for="(subMenu, index) in menu.children"
            :key="index"
            :index="subMenu.path"
            >
            {{subMenu.subMenuTitle}}
        </el-menu-item>  
    </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //导航数据
      menuData: [
        //系统信息
        {
          menuTitle: "系统管理",
          icon_code: "&#xe835",
          children: [
            {
              path: "/index",
              subMenuTitle: "系统信息",
            },
          ],
        },
        //账号管理
        {
          menuTitle: "账号管理",
          icon_code: "&#xe71b",
          children: [
            {
              path: "/index/accountmanagement",
              subMenuTitle: "账号管理",
            },
            {
              path: "/index/accountadd",
              subMenuTitle: "账号添加",
            },
            {
              path: "/index/passwordmodify",
              subMenuTitle: "密码修改",
            },
          ],
        },
        //商品管理
        {
          menuTitle: "商品管理",
          icon_code: "&#xe65d",
          children: [
            {
              path: "/index/goddsmanagement",
              subMenuTitle: "商品管理",
            },
            {
              path: "/index/goodsadd",
              subMenuTitle: "商品添加",
            },
          ],
        },
        //统计管理
        {
          menuTitle: "统计管理",
          icon_code: "&#xe83f",
          children: [
            {
              path: "/index/salesstatistics",
              subMenuTitle: "销售统计",
            },
            {
              path: "/index/stockstatistics",
              subMenuTitle: "进货统计",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less">
@import "./Leftnav.less";
</style>