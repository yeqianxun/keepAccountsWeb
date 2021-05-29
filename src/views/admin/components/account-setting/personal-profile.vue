<template>
  <div class="personal-profile">
    <el-upload
      action="/api/users/uploadAvator"
      list-type="picture-card"
      :show-file-list="false"
      :with-credentials="true"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUploadUpload"
    >
      <figure>
        <figcaption>修改头像</figcaption>
        <img :src="avatarURL" />
      </figure>
    </el-upload>
    <el-row>
      <el-col>
        <el-form
          ref="form"
          class="user-baseinfo"
          :model="userInfoForm"
          label-width="120px"
        >
          <template v-for="item in baseInfo">
            <el-form-item
              :key="item.text"
              :label="item.text"
              :prop="userInfoForm[item.prop]"
            >
              <component :is="item.componentName" size="small"></component>
            </el-form-item>
          </template>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfoForm: {
        nickName: "",
        email: "",
        mobile: "",
        receiveNotice: true,
      },
      baseInfo: [
        {
          text: "昵称：",
          componentName: "el-input",
          prop: "nickName",
          disabled: false,
        },
        {
          text: "电子邮件：",
          componentName: "el-input",
          prop: "email",
          disabled: false,
        },
        {
          text: "手机号码：",
          componentName: "el-input",
          prop: "email",
          disabled: false,
        },
        {
          text: "接收消息：",
          componentName: "el-radio",
          prop: "email",
          disabled: false,
        },
      ],
      avatarURL: require("../../../../assets/images/me.png"),
    };
  },
  methods: {
    handleUploadSuccess(file) {
      this.avatarURL = URL.createObjectURL(file.raw);
    },
    beforeUploadUpload() {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-profile {
  figure {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
    }
    figcaption {
      position: absolute;
      bottom: -32px;
      left: 0;
      z-index: 2;
      color: #42c02e;
      width: 100%;
      height: 30px;
      text-align: center;
      border-radius: 8px;
      border: 1px solid rgba(59, 194, 29, 0.7);
    }
  }
  .user-baseinfo {
    margin: 60px;
  }
}
</style>
<style lang="scss">
.personal-profile {
  .el-upload--picture-card,
  .el-upload-dragger {
    width: 100px;
    height: 100px;
    border: 0;
    line-height: 30px;
  }
}
</style>
