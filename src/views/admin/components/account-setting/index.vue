<template>
  <el-row class="account-settings">
    <el-col :span="6" class="account-sidebar">
      <ul>
        <template v-for="item in asideBars">
          <li
            :key="item.text"
            :class="[
              'aside-item',
              activeTab == item.componentName ? 'active' : '',
            ]"
            @click="switchTab(item.componentName)"
          >
            <span :class="['iconfont', item.icon]"></span>{{ item.text }}
          </li>
        </template>
        <li></li>
      </ul>
    </el-col>
    <el-col :span="18"
      ><component :is="activeTab" class="account-main"></component
    ></el-col>
  </el-row>
</template>

<script>
import MyMessage from "./my-message..vue";
import PersonalProfile from "./personal-profile.vue";
import MyFollow from "./my-follow.vue";
import ReleaseHouseResource from "./release-house-resource.vue";

export default {
  components: {
    MyMessage,
    MyFollow,
    PersonalProfile,
    ReleaseHouseResource,
  },
  data() {
    return {
      activeTab: "ReleaseHouseResource",
      asideBars: [
        {
          text: "个人资料",
          icon: "icon-profile",
          componentName: "PersonalProfile",
          isHouseOwner: true,
        },
        {
          text: "我的消息",
          icon: "icon-customerbaseinfo",
          componentName: "MyMessage",
          isHouseOwner: true,
        },
        {
          text: "我的关注",
          icon: "icon-guanzhu",
          componentName: "MyFollow",
          isHouseOwner: true,
        },
        {
          text: "发布房源",
          icon: "icon-UploadtoCloud",
          componentName: "ReleaseHouseResource",
          isHouseOwner: true,
        },
      ],
    };
  },
  methods: {
    switchTab(tabName) {
      this.activeTab = tabName;
    },
  },
};
</script>

<style lang="scss" scoped>
.account-settings {
  width: 960px;
  height: 500px;
  margin: 0 auto;
  .account-sidebar {
    width: 240px;
    height: 100%;
    .aside-item {
      line-height: 50px;
      text-align: left;
      cursor: pointer;
      color: #333;
      padding-left: 15px;
      .iconfont {
        margin-right: 15px;
        font-size: 20px;
        color: #a0a0a0;
        padding: 3px 5px;
        width: 28px;
        height: 26px;
      }
      &.active {
        background: #f0f0f0;
      }
    }
  }
  .account-main {
    width: 720px;
  }
}
</style>
