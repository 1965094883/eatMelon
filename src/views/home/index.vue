<template>
  <div class="home">
    主页
  </div>
</template>

<script>
import { getRequest, postRequest } from "@/libs/request.js";

export default {
  name: "home",
  data() {
    return {
      logo: require("@/assets/logo.png"),
    };
  },
  methods: {},
};
</script>

<style lang="less">
.home {
}
</style>