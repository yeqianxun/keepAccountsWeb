<template>
  <div class="select-house">
    <h3 class="select-house-title">条件筛选</h3>
    <div class="house-choose">
      <template v-for="item in labels">
        <el-row class="label-row" :key="item.propName">
          <el-col :span="1">{{ item.text }}</el-col>
          <el-col :span="23" class="col-22">
            <template v-for="k in item.values">
              <el-checkbox-group v-model="formData[item.propName]" :key="k">
                <el-checkbox :label="k"></el-checkbox>
              </el-checkbox-group>
            </template>
          </el-col>
        </el-row>
      </template>
    </div>

    <el-row class="house-list-wrapper">
      <el-col :span="18" class="house-list">
        <div class="sort-way">
          <template v-for="item in sortWay">
            <span
              @click="active = item.key"
              :class="['sort-item', active == item.key ? 'active' : '']"
              :key="item.key"
              >{{ item.text }}
            </span>
          </template>
        </div>
        <template v-for="item in houseList">
          <div :key="item.house_id" class="house-item">
            <router-link
              :to="`/admin/house-detail/${item.house_id}`"
              target="_blank"
              class="house-detail"
            >
              <img
                :src="item.houseimgs.length && item.houseimgs[0].url"
                alt="房屋照片"
              />
              <div class="house-text-detail">
                <h3>{{ item.desc }}</h3>
                <p>
                  布局：{{ item.layout }} &nbsp;地址:{{
                    item.address
                  }}&nbsp;修建年份：{{ item.build_date }}
                </p>
                <p>
                  &nbsp;楼层：{{ item.floor_level }}楼 &nbsp;房屋类型：{{
                    item.house_type == 1 ? "整租" : "合租"
                  }}
                </p>
                <strong> 租金：{{ item.house_price }}</strong>
              </div>
            </router-link>
          </div>
        </template>
        <div class="load-more"><el-button>加载更多...</el-button></div>
      </el-col>
      <el-col :span="6" class="house-extra"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "default",
      sortWay: [
        {
          text: "默认排列",
          key: "default",
        },
        { text: "时间", key: "time" },
        {
          text: "租金",
          key: "moeny",
        },
        {
          text: "面积",
          key: "square",
        },
      ],
      formData: {
        house_price: [],
        house_square: [],
        house_layout: [],
        house_type: [],
      },
      labels: [
        {
          propName: "house_type",
          text: "类型：",
          values: ["整租", "合租"],
        },
        {
          propName: "house_square",
          text: "面积：",
          values: ["50-80㎡", "80-100㎡", "100-120㎡", "120-150㎡"],
        },
        {
          propName: "house_layout",
          text: "布局：",
          values: ["一居室", "二居室", "三居室", "四居室", "四居室以上"],
        },
        {
          propName: "house_price",
          text: "租金：",
          values: [
            "1000-1500¥",
            "1500-2000¥",
            "2000-4000¥",
            "4000-5000¥",
            "5000-10000¥",
          ],
        },
      ],
      houseList: [],
    };
  },
  created() {
    this.$XHR
      .getAllHouseInfo({})
      .then((res) => {
        res.data.length && (this.houseList = res.data);
      })
      .catch((e) => {
        this.$message.info("获取房屋信息报错" + e.message);
      });
  },
  methods: {},
};
</script>

<style lang="scss" >
.select-house {
  .select-house-title {
    margin-bottom: 20px;
  }
  .label-row {
    margin: 10px;
  }
  .col-22 {
    display: flex;
    .el-checkbox-group {
      margin: 4px 8px;
    }
  }
  .sort-way {
    display: flex;
    margin-top: 30px;
    justify-content: flex-end;
    border-bottom: 1px solid #eee;
    .sort-item {
      height: 30px;
      line-height: 30px;
      width: 100px;
      text-align: center;
      cursor: pointer;
      &.active {
        color: orange;
      }
    }
  }
  .house-list-wrapper {
    height: 900px;
    .house-detail {
      display: flex;
      color: #333;
      img {
        width: 240px;
        height: 160px;
        margin-top: 10px;
      }
      .house-text-detail {
        padding-left: 30px;
      }
    }
    .house-list {
      .house-item {
        strong {
          color: rgb(251, 80, 51);
        }
        height: 180px;
        padding: 5px 10px;
        border-bottom: 1px solid #eee;
      }
    }
    .house-extra {
      border: 1px solid red;
      height: 100%;
      margin-top: 60px;
    }
    .load-more {
      text-align: center;
      margin: 30px 0 0 0;
    }
  }
}
</style>
