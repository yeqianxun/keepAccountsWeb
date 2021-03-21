<template>
  <el-header>
    <router-link to="/" class="logo-link">
      <div class="web-logo"></div>
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
  position: relative;
  padding: 0;
  display: flex;
  // background-color: #202329;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 0 5px #ccc;
  .logo-link {
    display: block;
  }
  .web-logo {
    background: url("~@/assets/images/bzg-logo.png") no-repeat left center;
    cursor: pointer;
    height: 60px;
    width: 200px;
  }
  span {
    &:hover {
      color: #707070;
      cursor: pointer;
    }
  }

}
</style>
