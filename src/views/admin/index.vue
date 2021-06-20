<template>
  <div class="admin-container">
    <div class="admin-index-wrapper">
      <custom-header>
        <component :is="componentName" slot="sidebar"></component>

        <div class="user-info" slot="account">
          <img
            class="avator"
            :src="userInfo.avator"
            :title="userInfo.username"
            :alt="userInfo.username"
          />
          <span class="iconfont icon-quit" @click="loginOut"></span>
        </div>
      </custom-header>
      <el-container>
        <el-main>
          <transition name="slide-fade" mode="out-in">
            <router-view :key="path"></router-view>
          </transition>
          <footer-info />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavbarHouseOwner from "./components/navbar-house-owner";
import NavbarTenant from "./components/navbar-tenant";
import FooterInfo from "./components/footer-info";
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
    FooterInfo,
  },
  created() {
    this.$store.dispatch("label/GET_HOUSE_LABEL");
  },
  data() {
    return {
      componentName: "NavbarTenant",
    };
  },
  methods: {
    loginOut() {
      window.localStorage.removeItem("token");
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-container {
  height: 100%;
  margin-top: 65px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
  // padding-top: 100px;
  opacity: 0;
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
    display: flex;
    align-items: center;
    .avator {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
    }
    span {
      padding: 0 4px;
      color: #909399;
      cursor: pointer;
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

