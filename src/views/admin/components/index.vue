<template>
  <div class="admin-index-box">
    <div class="swiper-box">
      <custom-swiper
        :carouselArr="carouselArr"
        :swiperOption="swiperOption"
      ></custom-swiper>
      <search-bar></search-bar>
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
  methods: {},
};
</script>
<style lang="scss">
.admin-index-box {
  .swiper-box {
    min-height: 368px;
    height: 420px;
    position: relative;
  }
}
</style>
