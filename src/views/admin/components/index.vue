<template>
  <div class="admin-index-box">
    <div class="swiper-box">
      <custom-swiper
        :carouselArr="carouselArr"
        :swiperOption="swiperOption"
      ></custom-swiper>
      <search-bar :HotCity="HotCity"></search-bar>
    </div>
    <div class="admin-index-subtitle">
      <el-carousel indicator-position="outside" direction="vertical">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import SearchBar from "./search-bar";
import CustomSwiper from "./custom-swiper";
export default {
  components: { SearchBar, CustomSwiper },
  data() {
    return {
      HotCity: [],
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
    this.$XHR.getAllCity({}).then((res) => {
      if (res.code == 200 && res.data?.length) {
        this.HotCity = res.data;
      }
    });
  },
  methods: {},
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
  }
}
</style>
<style lang="scss">
.admin-index-box {
  .el-carousel.el-carousel--vertical,
  .el-carousel__container {
    height: 100%;
    border: 1px solid red;
  }
}
</style>
