<template>
  <el-menu
    :default-active="path"
    class="navbar-admin"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-for="(item, index) in navbarList">
      <el-menu-item
        :index="item.path"
        :key="index"
        @click="LinkTo(item.path)"
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
          <el-menu-item
            @click="LinkTo(item.path)"
            :key="index + '-' + k"
            :index="index + '-' + k"
            >{{ childItem.text }}</el-menu-item
          >
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.path,
      navbarList: [
        {
          index: "1",
          text: "首页",
          icon: "icon-home-def",
          path: "/admin/index",
        },
        {
          index: "2",
          text: "租房",
          icon: "icon-zufang",
          path: "/admin/find-house",
        },
        // {
        //   index: "3",
        //   text: "产品动态",
        //   icon: "icon-dongtai",
        //   path: "/admin/product-status",
        // },
        // {
        //   index: "4",
        //   text: "联系我们",
        //   icon: "icon-lianxiwomen1",
        //   path: "/admin/contact-us",
        // },
        {
          index: "5",
          text: "账户设置",
          icon: "icon-xingzhuang604",
          path: "/admin/account-setting",
        },
      ],
    };
  },
  methods: {
    handleSelect() {},
    LinkTo(path) {
      if (path == this.path) return;
      this.path = path;
      this.$router.push({ path });
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar-admin {
  margin-left: auto;
  // background: #202329;
  .iconfont {
    margin-right: 10px;
  }
  .navbar-item {
    font-size: 16px;
    &:hover {
      // color: white !important;
      background: transparent !important;
    }
  }
}
</style>
<style lang="scss">
.navbar-admin {
  // .el-menu-item.is-active {
  //   color: #409eff !important;
  // }
}
</style>