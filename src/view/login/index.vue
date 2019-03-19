<template>
  <div class="login-loading"></div>
</template>

<script>
import {request} from "@/utils/request";
import { setToken,removeToken } from "@/utils/auth";
import { mapGetters } from "vuex";
import service from "@/utils/service"
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
            console.log(res)
            setToken(res.data.token);
            window.location.reload();
          }
        })
        .catch(err => {
          if (err.response.data.code == 401) {
            removeToken();
            window.location =service.laochaoURL+"/auth/oauth/authorize?client_id=24&redirect_uri="+service.serviceUrl+"&response_type=code";
          }
        });
    }
  }
};
</script>

<style>
</style>
