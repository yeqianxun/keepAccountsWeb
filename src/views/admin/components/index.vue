<template>
  <div class="admin-index-box">
    <div class="top-box">
      <div class="box-left">
        <template v-for="item in chartData">
          <el-select
            v-model="props[item.prop]"
            :placeholder="item.placeholder"
            :key="item.prop"
            :class="[item.className]"
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <pie-chart />
      </div>
      <div class="box-right">
        <template v-for="item in cardNum">
          <el-card
            :class="['box-card ']"
            :key="item.text"
            :style="{ backgroundColor: item.bgColor }"
          >
            <div class="text item">
              <span :class="['iconfont', item.icon]"></span>
              <span>{{ item.text }}</span>
              <span class="money-num">{{ item.num }}</span>
            </div>
          </el-card>
        </template>
      </div>
    </div>
    <div class="bottom-box">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="date" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Charts/pie-chart.vue";
import DataMixin from "../mixin";
export default {
  mixins: [DataMixin],
  components: {
    PieChart,
  },
  data() {
    return {
      props: {
        chartType: "",
        timeRange: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    formatter(row) {
      return row.address;
    },
  },
};
</script>
<style lang="scss">
.admin-index-box {
  .box-left {
    position: relative;
    .el-select {
      position: absolute;
      left: 0;
      &.time-range {
        right: 0 !important ;
        top: 0;
        left: auto;
        width: 200px;
      }
    }
  }
}
</style>
<style lang="scss" scoepd>
.admin-index-box {
  .top-box {
    height: 300px;
    display: flex;
    .box-left {
      width: 70%;
      height: 100%;
      border: 1px solid #f0f0f0;
    }
    .box-right {
      width: 30%;
      height: 300px;
      overflow: auto;
      flex-direction: column;
      .item {
        text-align: left;
        cursor: pointer;
        span {
          margin-right: 15px;
          font-size: 18px;
          color: #333;
        }
      }
      .box-card {
        width: 90%;
        height: 80px;
        margin: 10px auto;
        border-radius: 8px;
        box-shadow: 0 0 10px #ccc;
      }
    }
  }
  .bottom-box{
    margin-top:20px;
  }
}
</style>
