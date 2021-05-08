<template>
  <el-header>
    <router-link to="/" class="logo-link">
      <div class="My-logo">My-logo</div>
    </router-link>
    <slot name="sidebar"></slot>
    <slot name="account"></slot>
    <!-- <component :is="componentName"></component> -->
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
header {
  text-align: left;
  position: fixed;
  padding: 0;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  min-width: 960px;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  z-index: 100;
  .logo-link {
    display: block;
  }
  .My-logo {
    // background: url("~@/assets/images/bzg-logo.png") no-repeat left center;
    cursor: pointer;
    height: 60px;
    width: 200px;
    line-height: 60px;
  }
  span {
    &:hover {
      color: #707070;
      cursor: pointer;
    }
  }
}
</style>
