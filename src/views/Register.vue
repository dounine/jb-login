<template>
  <div class="login">
    <el-row style="height: 100px" type="flex" justify="center"> </el-row>
    <el-row type="flex" justify="center">
      <a style="logo-wrap">
        <img :src="logo" class="logo" />
        <span class="logo-txt">JB Register</span>
      </a>
    </el-row>
    <el-row type="flex" justify="center">
      <div class="welcome">
        <span>欢迎注册JB、一个懂你的系统</span>
      </div>
    </el-row>
    <el-row style="margin-top: 30px" type="flex" justify="center">
      <el-col>
        <el-row type="flex" justify="center">
          <div class="accountWrap">
            <div
              class="account"
              @click="switchRegisterType('phone')"
              :style="
                registerType === 'phone'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              手机号注册
            </div>
          </div>
          <div class="accountWrap">
            <div
              class="account"
              @click="switchRegisterType('email')"
              :style="
                registerType === 'email'
                  ? 'color:' + theme + ';border-bottom:2px solid ' + theme
                  : ''
              "
            >
              邮箱注册
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col style="margin-top: 16px">
        <div v-if="registerType === 'phone'">
          <el-form :model="phoneData" :rules="phoneRules" ref="phoneData">
            <el-row type="flex" justify="center">
              <el-form-item prop="phone">
                <el-input
                  style="width: 400px"
                  placeholder="手机号"
                  autofocus
                  clearable
                  maxlength="11"
                  prefix-icon="el-icon-mobile-phone"
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
                  placeholder="密码"
                  autofocus
                  clearable
                  maxlength="20"
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="phoneData.password"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="checkPassword">
                <el-input
                  style="width: 400px"
                  placeholder="二次确认密码"
                  autofocus
                  clearable
                  maxlength="20"
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="phoneData.checkPassword"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <div class="centerWidth">
                <el-form-item prop="agreement">
                  <el-row type="flex" justify="space-between">
                    <div>
                      <el-checkbox-group v-model="phoneData.agreement">
                        <el-checkbox style="color: black">我已看过并接受</el-checkbox>
                        <router-link
                          class="forget"
                          style="color: #20a0ff; margin-left: 10px; font-weight: 700"
                          to="/agreement"
                          >{{ agreementTxt }}</router-link
                        >
                      </el-checkbox-group>
                    </div>
                    <div></div>
                  </el-row>
                </el-form-item>
              </div>
            </el-row>
          </el-form>
        </div>
        <div v-if="registerType === 'email'">
          <el-form :model="emailData" :rules="emailRules" ref="emailData">
            <el-row type="flex" justify="center">
              <el-form-item prop="email">
                <el-input
                  style="width: 400px"
                  placeholder="邮箱"
                  clearable
                  autofocus
                  prefix-icon="el-icon-message"
                  v-model="emailData.email"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="password">
                <el-input
                  style="width: 400px"
                  placeholder="密码"
                  autofocus
                  clearable
                  maxlength="20"
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="emailData.password"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item prop="checkPassword">
                <el-input
                  style="width: 400px"
                  placeholder="二次确认密码"
                  autofocus
                  clearable
                  maxlength="20"
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="emailData.checkPassword"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <div class="centerWidth">
                <el-form-item prop="agreement">
                  <el-row type="flex" justify="space-between">
                    <div>
                      <el-checkbox-group v-model="emailData.agreement">
                        <el-checkbox style="color: black">我已看过并接受</el-checkbox>
                        <router-link
                          class="forget"
                          style="color: #20a0ff; margin-left: 10px; font-weight: 700"
                          to="/agreement"
                          >{{ agreementTxt }}</router-link
                        >
                      </el-checkbox-group>
                    </div>
                    <div></div>
                  </el-row>
                </el-form-item>
              </div>
            </el-row>
          </el-form>
        </div>

        <el-row type="flex" justify="center">
          <el-button @click="submitForm" class="centerWidth" type="success"
            >注 册</el-button
          >
        </el-row>
        <el-row type="flex" justify="center">
          <div class="centerWidth">
            <el-row style="margin-top: 20px" type="flex" justify="space-between">
              <div></div>
              <div>
                <router-link class="forget" to="/login">登录帐户</router-link>
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
        agreement: [],
      },
      emailData: {
        email: "",
        password: "",
        checkPassword: "",
        agreement: [],
      },
      phoneRules: {
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "长度11位",
            trigger: "blur",
          },
          {
            message: "请输入正确的手机号码",
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
        agreement: [
          {
            required: true,
            type: "array",
            message: "请同意用户协议后再注册",
          },
        ],
      },
      emailRules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            message: "请输入正确的邮箱",
            pattern: "^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$",
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
              } else if (value !== this.emailData.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        agreement: [
          {
            required: true,
            type: "array",
            message: "请同意用户协议后再注册",
          },
        ],
      },
      agreementTxt: "<<用户协议>>",
      logo: require("../assets/logo.png"),
    };
  },
  computed: {
    ...mapState(["theme", "username", "phone"]),
    autoLogin() {
      return this.$store.state.autoLogin === "true";
    },
    registerType() {
      return this.$route.params.registerType;
    },
  },
  methods: {
    ...mapMutations(["setUsername", "setPhone"]),
    async submitForm() {
      await this.$nextTick();
      this.$refs[this.$route.params.registerType + "Data"].validate((valid) => {
        if (valid) {
          console.log("提交注册");
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
    registerButtonEnable() {
      if (this.$route.params.registerType === "phone") {
        return (
          this.agreement &&
          this.phone.length === 11 &&
          this.message &&
          this.phonePassword === this.phoneConfirmPassword
        );
      } else {
        return (
          this.agreement && this.email && this.emailPassword === this.emailConfirmPassword
        );
      }
    },
    passwordChange(value) {
      this.password = value;
    },
    autoAgreement(value) {
      this.agreement = value;
    },
    switchRegisterType(loginType) {
      if (this.$route.query.redirect) {
        this.$router.push({
          path: `/register/${loginType}`,
          query: {
            redirect: this.$route.query.redirect,
          },
        });
      } else {
        this.$router.push(`/register/${loginType}`);
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
