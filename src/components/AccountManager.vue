<template>
  <div  id="accountmanager">
      <el-button type="primary" plain @click="handleCreateAccount()">新增账号</el-button>
        <h1>test</h1>
       <el-dialog 
            :title="accountForm.title"
            :visible.sync="accountForm.visible"
            width="690px"
        >
            <el-form label-position="left">
                <el-form-item
                    label="username"
                    label-width="120px"
                >  
                    <el-input
                        style="width:200px;"
                        v-model="accountForm.username"
                        placeholder="username"></el-input>
                </el-form-item>
               
                <el-form-item
                    label="nickname"
                    label-width="120px">
                    <el-input
                        style="width:200px;"
                        v-model="accountForm.nickname"
                        placeholder="nickname"></el-input>
                </el-form-item>
                <el-form-item
                    label="mobilephone"
                    label-width="120px">
                    <el-input
                        style="width:300px;"
                        v-model="accountForm.mobilephone"
                        placeholder="mobilephone"></el-input>
                </el-form-item>
                <el-form-item
                    label="cookiesFile"
                    label-width="120px"
                    >
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传.cookie文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>


                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="accountForm.visible = false">没意思</el-button>
                <el-button type="primary" @click="soldBuyitem()">就这样</el-button>
            </div>
        </el-dialog>
  </div>

</template>

<script>
export default {
    data() {
        return {
            accountsData: [],
            account: {
                username: "",
                nikename: "",
                mobilephone: "",
                cookiesFile: null,
                loginTime: null,
            },
            accountForm: {
                title: "",
                visible: false,
                username: "",
                nikename: "",
                mobilephone: "",
                cookiesFile: null,
                loginTime: null,
            }
        }
    },
    methods: {
        handleCreateAccount(){
            this.accountForm.visible = true;
        },
    },
}
</script>

<style>

</style>