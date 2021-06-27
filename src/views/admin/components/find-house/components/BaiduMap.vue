<template>
  <div class="baidu-map">
    <el-input
      v-model="addressKeyword"
      placeholder="请输入地址来直接查找相关位置"
    ></el-input>
    <baidu-map
      class="bmView"
      :scroll-wheel-zoom="true"
      :center="location"
      :zoom="zoom"
      style="height: 480px"
      @click="getLocationPoint"
      ak="N5HpU1no1HpkKfveodTs6RiNwLohY2s8"
      @ready="handler"
    >
      <bm-view style="width: 100%; height: 480px; flex: 1"></bm-view>
      <bm-local-search
        :keyword="addressKeyword"
        :auto-viewport="true"
        style="display: none"
      ></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView.vue";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue";
export default {
  components: {
    BaiduMap,
    BmView,
    BmLocalSearch,
  },
  data() {
    return {
      location: {
        lng: 116.404,
        lat: 39.915,
      },
      zoom: 12.8,
      addressKeyword: "",
      BMap: null,
      map: null,
    };
  },
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    getLocationPoint(e) {
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      let geoCoder = new this.BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, (point) => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point).then((res) => {
        console.log("log----", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.baidu-map {
  height: calc(100vh - 200px);
}
</style>