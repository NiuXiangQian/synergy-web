<template>
  <div>
    <el-container id="auth-container">
      <el-main>
        <div id="logo-name" class="animated slideInLeft">
          {{ $store.state.website_name }}
        </div>
        <div id="login-box">
          <div class="header">设置一下你的昵称</div>
          <div class="main">
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item prop="username">
                <el-input
                    v-model="form.username"
                    placeholder="昵称"
                    class="cuborder-radius"
                    maxlength="11"
                    @keyup.enter.native="onSubmit('form')"
                />
              </el-form-item>

              <el-form-item>
                <el-button
                    type="primary"
                    @click="onSubmit('form')"
                    class="submit-btn"
                    :loading="loginLoading"
                >立即进入
                </el-button>
              </el-form-item>


              <p style="margin-top: 50px">
                <el-divider>
                  <span style="color: rgb(181, 176, 176); font-weight: 200">
                    <i class="el-icon-mobile-phone"></i> 小提示</span
                  >
                </el-divider>
              </p>
              <el-form-item class="preview-account">
                <p>系统将使用您设置的昵称作为区分</p>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="copyright" v-html="$store.state.copyright"></div>
      </el-main>
    </el-container>

    <div class="fly-box">
      <div class="fly bg-fly-circle1"></div>
      <div class="fly bg-fly-circle2"></div>
      <div class="fly bg-fly-circle3"></div>
      <div class="fly bg-fly-circle4"></div>
    </div>
  </div>
</template>
<script>
import {setNickname} from "@/utils/auth";


export default {
  name: "LoginPage",
  data() {
    let validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("昵称不能为空！"));
      } else {
        callback();
      }

    };

    return {
      loginLoading: false,
      form: {
        username: "",
      },
      rules: {
        username: [
          {
            validator: validateNickname,
            trigger: "blur",
          },
          {
            min: 3,
            max: 25,
            message: "长度在3-25个字符之间!",
            trigger: "blur",
          },
        ],

      },
    };
  },
  methods: {
    onSubmit(formName) {
      if (this.loginLoading) {
        return false;
      }

      this.$refs[formName].validate((valid) => {
        if (!valid) return false;
        this.loginLoading = true;
        this.login();
      });
    },

    login() {

      setNickname(this.form.username)
      this.$router.push({
        path: "/",
      });

    },


  }
  ,
}
;
</script>
<style lang="less" scoped>
@import "~@/assets/css/page/login-auth.less";
</style>
