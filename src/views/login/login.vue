<template>
  <div class="loginPage">
    <div class="loginBox">
      <div class="text">{{ isLogin ? "登录" : "注册" }}</div>
      <div class="logo">
        <img
          style="cursor: pointer"
          @click="$router.push({ path: '/home' })"
          :src="logo"
          alt=""
        />
      </div>
      <div class="formBox">
        <Form
          class="loginForm"
          ref="loginForm"
          :model="loginForm"
          :rules="registerRules"
          :label-width="0"
        >
          <FormItem
            v-if="!isLogin"
            key="nickName"
            prop="nickName"
            :rules="{ required: true, message: '请输入昵称', trigger: 'blur' }"
          >
            <Input v-model="loginForm.nickName" placeholder="昵称" />
          </FormItem>
          <FormItem
            prop="account"
            key="account"
            :rules="{ required: true, message: '请输入账号', trigger: 'blur' }"
          >
            <Input v-model="loginForm.account" placeholder="账号" />
          </FormItem>
          <FormItem
            prop="password"
            key="password"
            @on-enter="enterLogin()"
            :rules="{ required: true, message: '请输入密码', trigger: 'blur' }"
            ><Input
              type="password"
              v-model="loginForm.password"
              :placeholder="isLogin ? '密码' : '设置密码'"
          /></FormItem>
          <FormItem v-if="!isLogin" key="password2" prop="password2"
            ><Input
              type="password"
              v-model="loginForm.password2"
              placeholder="确认密码"
          /></FormItem>
        </Form>
        <div class="hasAccount">
          <a @click="changeLoginType()">{{
            isLogin ? "没有账号？去注册" : "已有账号？去登录"
          }}</a>
        </div>
        <div>
          <Button
            @click="handleLogin"
            size="large"
            type="primary"
            style="width: 350px"
            >{{ isLogin ? "登录" : "确定" }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest, postRequest } from "@/libs/request.js";
import { mapMutations } from "vuex";

export default {
  name: "login",
  data() {
    const pw2Rule = (rule, value, callback) => {
      if (value) {
        if (value !== this.loginForm.password) {
          callback(new Error("两次输入密码不一致，请重新输入"));
        }
      } else {
        callback(new Error("请确认密码!"));
      }
      callback();
    };
    return {
      logo: require("@/assets/logo.png"),
      isLogin: true,
      loginForm: {},
      registerRules: {
        password2: [{ required: true, validator: pw2Rule, trigger: "blur" }],
      },
    };
  },
  watch: {
    $route: {
      handler() {
        this.isLogin = this.$route.query.isLogin;
      },
      deep: true,
    },
  },
  mounted() {
    this.isLogin = this.$route.query.isLogin;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },
  methods: {
    ...mapMutations(["getUserInfo"]),
    //登录时回车监听
    enterLogin() {
      if (this.isLogin) {
        this.handleLogin();
      }
    },
    //登录注册按钮
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const params = {
            account: this.loginForm.account || null,
            nickName: this.loginForm.nickName || null,
            password: this.loginForm.password || null,
            password2: this.loginForm.password2 || null,
            gender: 0,
          };
          if (!this.isLogin) {
            postRequest("/addUser", params).then((res) => {
              if (res && res.data.code === 0) {
                this.$Message.success("注册成功!");
                this.changeLoginType();
              } else if (res && res.data.code === 1000) {
                this.$Message.error(res.data.message);
              }
            });
          } else {
            postRequest("/login", params).then((res) => {
              if (res && res.data.code === 0) {
                this.$Message.success("登录成功!跳转中...");
                //缓存token
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userId", res.data.data.userId);
                //用户信息存到vuex
                //通过用户id获取用户信息
                let userId = res.data.data.userId;
                getRequest("/getUserInfo", {
                  // Authentication: res.data.data.token,
                  userId: userId,
                }).then((res) => {
                  if (res && res.data.code === 0) {
                    this.getUserInfo(res.data.data);
                    console.log(this.$store.state.userInfo);
                  }
                });
                //跳转到home页
                this.$router.push({ path: "home" });
              } else if (res && res.data.code === 1000) {
                this.$Message.error("密码错误!");
                this.loginForm.password = "";
              }
            });
          }
        }
      });
    },
    //切换注册登录
    changeLoginType() {
      this.$refs.loginForm.resetFields();
      this.loginForm = {
        account: "",
        password: "",
      };
      this.isLogin = !this.isLogin;
    },
  },
};
</script>

<style lang="less">
.loginPage {
  width: 100%;
  height: calc(100vh - 100px);
  margin: 0 auto;
  border-radius: 10px 10px 0 0;
  .loginBox {
    width: 500px;
    margin: 50px auto 0;
    border-radius: 10px 10px 0 0;
    border: 1px solid rgba(0, 0, 0, 0.15);
    .text {
      border-radius: 10px 10px 0 0;
      padding: 10px 20px;
      margin-bottom: 15px;
      font-size: 22px;
      font-weight: 600;
      background-color: skyblue;
    }
    .logo {
      img {
        width: 160px;
        height: autol;
      }
    }
    .formBox {
      padding: 10px 15px 30px;
      .loginForm {
        width: 350px;
        margin: 0 auto;
      }
      .hasAccount {
        display: block;
        padding: 15px 0;
        text-align: right;
        font-size: 14px;
        a {
          color: #515a6e;
        }
      }
    }
  }
}
</style>
