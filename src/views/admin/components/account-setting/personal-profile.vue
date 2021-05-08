<template>
  <div class="personal-profile">
    <el-upload action="" list-type="picture-card" :show-file-list="false">
      <figure>
        <figcaption>修改头像</figcaption>
        <img :src="avatarURL" />
      </figure>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarURL: require("../../../../assets/images/me.png"),
    };
  },
  methods: {},
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
