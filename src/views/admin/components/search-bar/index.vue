<template>
  <div :class="['search-bar-wrapper']">
    <el-input
      placeholder="请输入您的筛选条件"
      v-model="searchText"
      class="main-search"
      @focus="showSearchLabel = true"
    >
      <template slot="prepend"
        ><span class="iconfont icon-search"></span
      ></template>
      <template slot="append" @click="goSearch">搜索</template>
    </el-input>
    <div class="search-labels" v-show="showSearchLabel">
      <search-labels :citys="HotCity"></search-labels>
    </div>
    <div
      class="mask"
      v-show="showSearchLabel"
      @click="showSearchLabel = false"
    ></div>
  </div>
</template>


<script>
import SearchLabels from "../search-labels";
export default {
  props: {
    HotCity: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SearchLabels,
  },
  data() {
    return {
      searchText: "",
      showSearchLabel: false,
    };
  },
  mounted() {},
  methods: {
    goSearch() {},
  },
};
</script>

<style lang="scss" scoped>
.search-bar-wrapper {
  height: 60px;
  width: 800px;
  position: absolute;
  bottom: 100px;
  border-radius: 4px;
  z-index: 100;
  left: calc(50% - 400px);
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    z-index: 99;
  }
  .search-labels {
    position: absolute;
    bottom: -300px;
    left: 0;
    width: 100%;
    height: 300px;
    background: white;

    z-index: 100;
  }
}
</style>
<style lang="scss">
.main-search {
  height: 100%;
  position: relative;
  z-index: 100;
  .el-input-group__prepend {
    padding: 0 10px;
    .icon-search {
      font-size: 20px;
    }
  }
  .el-input-group__prepend,
  .el-input-group__append {
    background: white;
    border: 0;
  }
  .el-input-group__append {
    background: #ff5a5f;
    color: white;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
  }
  .el-input__inner {
    height: 60px;
    border: 0;
    outline: 0;
  }
}
</style>
