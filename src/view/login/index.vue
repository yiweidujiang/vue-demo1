<template>
  <div class="login-loading"></div>
</template>

<script>
import request from "@/utils/request";
import { setToken,removeToken } from "@/utils/auth";
import { mapGetters } from "vuex";
export default {
  name: "login",
  created() {
    // this.code = this.getQuery('code');
    this.getData();
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["code"])
  },
  methods: {
    getData() {
      request({
        url: "/auth/login/lcCode",
        method: "get",
        params: {
          appid: "1",
          code: this.code
        }
      })
        .then(res => {
          console.log(res)
          if (res.code == 1) {
            setToken(res.data.token);
            window.location.reload();
          }
        })
        .catch(err => {
          if (err.response.data.code == 401) {
            removeToken();
            window.location =
              "http://192.168.17.168:8088/auth/oauth/authorize?client_id=24&redirect_uri=http://192.168.17.146:8100&response_type=code";
          }
        });
    }
  }
};
</script>

<style>
</style>
