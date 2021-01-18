<template>
  <div class="sidebar" :style="{'width': collapse ? 'auto' : '250px'}">
    <el-row style="height:25px">
      
    <el-button type="text" v-if="!collapse" style="font-size:25px;float:right;margin-right:5px;padding:0px;" @click="collapse = true" icon="el-icon-s-fold"></el-button>
    <el-button type="text" v-if="collapse" style="font-size:25px;float:right;margin-right:5px;padding:0px;" @click="collapse = false"  icon="el-icon-s-unfold"></el-button>
    </el-row>
    <el-menu
      class="el-menu-vertical-demo"
      @select="handleSelect"
      :default-active="active"
      :default-openeds="opened"
      :collapse="collapse"
    >
      <el-menu-item
        :key="1"
        :index="{powerRouter:'/home'}"
      >
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      
      <el-menu-item :key="2" :index="{powerRouter:'/home/buyitems'}">
        <i class="el-icon-user-solid"></i>
        <span slot="title">购买统计</span>
      </el-menu-item>

      <el-menu-item :key="3" :index="{powerRouter:'/home/taskmanager'}">
        <i class="el-icon-user-solid"></i>
        <span slot="title">任务管理</span>
      </el-menu-item>

    </el-menu>
    
  </div>
</template>
<script>
// import store from "../vuex/store.js";
export default {
  // store,
  data() {
    return {
      collapse:false,
      admin: "",
      type:"",
      powerList: [],
      active:"",
      opened:[],
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(keyPath);

      this.$router.push({ path: key.powerRouter });


    },

  },
  created: function() {
    // this.type = localStorage.getItem("type");
  }
};
</script>
<style scoped>
.el-submenu__title i {
  /* color: #66a3d2; */
}
.el-menu-item i {
  color: #66a3d2;
}
.sidebar {
  /* height: 9999px;
  margin-bottom: -9999px;
  overflow: hidden; */
  /* background-color: #043e6b; */
}
</style>
