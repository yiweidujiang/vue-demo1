<template>
  <nav class="nav-bar clearfix">
    <div class="navbar-brand" :class="[slidebar.collapse?'active':'']">
      <div class="navbar-brand2">
        <h3>TIYE</h3>
      </div>
    </div>
    <ul class="fl clearfix navbar-toolbar">
      <li>
        <a href="javascript:void(0)" @click="toggleSlide">
          <i class="iconfont icon-menu"></i>
        </a>
      </li>
    </ul>
    <div class="right-menu fr">
      <el-dropdown  v-if="list.length>1" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          切换系统
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) in  list"
            :key="index"
            :command="{appid:item.appid,secret:item.secret}"
          >{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--用户个人信息-->
      <el-dropdown trigger="click">
        <div class="wrap">
          <div class="head-portrait">
            <div class="img">
              <img :src="avatar" alt>
            </div>
            <span>
              {{name}}
              <small style="font-size: 12px;"></small>
            </span>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/test">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="LoginOut">
            <!-- <span> -->
              <!-- <i class="fa fa-sign-out"></i> -->
              <router-link to="/login">退出</router-link> 
            <!-- </span> -->
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>
<script>
import { removeToken, setAppid } from "@/utils/auth";
import { getPermission } from "@/api/login";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.list = this.systemList;
  },
  name: "v-header",
  computed: {
    ...mapGetters(["name", "avatar", "slidebar", "systemList"])
  },
  methods: {
    // 点击切换系统
    handleCommand(command) {
      this.$alert("确定要切换系统吗?", {
        confirmButtonText: "确定",
        callback: action => {
          if (action == "confirm") {
            setAppid(JSON.stringify(command));
            this.$store.commit("SET_SECRET", "");
            this.$router.push({path:'/'})
            this.$message({
              type: "success",
              message: "切换系统成功",
              duration: 1000,
              onClose: () => {
                window.location.reload();
              }
            });
          }
        }
      });
    },
    toggleSlide() {
      this.$store.dispatch("ToggleSlideBar");
    },
    //退出登录
    LoginOut() {
      this.$store.dispatch("LoginOut").then(res => {
        window.location.reload();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.nav-bar {
  position: relative;
  .navbar-brand {
    float: left;
    .navbar-brand2 {
      box-sizing: border-box;
      width: 220px;
      padding: 20px 0;
      line-height: 20px;
      transition: all 0.2s ease-in;
      background: url("../../../assets/computer-logo.png") 0 0 no-repeat;
      background-position: center center;
      font-size: 16px;
      color: #ffffff;
      font-weight: bolder;
      text-align: center;
      height: 62px;
      h3 {
        display: none;
      }
    }
  }
  .active {
    .navbar-brand2 {
      width: 64px;
      background: none;
      h3 {
        display: block;
      }
    }
  }
  .navbar-toolbar {
    li {
      display: inline-block;
      a {
        display: block;
        line-height: 26px;
        padding: 17px 15px;
        color: #ffffff;
        font-size: 24px;
        &:hover {
          background-color: #4688c3;
        }
      }
    }
  }
  //右侧菜单
  .right-menu {
    .el-dropdown {
      margin-left: 16px;
      color: #ffffff;
      cursor: pointer;
    }
    .head-portrait {
      padding: 15px 0;
      line-height: 30px;
      position: relative;
      padding-left: 40px;
      color: #ffffff;
      .img {
        display: block;
        position: absolute;
        left: 0;
        width: 30px;
        height: 30px;
        overflow: hidden;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>