<template>
  <el-menu
    :default-active="activeIndex"
    class="navbar-admin"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-for="(item, index) in navbarList">
      <el-menu-item
        :index="item.index"
        :key="index"
        v-if="!item.children"
        class="navbar-item"
      >
        <i :class="['iconfont', item.icon]"></i>{{ item.text }}
      </el-menu-item>
      <el-submenu
        :key="index"
        :index="item.index"
        v-if="item.children && item.children.length"
      >
        <template slot="title">
          <i :class="['iconfont', item.icon]"></i>{{ item.text }}
        </template>
        <template v-for="(childItem, k) in item.children">
          <el-menu-item :key="index + '-' + k" :index="index + '-' + k">{{
            childItem.text
          }}</el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      navbarList: [
        { index: "1", text: "首页", icon: "icon-home-def" },
        { index: "2", text: "租房", icon: "icon-zufang" },
        { index: "3", text: "产品动态", icon: "icon-dongtai" },
        { index: "4", text: "联系我们", icon: "icon-lianxiwomen1" },
        { index: "5", text: "账户设置", icon: "icon-xingzhuang604" },
      ],
    };
  },
  methods: {
    handleSelect() {},
  },
};
</script>
<style lang="scss" scoped>
.navbar-admin {
  margin-left: auto;
  background: #202329;
  .iconfont {
    margin-right: 10px;
  }
  .navbar-item {
    font-size: 16px;
    &:hover {
      color: white !important;
      background: transparent !important;
    }
  }
}
</style>
<style lang="scss">
.navbar-admin {
  .el-menu-item.is-active {
        color: #409EFF!important;
  }
}
</style>