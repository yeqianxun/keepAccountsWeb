<template>
  <div class="find-house-page">
    <p>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/index' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: $route.path }"
          >房屋查找</el-breadcrumb-item
        >
      </el-breadcrumb>
    </p>
    <p class="find-house-model">
      <span
        @click="changeTab('SelectHouse')"
        :class="['house-model', componentId == 'SelectHouse' ? 'active' : '']"
        >房屋列表</span
      ><span
        @click="changeTab('BaiduMap')"
        :class="['house-model', componentId == 'BaiduMap' ? 'active' : '']"
        >地图找房</span
      >
    </p>
    <component :is="componentId"></component>
  </div>
</template>

<script>
import BaiduMap from "./components/BaiduMap.vue";
import SelectHouse from "./components/SelectHouse.vue";
export default {
  components: {
    BaiduMap,
    SelectHouse,
  },
  data() {
    return {
      componentId: "SelectHouse",
    };
  },
  methods: {
    changeTab(tab) {
      this.componentId = tab;
    },
  },
};
</script>
<style lang="scss" scoped>
.find-house-page {
  text-align: left;
  width: 1240px;
  margin: 0 auto;
  .find-house-model {
    @include flex-center;
    justify-content: flex-start;
    .house-model {
      margin: 4px 8px 4px 0px;
      padding: 4px 8px;
      &.active {
        background: #f0f0f0;
        cursor: pointer;
      }
    }
  }
}
</style>


