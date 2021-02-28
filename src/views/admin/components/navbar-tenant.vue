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
        { index: "2", text: "寻租", icon: "icon-zufang" },
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
  border: 0;
  .iconfont {
    margin-right: 10px;
  }
  .navbar-item {
    font-size: 14px;
    background: #202329 !important;
    border: 0 !important;
    &:hover {
      color: white !important;
      background: #202329 !important;
    }
    &.is-active {
      // background: red;
      background: rgba(15, 17, 15, 0.8)!important;
    }
  }
}
</style>