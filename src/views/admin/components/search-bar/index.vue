<template>
  <div :class="['search-bar-wrapper']">
    <el-input
      placeholder="请输入您的筛选条件"
      v-model="searchText"
      class="main-search"
      @focus="showSearchLabel = true"
      :clearable="true"
      @change="clear"
    >
      <template slot="prepend"
        ><span class="iconfont icon-search"></span
      ></template>
      <template slot="append"><div @click="goSearch">搜索</div></template>
    </el-input>
    <div class="search-labels" v-if="showSearchLabel">
      <p class="search-condition">
        搜索条件：
        <template v-for="(value, key, index) of labelObj">
          <el-tag
            type="success"
            class="label-item"
            closable
            :key="index"
            @close="closeTag(key)"
          >
            {{ value }}
          </el-tag>
        </template>
      </p>
      <search-labels
        ref="searchLable"
        @label-select="labelSelect"
      ></search-labels>
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
  components: {
    SearchLabels,
  },
  data() {
    return {
      searchText: "",
      labelObj: {},
      showSearchLabel: false,
    };
  },
  mounted() {},
  methods: {
    closeTag(prop) {
      this.$delete(this.labelObj, prop);
      this.clear(prop);
    },
    goSearch() {
      let obj = {};
      Object.keys(this.labelObj).forEach((prop) => {
        obj[prop] = encodeURI(this.labelObj[prop]);
      });
      if (this.searchText) {
        obj = {};
        obj.searchText = this.searchText;
      }
      const { href } = this.$router.resolve({
        path: "/admin/find-house",
        query: obj,
      });
      window.open(href, "_blank"); //打开新的窗口
      this.searchText = "";
    },
    labelSelect(objText) {
      Object.keys(objText).forEach((prop) => {
        this.$set(this.labelObj, prop, objText[prop]);
      });
    },
    clear(prop) {
      this.$refs.searchLable.clear(prop);
    },
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
    .label-item {
      display: inline-block;
      height: 30px;
      padding: 2px 6px;
      margin: 0px 4px;
    }
    text-align: left;
    position: absolute;
    bottom: -300px;
    left: 0;
    width: 100%;
    height: 300px;
    background: white;
    box-shadow: 0 0 5px #ccc;
    z-index: 100;
    overflow: auto;
    .search-condition {
      margin: 0;
      padding: 10px 0 0px 20px;
    }
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
