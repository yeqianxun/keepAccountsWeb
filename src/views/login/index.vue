<template>
  <div class="login-page">
    <custom-header> </custom-header>
    <div class="login-form">
      <div class="login-form-left"></div>
      <div class="login-form-right">
        <div>
          <h2><span>登录</span>|<span>注册</span></h2>
        </div>
        <el-form v-model="form" :rules="rules" class="form-wrapper">
          <el-form-item aria-placeholder="请输入账号">
            <el-input v-model="form.name" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item aria-placeholder="请输入密码">
            <el-input v-model="form.pwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="login"
              >登录</el-button
            >
            <el-button size="small">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from "@/views/header";
export default {
  components: {
    CustomHeader,
  },
  data() {
    return {
      form: {
        name: "",
        pwd: "",
      },
      rules: {},
    };
  },
  methods: {
    login() {
      this.$Axios
        .post("/api/users/login", {
          name: this.form.name,
          pwd: this.form.pwd,
        })
        .then((res) => {
          console.log("res--==>", res);
          if (res.status == "success") {
            window.sessionStorage.setItem("token", res.token);
            this.$store.commit("user/SET_USER_INFO", res.token);
            this.$router.push("/admin/index");
          }
        });
    },
    resetForm() {},
  },
};
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
  .login-form {
    width: 1000px;
    height: 400px;
    overflow: hidden;
    position: absolute;
    top: calc(50vh - 200px);
    left: calc(50vw - 500px);
    border-radius: 8px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    display: flex;
  }
  .login-form-right,
  .login-form-left {
    height: 100%;
  }
  .login-form-left {
    width: 60%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: url("~@/assets/images/login-reg.jpg") no-repeat center center;
    // background-size: 100% 100%;
  }
  .login-form-right {
    width: 40%;
    padding: 30px 20px;
    .form-wrapper {
      margin: 40px;
    }
  }
}
</style>
