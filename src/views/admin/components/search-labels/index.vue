<template>
  <div class="search-labels-detail">
    <div class="city">
      <p><span class="icon-aui-icon-location iconfont"></span> 热门城市:</p>
      <div class="cities">
        <template v-for="item in citys">
          <span class="city-item" :key="item.cid">{{ item.cityname }}</span>
        </template>
      </div>
      <p><span class="icon-aui-icon-location iconfont"></span> 区域:</p>
      <div class="region">
        <el-radio-group v-model="region">
          <template v-for="city in citys">
            <el-radio-button
              :key="city.cid"
              :label="city.cityname"
            ></el-radio-button>
          </template>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    citys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      city: "",
      region: "",
    };
  },
  methods: {
    cityChange(val) {
      console.log("val----", val, this.city);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-labels-detail {
  .city {
    text-align: left;
    .cities {
      border: 1px solid red;
      display: flex;
      flex-wrap: nowrap;
      .city-item {
        display: inline-block;
        padding: 3px 5px;
        margin: 3px 5px;
        border: 1px solid #ccc;
      }
    }
  }
  .iconfont {
    font-size: 24px;
  }
}
</style>
<style lang="scss">
</style>
