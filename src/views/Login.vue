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
              @click="switchLoginType('account')"
              :style="
                loginType === 'account'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              帐号登录
            </div>
          </div>
          <div class="accountWrap">
            <div
              class="account"
              @click="switchLoginType('code')"
              :style="
                loginType === 'code'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              验证码登录
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col style="margin-top: 16px">
        <div v-if="loginType === 'account'">
          <el-form :model="accountData" :rules="accountRules" ref="accountData">
            <el-row type="flex" justify="center">
              <el-form-item prop="username">
                <el-input
                  style="width: 400px"
                  placeholder="手机号或邮箱"
                  autofocus
                  clearable
                  prefix-icon="el-icon-user"
                  v-model="accountData.username"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="password">
                <el-input
                  style="width: 400px"
                  placeholder="密码"
                  clearable
                  type="password"
                  maxlength="20"
                  show-password
                  prefix-icon="el-icon-lock"
                  v-model="accountData.password"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div v-if="loginType === 'code'">
          <el-form :model="codeData" :rules="codeRules" ref="codeData">
            <el-row type="flex" justify="center">
              <el-form-item prop="username">
                <el-input
                  style="width: 400px"
                  placeholder="手机号或邮箱"
                  clearable
                  autofocus
                  prefix-icon="el-icon-mobile-phone"
                  v-model="codeData.username"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="message">
                <el-input
                  style="width: 250px"
                  placeholder="验证码"
                  clearable
                  maxlength="6"
                  prefix-icon="el-icon-message"
                  v-model="codeData.message"
                ></el-input>
                <el-button
                  :disabled="!codeEnable()"
                  @click="getCode"
                  style="width: 140px; margin-left: 10px"
                  >{{ codeData.codeText }}</el-button
                >
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <el-row type="flex" justify="center">
          <div class="centerWidth">
            <el-row type="flex" justify="space-between">
              <div>
                <el-checkbox v-model="autoLogin" @change="autoLoginChange"
                  >自动登录</el-checkbox
                >
              </div>
              <div v-if="loginType === 'account'">
                <router-link class="forget" style="color: #52c41a" to="/user/forget"
                  >忘记密码</router-link
                >
              </div>
            </el-row>
          </div>
        </el-row>
        <el-row style="margin-top: 30px" type="flex" justify="center">
          <el-button @click="submitForm" class="centerWidth" type="success"
            >登 录</el-button
          >
        </el-row>
        <el-row type="flex" justify="center">
          <div class="centerWidth">
            <el-row style="margin-top: 20px" type="flex" justify="space-between">
              <div></div>
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
      codeTimeInterval: null,
      accountData: {
        username: "",
        password: "",
      },
      codeData: {
        username: "",
        message: "",
        codeText: "获取验证码",
      },
      accountRules: {
        username: [
          {
            required: true,
            message: "请输入手机或邮箱帐号码",
            trigger: "blur",
          },
          {
            message: "请输入正确的手机或者邮箱号码",
            pattern:
              "(1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\\d{8}$)|(([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4}))",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            message: "密码强度需要字母+数字组合",
            pattern: "^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$",
            trigger: "blur",
          },
          {
            message: "密码长度为6~20位",
            min: 6,
            max: 20,
            trigger: "blur",
          },
        ],
      },
      codeRules: {
        username: [
          {
            required: true,
            message: "请输入手机或邮箱帐号码",
            trigger: "blur",
          },
          {
            message: "请输入正确的手机或者邮箱号码",
            pattern:
              "(1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\\d{8}$)|(([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4}))",
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          {
            message: "长度为6位",
            min: 6,
            max: 6,
            trigger: "blur",
          },
          {
            message: "只能为数字",
            pattern: "^\\d{6}$",
            trigger: "blur",
          },
        ],
      },
      logo: require("../assets/logo.png"),
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
  created() {
    if (localStorage.getItem("codeTime")) {
      this.codeTimeInterval = setInterval(this.changeCodeText, 1000);
      this.changeCodeText();
    }
    this.codeData.username = localStorage.getItem("username") || "";
  },
  methods: {
    ...mapMutations(["setUsername", "setPhone"]),
    async submitForm() {
      await this.$nextTick();
      this.$refs[this.$route.params.loginType + "Data"].validate((valid) => {
        if (valid) {
          this.login();
          console.log("提交注册");
        }
      });
    },
    codeEnable() {
      if (this.codeTimeInterval != null) {
        return false;
      } else {
        return new RegExp(this.codeRules.username[1].pattern).test(
          this.codeData.username
        );
      }
    },
    changeCodeText() {
      const between = (new Date().getTime() - localStorage.getItem("codeTime")) / 1000;
      if (60 - between < 1) {
        if (this.codeTimeInterval) {
          clearInterval(this.codeTimeInterval);
        }
        localStorage.removeItem("codeTime");
        this.codeData.codeText = "获取验证码";
        this.codeTimeInterval = null;
      } else {
        this.codeData.codeText = `${Math.round(60 - between)}秒后重新获取`;
      }
    },
    getCode() {
      localStorage.setItem("codeTime", new Date().getTime());
      localStorage.setItem("username", this.codeData.username);
      this.codeTimeInterval = setInterval(this.changeCodeText, 1000);
      this.changeCodeText();
    },
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
          path: `/login/${loginType}`,
          query: {
            redirect: this.$route.query.redirect,
          },
        });
      } else {
        this.$router.push(`/login/${loginType}`);
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
          if (this.loginType === "account") {
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
