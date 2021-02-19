<template>
  <div id="app">
    <div class="header">
      <Row class="headerRow">
        <i-col :span="4" class="logo">欢迎来到吃瓜系统！</i-col>
        <i-col :span="14" class="nav">
          <span style="margin-right: 10px">二手市场</span>
          <span>跑腿服务</span>
        </i-col>
        <i-col :span="6" class="userInfo">
          <Dropdown style="margin-right: 10px">
            <span style="cursor: pointer">
              收藏夹
              <Icon type="ios-arrow-down"></Icon>
            </span>
            <DropdownMenu slot="list">
              <DropdownItem>收藏的商品</DropdownItem>
              <DropdownItem>收藏的跑腿服务</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <span v-if="!userInfo">
            <span
              class="loginBtn"
              @click="toLogin(true)"
              style="margin-right: 10px"
              >登录</span
            >
            <span class="loginBtn" @click="toLogin(false)">注册</span>
          </span>
          <span v-else>
            <span class="nickName" style="margin-right: 15px">{{
              userInfo.nick_name
            }}</span>
            <span @click="logout()">注销</span>
          </span>
        </i-col>
      </Row>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getRequest, postRequest } from "@/libs/request.js";
import { mapMutations } from "vuex";

export default {
  name: "app",
  data() {
    return {
      logo: require("@/assets/logo.png"),
    };
  },
  mounted() {
    let userId = localStorage.getItem("userId");
    if (userId) {
      getRequest("/getUserInfo", {
        userId: userId,
      }).then((res) => {
        if (res && res.data.code === 0) {
          this.getUserInfo(res.data.data);
        }
      });
    } else {
    }
  },
  computed: {
    userInfo() {
      let userId = localStorage.getItem("userId");
      if (this.$store.state.userInfo) {
        return this.$store.state.userInfo;
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapMutations(["getUserInfo"]),
    logout() {
      console.log(1);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.getUserInfo();
    },
    toLogin(bool) {
      this.$router.push({ name: "login", query: { isLogin: bool } });
    },
  },
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/* 头部样式 */
#app {
  .header {
    width: 100%;
    padding: 8px 0;
    font-size: 12px;
    color: #999;
    background-color: #f2f2f2;
    border-bottom: 1px solid #e5e5e5;
    .headerRow {
      width: 1230px;
      margin: 0 auto;
      line-height: 30px;
      .logo {
        img {
          width: 160px;
          height: auto;
        }
      }
      .nav {
        padding: 0 20px;
        text-align: right;
        border-right: 1px solid #e5e5e5;
      }
      .userInfo {
        .ivu-dropdown-item {
          color: #999;
        }
      }
    }
    span {
      cursor: pointer;
    }
    span:hover {
      text-decoration: underline;
    }
  }
}
</style>