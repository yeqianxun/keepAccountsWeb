<template>
  <div class="house-detail">
    <p>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/index' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: $route.path }"
          >房屋详情</el-breadcrumb-item
        >
      </el-breadcrumb>
    </p>
    <h1>{{ houseInfo.desc }}</h1>
    <el-row class="house-detail-box">
      <el-col class="house-detail-left" :span="12">
        <div class="now-imgbig">
          <img
            :src="houseInfo.houseimgs && houseInfo.houseimgs[nowImg].url"
            alt=""
          />
        </div>
        <div class="img-list"></div>
      </el-col>
      <el-col class="house-detail-right" :span="12">
        <h1 :style="{ color: '#fb5033' }">租金：{{ houseInfo.house_price }}</h1>
        <div class="houseinfo-item">
          <span class="house-level">房屋布局：{{ houseInfo.layout }} </span>
          <span class="house-square"
            >房屋面积：{{ houseInfo.house_square }}</span
          >
          <span class="build_date">修建年份：{{ houseInfo.build_date }}</span>
          <span>位置：{{ houseInfo.address }}</span>
        </div>
        <button @click="connect">连接socket</button>
        <button @click="sendMessage">发送数据</button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HouseDetail",
  data() {
    return {
      houseInfo: {},
      nowImg: 0,
    };
  },
  created() {
    this.$XHR
      .getHouseDetail({
        house_id: this.$route.params.house_id,
      })
      .then((res) => {
        res.data && (this.houseInfo = res.data);
      });
  },
  methods: {
    // 连接socket
    connect() {
      this.$socket.open();
      this.sockets.subscribe("welcome", (data) => {
        console.log("welcome data ", data);
      });
    },
    // 发送消息
    sendMessage() {
      this.$socket.emit("hello", "这里是客户端");
    },
  },
};
</script>

<style lang="scss" scoped>
.house-detail {
  width: 1240px;
  text-align: left;
  margin: 0 auto;
  height: 460px;
  .house-detail-box {
    border: 1px solid red;
    .house-detail-left,
    .house-detail-right {
      height: 400px;
    }
    .house-detail-left {
      .now-imgbig {
        width: 600px;
        height: 400px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .house-detail-right {
      .houseinfo-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        span {
          height: 100px;
          width: 33.33%;
          justify-content: center;
          color: #333;
        }
      }
    }
  }
}
</style>
