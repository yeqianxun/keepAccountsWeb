<template>
  <div class="search-labels-detail">
    <div class="city">
      <p></p>
      <p><span class="icon-aui-icon-location iconfont"></span> 热门城市:</p>
      <div class="cities">
        <template v-for="item in houselabels.cities">
          <span
            @click="changeCity(item)"
            :class="['city-item', item.cid == formObj.cid ? 'selected' : '']"
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
              item.regionid == formObj.regionId ? 'selected' : '',
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
            <el-radio-group
              v-model="formObj[item.propName]"
              @change="RadioGroupChange"
            >
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
  // watch: {
  //   "houselabels.cities": {
  //     deep: true,
  //     immediate: true,
  //     handler(val) {
  //       if (val.length) {
  //         this.formObj.cid = val[0]?.cid;
  //         this.formObj.regionId = val[0]?.cityregions[0]?.regionid;
  //       }
  //     },
  //   },
  // },
  computed: {
    ...mapGetters(["houselabels"]),
    regions() {
      return (
        (this.formObj.cid &&
          this.houselabels?.cities?.find((item) => item.cid == this.formObj.cid)
            ?.cityregions) ||
        this.houselabels.cities[0].cityregions ||
        []
      );
    },
  },
  data() {
    return {
      formObj: {
        cid: "",
        regionId: "",
        housePrice: "",
        square: "",
        layout: "",
      },
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
    clear(prop) {
      prop && (this.formObj[prop] = "");
      if (!prop) {
        Object.keys(this.formObj).forEach((prop) => {
          this.formObj[prop] = "";
        });
      }
    },
    regionChange(val) {
      this.formObj.regionId = val.regionid;
      this.RadioGroupChange();
    },
    changeCity(val) {
      this.formObj.cid = val.cid;
      this.formObj.regionId = this.houselabels.cities.find(
        (item) => item.cid == val.cid
      ).cityregions[0]?.regionid;
      this.RadioGroupChange();
    },
    RadioGroupChange() {
      let obj = {};
      if (this.formObj.cid && this.formObj.regionId) {
        let cityobj = this.houselabels.cities.find(
          (city) => city.cid == this.formObj.cid
        );
        let cityname = cityobj.cityname;
        let region = cityobj.cityregions.find(
          (region) => region.regionid == this.formObj.regionId
        ).region_name;
        obj.area = cityname + "-" + region;
      }
      if (this.formObj.layout) {
        obj.layout = this.formObj.layout;
      }
      if (this.formObj.housePrice) {
        obj.housePrice = this.formObj.housePrice;
      }
      if (this.formObj.square) {
        obj.square = this.formObj.square;
      }
      this.$emit("label-select", obj);
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
