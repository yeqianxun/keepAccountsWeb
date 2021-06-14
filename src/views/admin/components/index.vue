<template>
  <div class="admin-index-box">
    <div class="swiper-box">
      <custom-swiper
        :carouselArr="carouselArr"
        :swiperOption="swiperOption"
      ></custom-swiper>
      <search-bar></search-bar>
    </div>
    <div class="admin-index-subtitle">
      <el-carousel indicator-position="outside" direction="vertical">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <h3>{{ item.carousel_text }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <template v-for="item in 3">
      <rent-together :key="item" :houseList="houseList"></rent-together>
    </template>
  </div>
</template>

<script>
import { RentTogether, SearchBar, CustomSwiper } from "./index.js";
export default {
  components: { RentTogether, SearchBar, CustomSwiper },
  data() {
    return {
      carousel: [],
      houseList: [],
      carouselArr: [
        {
          id: "001",
          imgUrl: require("@/assets/images/swiper1.jpg"),
        },
        {
          id: "002",
          imgUrl: require("@/assets/images/swiper2.jpg"),
        },
        {
          id: "003",
          imgUrl: require("@/assets/images/swiper3.jpg"),
        },
      ],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: false,
        onSlideChangeEnd: (swiper) => {
          //放swiper的回调方法
          this.page = swiper.realIndex + 1;
          this.index = swiper.realIndex;
        },
        //左右导航栏
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        //自动播放
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        //指示点
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        //循环
        loop: true,
      },
    };
  },
  created() {
    this.getCarouselText();
    this.$XHR.getAllHouseInfo({}).then((res) => {
      this.houseList = res.data;
    });
  },
  methods: {
    getCarouselText() {
      this.$XHR.getCarouselText({}).then((res) => {
        if (res?.data?.length) {
          this.carousel = res.data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-index-box {
  .swiper-box {
    min-height: 368px;
    height: 420px;
    position: relative;
  }
  .admin-index-subtitle {
    height: 60px;
    line-height: 60px;
    width: 1024px;
    margin: 0 auto;
  }
}
</style>
<style lang="scss">
.admin-index-box {
  .el-carousel.el-carousel--vertical,
  .el-carousel__container {
    height: 100%;
  }
}
</style>
