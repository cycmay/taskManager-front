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
      
      <el-menu-item :key="2" index="/home/buyitems" @click="goTo('/home/buyitems')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">购买统计</span>
      </el-menu-item>

      <el-menu-item :key="3" index="/home/taskmanager" @click="goTo('/home/taskmanager')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">任务管理</span>
      </el-menu-item>
      <el-menu-item :key="4" index="/home/accountmanager" @click="goTo('/home/accountmanager')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>


      <!-- <el-menu-item :key="4" :index="{powerRouter:'/home/productanalysis'}">
        <i class="el-icon-user-solid"></i>
        <span slot="title">产品分析</span> -->
         
      </el-menu-item>
      <el-menu 
        :default-openeds="['1', '3']"
        >
        <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>产品分析</template>
        <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item :key="4" index="/home/productanalysis" @click="goTo('/home/productanalysis')">京东产品</el-menu-item>
            <el-menu-item :key="5" index="/home/vipproductanalysis" @click="goTo('/home/vipproductanalysis')">唯品会产品</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
    </el-menu>

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
    goTo(path){
        this.$router.replace(path);
    }

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
