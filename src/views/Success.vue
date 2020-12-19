<template>
  <div class="login">
    <el-row style="height: 100px" type="flex" justify="center"> </el-row>
    <el-row type="flex" justify="center">
      <a style="logo-wrap">
        <img :src="logo" class="logo" />
        <span class="logo-txt">JB Success</span>
      </a>
    </el-row>
    <el-row type="flex" justify="center">
      <div class="welcome">
        <span>欢迎使用JB系统</span>
      </div>
    </el-row>
    <el-row style="margin-top: 30px" type="flex" justify="center">
      <el-col>
        <el-row type="flex" justify="center">
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </el-row>
      </el-col>
      <el-col style="margin-top: 20px">
        <el-row type="flex" justify="center">
          <span style="color: rgba(0, 0, 0, 0.45)"
            >{{$route.params.forgetType ? '密码修改成功、您可以返回使用新的密码重新登录。': '用户注册成功、您可以返回使用刚才的帐号进行登录。'}}</span
          >
        </el-row>
      </el-col>
      <el-col style="margin-top: 20px">
        <el-row type="flex" justify="center">
          <router-link to="/login">
            <el-button class="centerWidth" type="success"
              >返回登录</el-button
            ></router-link
          >
        </el-row>
        <el-row type="flex" justify="center">
          <div class="centerWidth">
            <el-row style="margin-top: 20px" type="flex" justify="space-between">
              <div>
                <router-link class="forget" to="/login">登录帐户</router-link>
              </div>
              <div>
                <router-link class="forget" to="/register">注册帐户</router-link>
              </div>
            </el-row>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import UserApi from "../api/user";
export default {
  data() {
    return {
      logo: require("../assets/logo.png"),
    };
  },
};
</script>
<style>
.login {
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  height: 90vh;
  margin: 0;
  padding: 0;
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
