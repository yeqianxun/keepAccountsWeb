<template>
  <div class="login-page">
    <custom-header> </custom-header>
    <div class="login-form">
      <div class="login-form-left"></div>
      <div class="login-form-right">
        <h2 class="login-register-title">
          <span
            :class="[activeTab == 'login' ? 'active' : '']"
            @click="changeLoginRegister('login')"
            >登录</span
          ><span
            :class="[activeTab == 'reg' ? 'active' : '']"
            @click="changeLoginRegister('reg')"
            >注册</span
          >
        </h2>
        <el-form v-model="form" :rules="rules" class="form-wrapper">
          <el-form-item aria-placeholder="请输入账号">
            <el-input v-model="form.name" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item aria-placeholder="请输入密码">
            <el-input
              type="password"
              v-model="form.pwd"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item aria-placeholder="请输入确认密码">
            <el-input
              v-show="activeTab == 'reg'"
              v-model="form.pwd2"
              placeholder="请输入确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="loginOrRegister">提交</el-button>
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
        pwd2: "",
      },
      activeTab: "login",
      rules: {},
    };
  },
  methods: {
    loginOrRegister() {
      let URL =
        this.activeTab == "login" ? "/api/users/login" : "/api/users/register";
      this.$Axios
        .post(URL, {
          username: this.form.name,
          password: this.form.pwd,
        })
        .then((res) => {
          if (res.status == "success") {
            window.sessionStorage.setItem("token", res.token);
            this.$router.push("/admin/index");
            this.$message({
              message: res.message,
              type: "success",
            });
          } else {
            if (res.code == -1) {
              this.$message({
                message: "账户或密码错误",
                type: "info",
              });
              this.activeTab = "login";
              this.resetForm();
            }
          }
        });
    },
    resetForm() {
      Object.keys(this.form).forEach((prop) => {
        this.form[prop] = "";
      });
    },
    changeLoginRegister(str) {
      this.activeTab = str;
    },
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
    .login-register-title {
      display: flex;
      padding: 0 100px;
      span {
        width: 50%;
        text-align: center;
        cursor: pointer;
        &.active {
          color: orange;
        }
      }
    }
    .form-wrapper {
      margin: 40px;
      .el-button {
        background: #ff5a5f;
        width: 100%;
        color: white;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}
</style>
