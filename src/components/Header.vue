<template>
  <div class="header">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <!-- <img
        class="head-img" width="172" height="60"
        src="../assets/img/logo-ow-bg.png"
      /> -->

      <el-submenu index="1">
        <template slot="title">{{ this.adminName }}</template>
        <!-- <el-menu-item index="1-3">首页</el-menu-item> -->
        <el-menu-item index="1-1">修改密码</el-menu-item>
        <el-menu-item index="1-2">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="type != 'student'" index="2"><i style="margin:0px;" class="el-icon-question"></i><span>帮助</span>
</el-menu-item>



      <div class="head-title">TaskManager</div>
    </el-menu>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form">
        <el-form-item
          label="原密码："
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.userPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码："
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.userPasswordNew"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="再次输入："
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.userPasswordAgn"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="Alter"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      token: "",
      title:"修改密码",
      formLabelWidth: "90px",
      adminName: "",
      type:"",
      dialogFormVisible: false,
      adminName:"",
      form: {
        // adminId: "",
        // adminName: "",
        userPassword: "",
        userPasswordNew: "",
        userPasswordAgn: ""
      },
      helpVisible:false
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      if (keyPath[0] == "1") {
        if (keyPath[1] == "1-1") {
          this.form.userPassword = "";
          this.form.userPasswordNew = "";
          this.form.userPasswordAgn = "";
          this.dialogFormVisible = true;
        }
        if (keyPath[1] == "1-2") {

          localStorage.removeItem("token");

          this.$router.push({ path: "/login" });
        }
        // if (keyPath[1] == "1-3") {
        //   this.$router.push({ path: "/home" });
        // }
      }
      if (keyPath[0] == "2") {
        this.helpVisible = true;
      }
    },
    Alter () {
      // if (this.form.adminPassword != this.$store.state.admin.adminPassword) {
      //   this.$message({
      //     showClose: true,
      //     message: "原密码不正确",
      //     type: "error"
      //   });
      //   this.form.adminPassword = "";
      //   this.form.adminPasswordNew = "";
      //   this.form.adminPasswordAgn = "";
      //   return;
      // }
      if (this.form.userPasswordNew != this.form.userPasswordAgn) {
        this.$alert("两次密码输入不一致", "错误", {
              confirmButtonText: "确定",
              type: "error",
              callback: action => {}
            });
        // this.form.adminPassword = "";
        // this.form.adminPasswordNew = "";
        // this.form.adminPasswordAgn = "";
        return;
      }
      const loading = this.$loading(this.$store.state.loadingOption1);
      this.axios
        .post(
          "/changePassword",
          {
            params: {
              passwordOld: this.form.userPassword,
              passwordNew: this.form.userPasswordNew
            }
          },
          { headers: { token: this.token } }
        )
        .then(res => {
          if (res.data.code === 200) {
            this.$alert("密码修改成功，请重新登陆", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$router.push({ path: "/login" });
              }
            });
          } else if (res.data.code == 401) {
            this.$router.push({ path: "/login" });
          } else {
            this.$alert(res.data.data, "错误", {
              confirmButtonText: "确定",
              type: "error",
              callback: action => {}
            });
          }
          loading.close();
        });
      this.dialogFormVisible = false;
    }
  },
  created: function () {
    // this.token = localStorage.getItem("token");
    // this.adminName = localStorage.getItem("name");
    //  this.type  = localStorage.getItem("type");
  }
};
</script>
<style scoped>
.head-img {
  float: left;
}
.head-title {
  height: 60px;
  line-height: 60px;
  font-size: 25px;
  width: 600px;
  text-align: center;
  z-index: 99;

  margin: 0px auto;
}
.head-left {
  float: right;
  width: 625px;
}
.head-left li {
  float: left;
}
.el-menu--horizontal > .el-menu-item {
  float: right;
  border-bottom: none;
}
.el-menu--horizontal > .el-submenu {
  float: right;
  border-bottom: none;
}
.el-menu-item i {
    color: #66a3d2;
}
</style>

