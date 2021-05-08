<template>
  <div class="footer-company-info">
    <div class="row1">
      <div class="row-left">
        <template v-for="item in 3">
          <div class="row1-col1" :key="item">
            <p>网站导航</p>
            <a href="">关于我们</a>
            <a href="">合作伙伴</a>
            <a href="">联系我们</a>
            <a href="">加入我们</a>
          </div>
        </template>
        <div class="row1-col1 row1-extra">
          <p>免费客服</p>
          <p>
            <span><i class="iconfont icon-tel"></i>400-810-6781</span>
          </p>
          <p>
            <span
              ><i class="iconfont icon-185078emailmailstreamline"></i
              >steven_yxl@foxmail.com</span
            >
          </p>
        </div>
      </div>
      <div class="row-right"></div>
    </div>
    <p class="company-version">
      ©2021 My-logo All rights reserved |浙ICP备20010721号
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FooterInfo:{
        navigation:{}
      }
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.footer-company-info {
  p {
    &.company-version {
      font-size: 14px;
      margin-bottom: 0;
    }
  }
  .row1 {
    display: flex;
    align-items: center;
    width: 900px;
    margin: 0 auto;
    @at-root .row-left {
      width: 690px;
      display: flex;
      .row1-col1 {
        width: 150px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        &.row1-extra {
          width: 180px;
          p {
            width: 120px;
          }
        }
        p {
          font-weight: 600;
          width: 80px;
        }
        a {
          color: #333;
          margin-top: 5px;
          width: 80px;
          display: inline-block;
          &:hover {
            color: #ff5a5f;
          }
        }
      }
    }
    .row-right {
      height: 125px;
      width: 210px;
    }
  }
}
</style>
