<template>
  <div class="login">
    <el-row style="height: 100px" type="flex" justify="center"> </el-row>
    <el-row type="flex" justify="center">
      <a style="logo-wrap">
        <img :src="logo" class="logo" />
        <span class="logo-txt">JB Login</span>
      </a>
    </el-row>
    <el-row type="flex" justify="center">
      <div class="welcome">
        <span>欢迎登录JB、一个懂你的系统</span>
      </div>
    </el-row>
    <el-row style="margin-top: 30px" type="flex" justify="center">
      <el-col>
        <el-row type="flex" justify="center">
          <div class="accountWrap">
            <div
              class="account"
              @click="switchLoginType('password')"
              :style="
                loginType === 'password'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              帐号密码登录
            </div>
          </div>
          <div class="accountWrap">
            <div
              class="account"
              @click="switchLoginType('message')"
              :style="
                loginType === 'message'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              手机号登录
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col style="margin-top: 16px">
        <div v-if="loginType === 'password'">
          <el-row type="flex" justify="center">
            <el-input
              style="width: 400px"
              placeholder="用户名"
              autofocus
              clearable
              @change="saveUsername"
              prefix-icon="el-icon-user"
              v-model="username"
            ></el-input>
          </el-row>
          <el-row style="margin-top: 24px" type="flex" justify="center">
            <el-input
              style="width: 400px"
              placeholder="密码"
              clearable
              type="password"
              show-password
              prefix-icon="el-icon-lock"
              v-model="password"
            ></el-input>
          </el-row>
        </div>
        <div v-if="loginType === 'message'">
          <el-row type="flex" justify="center">
            <el-input
              style="width: 400px"
              placeholder="手机号"
              clearable
              autofocus
              minlength="11"
              maxlength="11"
              @input="savePhone"
              prefix-icon="el-icon-mobile-phone"
              v-model="phone"
            ></el-input>
          </el-row>
          <el-row style="margin-top: 24px" type="flex" justify="center">
            <el-input
              style="width: 250px"
              placeholder="验证码"
              clearable
              minlength="6"
              maxlength="6"
              prefix-icon="el-icon-message"
              v-model="message"
            ></el-input>
            <el-button style="width: 140px; margin-left: 10px">获取验证码</el-button>
          </el-row>
        </div>
        <el-row style="margin-top: 10px" type="flex" justify="center">
          <div class="centerWidth">
            <el-row style="margin-top: 20px" type="flex" justify="space-between">
              <div>
                <el-checkbox v-model="autoLogin" @change="autoLoginChange"
                  >自动登录</el-checkbox
                >
              </div>
              <div>
                <router-link class="forget" style="color: #52c41a" to="/user/forget"
                  >忘记密码</router-link
                >
              </div>
            </el-row>
          </div>
        </el-row>
        <el-row style="margin-top: 30px" type="flex" justify="center">
          <el-button @click="login" class="centerWidth" type="success">登 录</el-button>
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

<script>
import { mapMutations, mapState } from "vuex";
import UserApi from "../api/user";
export default {
  data() {
    return {
      logo: require("../assets/logo.png"),
      username: localStorage.getItem("username") || "",
      phone: localStorage.getItem("phone") || "",
      message: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["theme", "username", "phone"]),
    autoLogin() {
      return this.$store.state.autoLogin === "true";
    },
    loginType() {
      return this.$route.params.loginType;
    },
  },
  methods: {
    ...mapMutations(["setUsername", "setPhone"]),
    saveUsername(value) {
      localStorage.setItem("username", value);
    },
    savePhone(value) {
      localStorage.setItem("phone", value);
    },
    messageChange(value) {
      this.message = value;
    },
    passwordChange(value) {
      this.password = value;
    },
    autoLoginChange(value) {
      this.$store.commit("setAutoLogion", `${value}`);
    },
    switchLoginType(loginType) {
      if (this.$route.query.redirect) {
        this.$router.push({
          path: `/${loginType}`,
          query: {
            redirect: this.$route.query.redirect,
          },
        });
      } else {
        this.$router.push(`/${loginType}`);
      }
    },
    login() {
      const loginData = {
        loginType: this.loginType,
        username: this.username,
        password: this.password,
        phone: this.phone,
        message: this.message,
      };
      UserApi.login(loginData).then((response) => {
        if (response.data.status === "fail") {
          this.$message.error(response.data.msg);
          if (this.loginType === "password") {
            this.password = "";
          } else {
            this.message = "";
          }
        } else {
          console.log("登录成功");
          const urlRedirect = this.$route.query.redirect;
          if (urlRedirect) {
            //ur中包含跳转地扯
            console.log("跳转到url redirect的地扯", urlRedirect);
            window.location.href = urlRedirect;
          } else {
            if (window.__POWERED_BY_QIANKUN__) {
              //是qiankun的微应用
              localStorage.setItem("token", response.data.data.token);
              console.log("跳转到微应用中的主应用上");
              history.pushState({}, "/", "/");
            } else {
              console.log("跳转到登录返回的redirect地扯中");
              window.location.href = response.data.data.redirect;
            }
          }
        }
      });
    },
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
