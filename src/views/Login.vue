<template>
  <div class="login">
    <el-row type="flex" justify="center">
      <a style="logo-wrap">
        <img :src="logo" class="logo" />
        <span class="logo-txt">JB Login</span>
      </a>
    </el-row>
    <el-row type="flex" justify="center">
      <div class="welcome">
        <span>欢迎登录JB、有问题即时反馈哟</span>
      </div>
    </el-row>
    <el-row style="margin-top: 30px" type="flex" justify="center">
      <el-col>
        <el-row type="flex" justify="center">
          <div class="accountWrap">
            <div
              class="account"
              :style="'color:' + theme + ';border-bottom:2px solid ' + theme"
            >
              帐号密码登录
            </div>
          </div>
          <div class="accountWrap"><div class="account">手机号登录</div></div>
        </el-row>
      </el-col>
      <el-col style="margin-top: 16px">
        <el-row type="flex" justify="center">
          <el-input
            style="width: 400px"
            placeholder="用户名"
            prefix-icon="el-icon-user"
            v-model="input2"
          ></el-input>
        </el-row>
        <el-row style="margin-top: 24px" type="flex" justify="center">
          <el-input
            style="width: 400px"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="input2"
          ></el-input>
        </el-row>
        <el-row style="margin-top: 10px" type="flex" justify="center">
          <div class="centerWidth">
            <el-row style="margin-top: 20px" type="flex" justify="space-between">
              <div><el-checkbox v-model="autoLogin">自动登录</el-checkbox></div>
              <div>
                <router-link style="color: #52c41a" to="/user/forget"
                  >忘记密码</router-link
                >
              </div>
            </el-row>
          </div>
        </el-row>
        <el-row style="margin-top: 30px" type="flex" justify="center">
          <el-button class="centerWidth" type="success">登 录</el-button>
        </el-row>
        <el-row type="flex" justify="center">
          <div class="centerWidth">
            <el-row style="margin-top: 20px" type="flex" justify="space-between">
              <div></div>
              <div>
                <router-link class="forget" to="/user/register">注册帐户</router-link>
              </div>
            </el-row>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
export default {
  data() {
    return {
      autoLogin: true,
      logo: require("../assets/logo.png"),
    };
  },
  computed: {
    ...mapState(["theme"]),
  },
};
</script>
<style>
.login {
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  height: 100%;
  padding: 40px;
}
.logo-wrap {
  height: 44px;
  line-height: 44px;
  margin: 0px;
  padding: 0px;
  text-align: center;
}
.logo {
  width: 44px;
  height: 44px;
  display: inline-block;
  vertical-align: middle;
}
.logo-txt {
  font-size: 33px;
  font-weight: 600;
  display: inline-block;
  vertical-align: middle;
  font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.welcome {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.accountWrap {
  padding: 10px;
}
.account {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 2px solid white;
}
.active {
  color: #52c41a;
  border-bottom: 2px solid #52c41a;
}
.forget {
  font-size: 14px;
  color: #52c41a;
}
.centerWidth {
  width: 400px;
}
</style>
