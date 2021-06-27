<template>
  <div class="personal-profile">
    <div class="avator-img">
      <img :src="userInfoForm.avator" />
      <el-upload
        ref="uploader"
        action="/api/users/uploadAvator"
        list-type="picture-card"
        :headers="headerObj"
        name="file"
        :show-file-list="false"
        :with-credentials="true"
        :auto-upload="false"
        :on-change="handleChange"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUploadUpload"
      >
        <div class="change-avator">
          <span class="text"> 修改头像</span>
        </div>
      </el-upload>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form
          ref="form"
          :class="[isEdit ? 'blank' : '', 'user-baseinfo']"
          :model="userInfoForm"
          label-width="120px"
          @submit.native.prevent="submit"
        >
          <template v-for="item in baseInfo">
            <el-form-item
              :key="item.label"
              :label="item.label"
              :prop="item.propName"
            >
              <component
                :disabled="item.disabled"
                :is="item.componentName"
                v-model="userInfoForm[item.propName]"
                size="small"
              ></component>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button size="small" @click="editUserInfo">编辑</el-button>
            <el-button type="primary" size="small" @click="submitForm"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    userInfo: {
      immediate: true,
      handler(val) {
        Object.keys(val).forEach((prop) => {
          //不要使用对象原型上的方法，因为原型上的方法可能被重写了
          if (
            Object.prototype.hasOwnProperty.call(this.userInfoForm, prop) &&
            (val[prop] || val[prop] === false)
          ) {
            this.userInfoForm[prop] = val[prop];
          }
        });
      },
    },
  },
  data() {
    return {
      isEdit: true,
      headerObj: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      userInfoForm: {
        username: "",
        email: "",
        mobile: "",
        active: true,
        avator: require("@/assets/images/me.png"),
      },
      baseInfo: [
        {
          label: "昵称：",
          componentName: "el-input",
          propName: "username",
          disabled: true,
        },
        {
          label: "电子邮件：",
          componentName: "el-input",
          propName: "email",
          disabled: true,
        },
        {
          label: "手机号码：",
          componentName: "el-input",
          propName: "mobile",
          disabled: true,
        },
        {
          label: "是否接收消息：",
          componentName: "el-switch",
          propName: "active",
          disabled: false,
        },
      ],
    };
  },
  methods: {
    editUserInfo() {
      this.isEdit = !this.isEdit;
      this.baseInfo = this.baseInfo.map((item) => {
        if (item.componentName == "el-input") {
          item.disabled = !this.isEdit ? false : true;
        }
        return item;
      });
    },
    submitForm() {
      this.$refs.uploader.submit();
      this.$XHR.updateUserInfo(this.userInfoForm).then((res) => {
        if (res.code == 200 && !res.data.length) {
          this.isEdit = false;
          this.editUserInfo();
          this.$store.dispatch("user/GET_USERINFO");
          this.$message.success("信息修改成功");
        }
      });
    },
    handleChange(file) {
      this.userInfoForm.avator = URL.createObjectURL(file.raw);
    },
    handleUploadSuccess(file) {
      this.userInfoForm.avator = file.data;
    },
    beforeUploadUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-profile {
  margin-left: 100px;
  .avator-img {
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .change-avator {
      text-align: center;
      position: absolute;
      line-height: 100px;
      width: 100px;
      .text {
        border: 1px solid rgba(59, 194, 29, 0.7);
        color: #42c02e !important;
        border-radius: 15px;
        display: inline-block;
        padding: 0px 8px;
        line-height: 25px;
        font-size: 14px;
      }
    }
  }
  .user-baseinfo {
    margin: 0px;
  }
}
</style>
<style lang="scss">
.personal-profile {
  .el-upload--picture-card {
    height: 100px;
    width: 100px;
    border: 0;
    line-height: 1;
    background: transparent;
  }
  .blank {
    .el-input__inner {
      border: 1px solid transparent;
    }
  }
  .el-input.is-disabled .el-input__inner {
    cursor: pointer;
  }
}
</style>