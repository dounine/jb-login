<template>
  <div class="login">
    <el-row style="height: 100px" type="flex" justify="center"> </el-row>
    <el-row type="flex" justify="center">
      <a style="logo-wrap">
        <img :src="logo" class="logo" />
        <span class="logo-txt">JB Forget</span>
      </a>
    </el-row>
    <el-row type="flex" justify="center">
      <div class="welcome">
        <span>欢迎找回JB帐号、别把懂你的系统弄丢了</span>
      </div>
    </el-row>
    <el-row style="margin-top: 30px" type="flex" justify="center">
      <el-col>
        <el-row type="flex" justify="center">
          <div class="accountWrap">
            <div
              class="account"
              @click="switchForgetType('phone')"
              :style="
                forgetType === 'phone'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              手机号找回
            </div>
          </div>
          <div class="accountWrap">
            <div
              class="account"
              @click="switchForgetType('email')"
              :style="
                forgetType === 'email'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              邮箱找回
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col style="margin-top: 16px">
        <div v-if="forgetType === 'phone'">
          <el-form :model="phoneData" :rules="phoneRules" ref="phoneData">
            <el-row type="flex" justify="center">
              <el-form-item prop="phone">
                <el-input
                  style="width: 400px"
                  placeholder="手机号"
                  autofocus
                  clearable
                  prefix-icon="el-icon-user"
                  v-model="phoneData.phone"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="message">
                <el-input
                  style="width: 250px"
                  placeholder="验证码"
                  clearable
                  minlength="6"
                  maxlength="6"
                  prefix-icon="el-icon-message"
                  v-model="phoneData.message"
                ></el-input>
                <el-button style="width: 140px; margin-left: 10px">获取验证码</el-button>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="password">
                <el-input
                  style="width: 400px"
                  placeholder="新密码"
                  autofocus
                  clearable
                  prefix-icon="el-icon-lock"
                  v-model="phoneData.phone"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="checkPassword">
                <el-input
                  style="width: 400px"
                  placeholder="确认新密码"
                  autofocus
                  clearable
                  prefix-icon="el-icon-lock"
                  v-model="phoneData.checkPassword"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div v-if="forgetType === 'email'">
          <el-form :model="emailData" :rules="emailRules" ref="emailData">
            <el-row type="flex" justify="center">
              <el-form-item prop="email">
                <el-input
                  style="width: 400px"
                  placeholder="邮箱"
                  clearable
                  autofocus
                  minlength="11"
                  maxlength="11"
                  prefix-icon="el-icon-mobile-phone"
                  v-model="emailData.email"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="email">
                <el-input
                  style="width: 250px"
                  placeholder="验证码"
                  clearable
                  minlength="6"
                  maxlength="6"
                  prefix-icon="el-icon-message"
                  v-model="emailData.message"
                ></el-input>
                <el-button style="width: 140px; margin-left: 10px">获取验证码</el-button>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="password">
                <el-input
                  style="width: 400px"
                  placeholder="新密码"
                  autofocus
                  clearable
                  prefix-icon="el-icon-lock"
                  v-model="emailData.phone"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="checkPassword">
                <el-input
                  style="width: 400px"
                  placeholder="确认新密码"
                  autofocus
                  clearable
                  prefix-icon="el-icon-lock"
                  v-model="emailData.checkPassword"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <el-row type="flex" justify="center">
          <el-button @click="submitForm" class="centerWidth" type="success">修改密码</el-button>
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
      phoneData: {
        phone: "",
        message: "",
        password: "",
        checkPassword: "",
      },
      emailData:{
        email: "",
        message: "",
        password: "",
        checkPassword: "",
      },
      phoneRules: {
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            message: "请输入正确的手机",
            pattern:
              "^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\\d{8}$",
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
            min: 6,
            max: 6,
            message: "请输入6位验证码",
            trigger: "blur",
          },
          {
            message: "验证码只能为数字",
            pattern: "^\\d{6}$",
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
        checkPassword: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次确认输入的密码"));
              } else if (value !== this.phoneData.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      emailRules: {
        email: [
          {
            required: true,
            message: "请输入邮箱号码",
            trigger: "blur",
          },
          {
            message: "请输入正确的邮箱号码",
            pattern:
              "^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$",
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
            min: 6,
            max: 6,
            message: "请输入6位验证码",
            trigger: "blur",
          },
          {
            message: "验证码只能为数字",
            pattern: "^\\d{6}$",
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
        checkPassword: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次确认输入的密码"));
              } else if (value !== this.phoneData.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
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
    forgetType() {
      return this.$route.params.forgetType;
    },
  },
  methods: {
    ...mapMutations(["setUsername", "setPhone"]),
    async submitForm() {
      await this.$nextTick();
      this.$refs[this.$route.params.forgetType + "Data"].validate((valid) => {
        if (valid) {
          console.log("修改密码");
        }
      });
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
    switchForgetType(forgetType) {
      if (this.$route.query.redirect) {
        this.$router.push({
          path: `/forget/${forgetType}`,
          query: {
            redirect: this.$route.query.redirect,
          },
        });
      } else {
        this.$router.push(`/forget/${forgetType}`);
      }
    },
    login() {
      const loginData = {
        forgetType: this.forgetType,
        username: this.username,
        password: this.password,
        phone: this.phone,
        message: this.message,
      };
      UserApi.login(loginData).then((response) => {
        if (response.data.status === "fail") {
          this.$message.error(response.data.msg);
          if (this.forgetType === "password") {
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
