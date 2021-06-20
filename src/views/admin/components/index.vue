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
    <template v-for="item in rentType">
      <rent-together
        :HouseList="item.houseList"
        :hosueType="item.text"
        :key="item.type"
      ></rent-together>
    </template>
  </div>
</template>

<script>
import { RentTogether, SearchBar, CustomSwiper } from "./index.js";
export default {
  name: "AdminHome",
  components: { RentTogether, SearchBar, CustomSwiper },
  data() {
    return {
      carousel: [],
      rentType: [
        {
          text: "合租房",
          houseList: [],
          type: "0",
        },
        {
          text: "整租房",
          houseList: [],
          type: "1",
        },
        {
          text: "公寓房",
          houseList: [],
          type: "2",
        },
      ],
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
      res.data?.length &&
        res.data.map((item) => {
          this.rentType = this.rentType.map((k) => {
            if (item.house_type.indexOf(k.type) > -1) {
              k.houseList.push(item);
            }
            return k;
          });
        });
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
