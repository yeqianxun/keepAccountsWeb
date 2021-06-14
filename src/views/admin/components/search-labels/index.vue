<template>
  <div class="search-labels-detail">
    <div class="city">
      <p></p>
      <p><span class="icon-aui-icon-location iconfont"></span> 热门城市:</p>
      <div class="cities">
        <template v-for="item in houselabels.cities">
          <span
            @click="changeCity(item)"
            :class="['city-item', item.cid == cid ? 'selected' : '']"
            :key="item.cid"
            >{{ item.cityname }}</span
          >
        </template>
      </div>

      <div class="region" v-if="regions.length">
        <template v-for="item in regions">
          <span
            :class="[
              'region-item',
              item.regionid == regionId ? 'selected' : '',
            ]"
            :key="item.regionid"
            @click="regionChange(item)"
          >
            {{ item.region_name }}</span
          >
        </template>
      </div>
      <template v-for="(item, index) in labels">
        <div :key="index" class="label-items">
          <p>
            <span :class="['iconfont custom-icon', item.icon]"></span
            >{{ item.text }}
          </p>
          <div class="rent_price">
            <el-radio-group v-model="item.propName">
              <template v-for="(child, k) in item.values">
                <el-radio :key="k" :label="child"></el-radio>
              </template>
            </el-radio-group>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  watch: {
    "houselabels.cities": {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.length) {
          this.cid = val[0]?.cid;
          this.regionId = val[0]?.cityregions[0]?.regionid;
        }
      },
    },
  },
  computed: {
    ...mapGetters(["houselabels"]),
    regions() {
      return (
        (this.cid &&
          this.houselabels?.cities?.find((item) => item.cid == this.cid)
            ?.cityregions) ||
        []
      );
    },
  },
  data() {
    return {
      cid: "",
      regionId: "",
      housePrice: "",
      square: "",
      layout: "",
      labels: [
        {
          propName: "housePrice",
          text: "租金：",
          icon: "icon-money",
          values: [
            "1000-1500¥",
            "1500-2000¥",
            "2000-4000¥",
            "4000-5000¥",
            "5000-10000¥",
          ],
        },
        {
          propName: "square",
          text: "面积：",
          icon: "icon-project",
          values: ["50-80㎡", "80-100㎡", "100-120㎡", "120-150㎡"],
        },
        {
          propName: "layout",
          text: "布局：",
          icon: "icon-project1",
          values: ["一居室", "二居室", "三居室", "四居室", "四居室以上"],
        },
      ],
    };
  },
  methods: {
    regionChange(val) {
      this.regionId = val.regionid;
    },
    changeCity(val) {
      this.cid = val.cid;
      this.regionId = this.houselabels.cities.find(
        (item) => item.cid == val.cid
      ).cityregions[0]?.regionid;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-labels-detail {
  padding: 10px 20px;
  .city {
    text-align: left;
    .cities {
      display: flex;
      flex-wrap: nowrap;
      @at-root .city-item,
        .region-item,
        .rent_price {
        display: inline-block;
        padding: 3px 5px;
        margin: 3px 5px;
        border-radius: 2px;
        cursor: pointer;
        &.selected {
          background: #00d7c6;
          color: white;
        }
      }
    }
  }
  .iconfont {
    font-size: 24px;
  }
}
</style>
<style lang="scss">
.search-labels-detail {
  .custom-icon {
    margin-right: 15px;
    font-size: 20px !important;
  }
  .label-items {
    margin-top: 15px;
    p {
      margin: 6px;
    }
  }
  .el-radio__inner {
    border-radius: 0;
  }
  .el-radio {
    margin: 5px 30px 5px 0;
  }
}
</style>
