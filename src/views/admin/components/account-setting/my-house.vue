<template>
  <div class="my-house-list" v-loading="loading">
    <template v-for="item in myHouseList">
      <el-card class="house-item" :key="item.house_id">
        <router-link
          target="_blank"
          class="jump-house-detail"
          :to="`/admin/house-detail/${item.house_id}`"
        >
          <h4>{{ item.desc }}</h4>
          <img :src="item.houseimgs[0].url" class="image" />
          <p class="house-base-info">
            <span class="base-info-item">位置：{{ item.address }}</span>
            <span class="base-info-item">面积:{{ item.house_square }}㎡</span>
            <span class="base-info-item"
              >出租状态:{{ item.status == "0" ? "未" : "已" }}出租</span
            >
          </p>
          <p class="house_rent_price">{{ item.house_price }}¥/月</p>
        </router-link>
        <el-button @click.native="editHouse(item)">编辑</el-button>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myHouseList: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.$XHR.getMyHouse({}).then((res) => {
      this.myHouseList = (res.data?.length && res.data) || [];
      this.loading = false;
    });
  },
  methods: {
    editHouse(item) {
      console.log(item);
      this.$message.info("编辑我的房屋信息");
    },
  },
};
</script>

<style lang="scss" scoped>
.my-house-list {
  height: 480px;
  overflow: auto;
  text-align: left;
  .house-item {
    height: 180px;
    margin: 10px 30px;
    box-shadow: 0 0 0;
    .jump-house-detail {
      color: $TextBaseColor_2;
    }
    img {
      width: 120px;
      height: 80px;
      float: right;
    }
    .house_rent_price {
      color: $TextBaseColor_1;
      font-weight: 600;
    }
    .base-info-item {
      display: inline-block;
      margin: 0 15px 0 0;
    }
  }
}
</style>

