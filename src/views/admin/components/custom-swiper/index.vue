<template>
  <swiper class="custom-swiper" :options="swiperOption">
    <swiper-slide
      class="swiper-slide"
      v-for="(item, index) in carouselArr"
      :key="index"
    >
      <img :src="item.imgUrl" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
export default {
  props: {
    carouselArr: {
      type: Array,
      default: () => [],
    },
    swiperOption: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.custom-swiper {
  height: 100%;
}
</style>
