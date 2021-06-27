<template>
  <div class="rent-together">
    <h2>{{ hosueType }}</h2>
    <p class="text">...为您提供大量的租房信息合租房信息..</p>
    <section class="house-list">
      <template v-for="item in HouseList">
        <router-link
          :to="`/admin/house-detail/${item.house_id}`"
          target="_blank"
          class="house-info"
          :key="item.house_id"
        >
          <img :src="item.houseimgs.length && item.houseimgs[0].url" alt="" />
          <div class="house-info-detail">
            <h4 class="house-desc">{{ item.desc }}</h4>
            <p>
              {{ item.address }}/{{ item.layout }}/{{ item.house_square }}㎡
            </p>
            <p class="house-price">{{ item.house_price }}¥/月</p>
            <img
              class="house-owner-avator"
              :src="item.user && item.user.avator"
              alt=""
            />
          </div>
        </router-link>
      </template>
    </section>
    <router-link to="/admin/find-house" class="load-more"
      >加载更多...</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    hosueType: {
      type: String,
      default: "",
    },
    HouseList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.rent-together {
  h2 {
    width: 1024px;
    margin: 0 auto;
  }
  .text {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .load-more {
    display: block;
    width: 280px;
    height: 50px;
    text-align: center;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    margin: 30px auto;
    line-height: 48px;
    color: #333;
    cursor: pointer;
    &:hover {
      color: #fff;
      border-color: #ff5a5f;
      background: #ff5a5f;
    }
  }
  .house-list {
    height: 275px;
    width: 1240px;
    margin: 0 auto;
  }
  .house-info {
    position: relative;
    width: 275px;
    height: 275px;
    margin: 15px;
    margin-top: 0;
    border: 1px solid #e5e5e5;
    font-size: 0;
    cursor: pointer;
    float: left;
    &:hover {
      box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
    }
    .house-info-detail {
      position: relative;
      height: 80px;
      font-size: 16px;
      text-align: left;
      padding: 0 15px;
      box-sizing: border-box;
      p {
        margin: 0;
      }
      .house-owner-avator {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        position: absolute;
        bottom: 5px;
        left: 15px;
      }
    }
    .house-desc {
      color: #333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .house-price {
      text-align: right;
      font-size: 18px;
      font-weight: 700;
      color: #ff5a5f;
    }
    p {
      font-size: 14px;
      color: #333;
    }
    img {
      width: 100%;
      height: 195px;
    }
  }
}
</style>
