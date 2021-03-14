<template>
  <div class="home-page">
    <div class="home-wrapper">
      <div class="home-bg"></div>
      <h2>我的站点</h2>
      <p class="hone-p1">
        一个用Vue2全家桶,Koa和Mysql开发的在线Web项目，旨在将学习到的前端后端技术融会贯通，
        学习和思考产品的设计。
      </p>
      <p>
        <router-link to="/admin/index">进入主页</router-link>
      </p>
    </div>
    <div class="mailto">
      Powered By:<a href="mailto:steven_yxl@foxmail.com"
        >steven_yxl@foxmail.com</a
      >
    </div>
  </div>
</template>

<script>
import Axios from "@/utils/http";
export default {
  data() {
    return {};
  },
  created() {
    Axios.get("/api/test")
      .then((res) => {
        console.log("crated===>0", res);
      })
      .catch((error) => {
        console.warn("erro====>", error);
      });
  },
  methods: {},
};
</script>

<style scoped lang="scss" >
.home-page {
  position: relative;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
  .home-wrapper {
    width: 60%;
    margin: 0 auto;
    // margin-top: 15%;
    transform: translateY(50%);
    position: relative;
    .hone-p1 {
      width: 60%;
      margin: 20px auto;
    }
  }
  .home-bg {
    background: url("~@/assets/images/koaReact.png") no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    height: 150px;
    width: 240px;
  }
  .mailto {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 20px;
    padding-bottom: 10px;
    a {
      color: #333;
      outline: none;
    }
  }
}
</style>
