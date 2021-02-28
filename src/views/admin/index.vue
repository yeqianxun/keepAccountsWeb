<template>
  <div class="admin-container">
    <div class="admin-index-wrapper">
      <custom-header>
        <component :is="componentName" slot="sidebar"></component>
        <div class="user-info" slot="account">
          <span>{{ userInfo.userName }}</span>
          <span class="iconfont icon-quit"></span>
        </div>
      </custom-header>
      <el-container>
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <router-view :key="path"></router-view>
          </transition>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavbarHouseOwner from "./components/navbar-house-owner";
import NavbarTenant from "./components/navbar-tenant";
import CustomHeader from "@/views/header";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
    path() {
      return this.$route.path;
    },
  },
  components: {
    NavbarHouseOwner,
    NavbarTenant,
    CustomHeader,
  },
  data() {
    return {
      componentName: "NavbarTenant",
    };
  },
  methods: {},
};
</script>

<style scoped>
.admin-container {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.admin-index-wrapper {
  height: 100%;
  .el-aside {
    width: 64px !important ;
    .admin-menu-sidebar {
      height: 100%;
      width: 63px !important;
      i.iconfont {
        font-size: 18px;
      }
    }
  }
  .user-info {
    span {
      vertical-align: middle;
      color: #909399;
      &:last-child {
        margin-right: 15px;
        margin: 0 15px;
      }
    }
    &::after {
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
  .el-container {
    height: calc(100% - 60px);
    display: flex;
  }
}
</style>

