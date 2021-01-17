<template>
  <!-- 所有的内容要被根节点包含起来 -->
  <div id="home" style="height:100%">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
    </el-container>

    <el-container style="height:100%; margin-top:-60px;padding-top:60px">
      <el-aside style="border-top: 1px solid #eee;width:auto;">
        <v-sidebar></v-sidebar>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>

        <el-footer style="height: 30px;  color: #fff;text-align: right;">
          Copyright ©2020 Bicycle
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
// import store from "../vuex/store.js";
export default {
  // store,

  data() {
    return {
      token: "",
      //screenWidth: document.documentElement.clientWidth,//屏幕宽度
    }
  },
  watch: {
    // 'screenWidth': function (val) { //监听屏幕宽度变化
    //   var oIframe = document.getElementById("right");
    //   oIframe.style.width = (Number(val) - 280) + 'px'; //'120'是页面布局调整，可去除
    // },
  },
  methods: {

    run() {

    }
  },
  components: {

    'v-header': Header,
    'v-sidebar': Sidebar
  },
  mounted() {
    // this.token = localStorage.getItem("token");
    // if (this.token == "" || this.token == null) {
    //   this.$router.push({ path: "/login" });
    // }
    // var type = localStorage.getItem("type");
    // if (type != "admin" && type != "admin_super") {
    //   this.$router.push({ path: "/login" });
    // }
    // var admin = sessionStorage.getItem("adminId")
    // if (admin == null) {
    //   this.$router.push({ path: '/login' });
    //   return;
    // }
    // var _this = this;
    // window.onresize = function () { // 定义窗口大小变更通知事件
    //   _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
    // };
    // var oIframe = document.getElementById("right");
    // oIframe.style.width = (Number(document.documentElement.clientWidth) - 300) + 'px'; //'120'是页面布局调整，可去除
  }

}
</script>
<style scoped>
.el-header {
  padding: 0px;
}
</style>
