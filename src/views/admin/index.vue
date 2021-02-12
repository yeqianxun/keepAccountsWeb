<template>
  <div class="admin-container">
    <div class="admin-index-wrapper">
      <el-header>
        <span class="iconfont icon-win10" @click="clickWin10"></span>
        <div class="user-info">
          <span>{{ userInfo.userName }}</span>
          <span class="iconfont icon-quit"></span>
        </div>
      </el-header>
      <el-container>
        <el-aside v-show="isShowSidebar">
          <el-menu class="admin-menu-sidebar" :collapse="isCollapse">
            <template v-for="item in menuList">
              <el-menu-item :key="item.text">
                <i :class="['iconfont', item.icon]"></i>
                <span slot="title">{{ item.text }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
    path() {
      return this.$route.path;
    },
  },
  data() {
    return {
      isShowSidebar: true,
      isCollapse: true,
      menuList: [
        { text: "资产管理", icon: "icon-money" },
        { text: "项目管理", icon: "icon-ProjectInformation" },
        { text: "事务管理", icon: "icon-shiwu" },
        { text: "系统设置", icon: "icon-xingzhuang604" },
      ],
    };
  },
  methods: {
    clickWin10() {
      this.isShowSidebar = !this.isShowSidebar;
    },
  },
};
</script>

<style scoped>
.admin-container {
  height: 100%;
}
</style>

<style lang="scss">
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
  header {
    text-align: left;
    position: relative;
    padding: 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    span {
      &.icon-win10 {
        font-size: 32px;
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        width: 60px;
        text-align: center;
        &:after {
          content: "";
          height: 100%;
          display: inline-block;
          vertical-align: middle;
        }
      }
      &:hover {
        color: #707070;
        cursor: pointer;
      }
    }
    .user-info {
      margin-left: auto;
      span {
        vertical-align: middle;
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
  }
  .el-container {
    height: calc(100% - 60px);
    display: flex;
  }
}
</style>

