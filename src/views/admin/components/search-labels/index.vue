<template>
  <div class="search-labels-detail">
    <div class="city">
      <b>热门城市:</b>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    citys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      msg: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.search-labels-detail {
  .city {
    text-align: left;
  }
}
</style>
