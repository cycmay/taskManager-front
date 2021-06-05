<template>
    <div id="presaletaskmanager">
        <el-button type="primary" plain @click="handleAddSolution()">新建方案</el-button>
        <el-button type="primary" plain @click="handleExportSolutionsHref()">导出HREF</el-button>
        <el-button type="primary" plain @click="handleActivateAllEntry()">全部激活</el-button>
        <el-button type="primary" plain @click="handleDeactivateAllEntry()">全部暂停</el-button>
        <el-button type="danger" plain @click="handleDeleteAllSolutions()">删除所有方案</el-button>

        <el-row
            v-for="data in solutionData"
            :key="data._id"
            align="center"
            style="padding:20px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            
            <h3
                v-text="data.name"></h3>
                <el-button type="primary" @click="handlePauseSolution(data)">暂停该方案</el-button>
                <el-button type="primary" @click="handleRecoverSolution(data)">启动该方案</el-button>
                <el-button type="primary" @click="handleAddEntry(data._id)">增加子项目</el-button>
                <el-button type="danger" @click="handleDeleteAllEntries(data._id)">清空子项目</el-button>
                <el-button type="danger" plain @click="handleAlterSolution(data)">编辑该方案</el-button>
                <el-button type="danger" plain @click="handleDeleteSolution(data)">删除该方案</el-button>
                <h4>Metadata: </h4>
                <el-row 
                    :gutter="20"
                    align="center"
                    style="padding:10px;font-size:20px;">
                    <el-col :span="8"><div class="grid-content bg-purple">id:[ {{ data._id }} ]</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">target:[ {{ data.target }} ]</div></el-col>
                    <el-col :span="8" ><div class="grid-content bg-purple">deviation:[ {{ data.deviation }} ]</div></el-col>
                    <el-col :span="8" ><div class="grid-content bg-purple">status:[ {{ data.status==1?"运行中":"暂停中" }} ]</div></el-col>
                </el-row>
                
                <el-table
                    :data="data.entryList"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column
                        label="序号"
                        type="index"
                        fixed="left"
                        align="center"
                        >
                        <template slot-scope="scope">
                            {{ scope.$index }}
                        </template>
                    </el-table-column>
                    <el-table-column label="ID" width="200"
                        fixed>
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row._id == null ? '' : scope.row._id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="img" width="160"
                        
                        >
                        <template slot-scope="scope">
                            <img :src="scope.row.imgUrl" width="150">
                        </template>
                    </el-table-column>
                    <el-table-column label="name"  width="500"
                        
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="price"  width="100"
                        
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.price == null ? '' : scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="tips" 
                        width="250"
                        >
                        <template slot-scope="scope">
                            <span 
                                style="margin-left: 10px"
                                v-for="tip in scope.row.tips">{{ tip }}
                                </br>
                            </span>
                                
                        </template>
                    </el-table-column>
                    <el-table-column label="HREF" width="300"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px"><a :href="scope.row.href == null ? '' : scope.row.href">{{ scope.row.href == null ? '' : scope.row.href }}</a></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="ACTIVATE"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.activate == 1 ? '已激活' : "未激活" }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleUpdEntry(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDeleteEntry(scope.$index, scope.row)">删除</el-button>
                            <br></br>
                            <el-button size="mini" type="warning" @click="handleActiveEntry(scope.$index, scope.row)">激活</el-button>
                            <el-button size="mini" type="info" @click="handleDeactivateEntry(scope.$index, scope.row)">暂停</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </el-row>

        <span>历史数据</span>
         <el-row id="dataHistory">
            <el-col class="main-col" :span="24">
                <el-table
                    :data="tasksHistoryData"
                    height="960"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column
                        label="序号"
                        type="index"
                        fixed="left"
                        align="center"
                        >
                        <template slot-scope="scope">
                            {{ scope.$index }}
                        </template>
                    </el-table-column>
                    <el-table-column label="img" width="160"
                    
                        >
                        <template slot-scope="scope">
                            <img :src="scope.row.imgUrl" width="150" style="margin-right:5px">
                        </template>
                    </el-table-column>
                    <el-table-column label="任务名称" 
                        width="700"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" 
                        width="100"
                        prop="time"
                        :formatter="formatDate"
                        >
                    </el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleRecallTask(scope.$index, scope.row)">详情</el-button>
                            <el-button size="mini" type="danger" @click="handleDeleteHistoryTask(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- 创建solution -->
        <el-dialog 
            :title="solutionAddUpdForm.title"
            :visible.sync="solutionAddUpdForm.visible"
        >       
            <el-form label-position="left">
                <el-form-item
                    label="任务名称"
                    label-width="100px">
                    <el-input
                        style="width:700px;"
                        v-model="solutionAddUpdForm.name"
                        placeholder="请输入任务名称">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="target"
                    label-width="100px">
                    <el-input
                        style="width:100px;"
                        v-model="solutionAddUpdForm.target"
                        placeholder="请输入任务target">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="deviation"
                    label-width="100px">
                    <el-input
                        style="width:100px;"
                        v-model="solutionAddUpdForm.deviation"
                        placeholder="请输入任务devation">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="solutionAddUpdForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="alterSolution()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 增加子任务卡 -->
        <el-dialog 
            :title="entryAddUpdForm.title"
            :visible.sync="entryAddUpdForm.visible"
        >
            <el-container>
                <el-aside width="200px">
                    <div class="block">
                        <!-- <span class="demonstration">自定义</span> -->
                        <el-image
                            style="width: 200px; height: 200px"
                            :src="entryAddUpdForm.imgUrl"
                            >
                        </el-image>
                    </div>
                </el-aside>
                <el-container>
                     <el-main>
                        <el-form label-position="left">
                            <!-- 输入url 解析出pid-size map -->
                            <el-form-item
                                label="价格"
                                label-width="100px"
                            >
                                <el-input
                                    style="width:100px"
                                    v-model="entryAddUpdForm.price"
                                    placeholder="输入价格"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item
                                label="目标URL"
                                label-width="100px">
                                <el-input
                                    style="width:400px;"
                                    v-model="entryAddUpdForm.targetUrl"
                                    placeholder="请输入目标URL">
                                </el-input>
                                <el-button type="primary" @click="parseTargetUrl()">解 析</el-button>
                            </el-form-item>
                            <el-form-item
                                label="名称"
                                label-width="100px"
                            >
                                <el-input
                                    style="width:100%"
                                    v-model="entryAddUpdForm.name"
                                    >
                                </el-input>

                            </el-form-item>
                            <el-form-item
                                label="选择PID"
                                label-width="100px"
                                >
                                <el-checkbox-group 
                                    v-model="entryAddUpdForm.pids">
                                    <el-checkbox 
                                        v-for="data in pid_tip_map"
                                        :label="data"
                                        :key="data.tip">
                                        {{ data.tip }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                            

                            
                        </el-form>
                    </el-main>
                    <el-footer style="padding:20px; text-align:right">
                        <el-button @click="entryAddUpdForm.visible = false">取 消</el-button>
                        <el-button type="primary" @click="alterEntry()">确 定</el-button>
                    </el-footer>
                </el-container>
               
            </el-container>
            
            
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            solutionData: [],
            tasksHistoryData: [],
            pid_tip_map: [], // pid-tip的映射表 [{'pid': xxx, 'tip': xxx},{},...{}]
            solutionAddUpdForm: {
                title: "",
                visible: false,
                _id: null, // id
                name: "", // 名称
                entryIdList: [], // 项目id列表
                entryList: [], // 项目列表
                target: 1,
                deviation: 999,
                size: 0,
                status: 1, //1->运行中 2->暂停
                submitState: "", // 提交方式
            },
            // 子任务创建卡
            entryAddUpdForm:{
                title: "",
                visible: false,
                _id: null, // 任务id
                name: "", // 子任务名称 由url解析
                targetUrl: "", // 解析目标url为pid
                pids: [], // 包含tip的pids
                pid:[], // 纯pid列表
                price:0.0, // 价格
                tips: [], // 加入tip提示 显示尺码等信息
                href: "", // item地址
                imgUrl: "", // image地址
                father: "",
                activate: 1, // 是否激活
            },
        }
    },
    methods: {
        initSolutionsData(){
            this.axios.post("/api/v1/JDtask/managePresaleSolutions", {
                method: "listSolutions",
                params: {
                }
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        // this.buyitemsPage.totalCount = res.data.data.totalCount;
                        this.solutionData = res.data.solutions;
                        // 获取task信息
                        this.solutionData.forEach(solution => {
                            this.axios.post("/api/v1/JDtask/managePresaleEntries", {
                            method: "listEntriesByIdList",
                            params: solution.entryIdList,
                        }).then(
                            res=>{
                                solution.entryList = res.data.entries;
                            }
                        )
                        });
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            );
        },
        
        // task历史数据
        initTasksHistoryData(){
            this.axios.post("/api/v1/JDtask/manageHistoryTasks", {
                method: "listTasks",
                params: {
                }
            }).then(
                res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        // this.buyitemsPage.totalCount = res.data.data.totalCount;
                        this.tasksHistoryData = res.data.tasks;
                        console.log(this.tasksHistoryData);
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            )
        },
        handleAddSolution(){
            this.solutionAddUpdForm.visible = true;
            this.solutionAddUpdForm.title = "新建任务";
            this.solutionAddUpdForm.submitState = "Add";
        },
        
        handleRecallTask(index, row){
            this.solutionAddUpdForm.visible = true;
            this.solutionAddUpdForm.title = "恢复任务";
            this.solutionAddUpdForm.submitState = "Add";
            this.solutionAddUpdForm.task = row.task;
            this.solutionAddUpdForm.name = row.name;
        },
        handlePauseSolution(solution){
            // console.log(row);
            this.$confirm('此操作将暂停该方案内所有entry, 您确定暂停吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            this.solutionAddUpdForm._id = solution._id;
                            this.solutionAddUpdForm.status = 2;
                            this.pauseSolution();
                }).catch(() => {
        
                });
        },
        handleRecoverSolution(solution){
             // console.log(row);
            this.$confirm('此操作将启动该方案内所有entry, 您确定启动吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            this.solutionAddUpdForm._id = solution._id;
                            this.solutionAddUpdForm.status = 1;
                            this.recoverSolution();
                }).catch(() => {
        
                });
        },
        pauseSolution(){
            var params = this.solutionAddUpdForm;
            var method = "pauseSolution";
            this.axios.post("/api/v1/JDtask/managePresaleSolutions", {
                method:method,
                params:params,
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.initSolutionsData();
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            )
        },
        recoverSolution(){
            var params = this.solutionAddUpdForm;
            var method = "recoverSolution";
            this.axios.post("/api/v1/JDtask/managePresaleSolutions", {
                method:method,
                params:params,
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.initSolutionsData();
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            )
        },
        handleAlterSolution(solution){
            this.solutionAddUpdForm.visible = true;
            this.solutionAddUpdForm.title = "可修改任务";
            this.solutionAddUpdForm.submitState = "Upd";
            this.solutionAddUpdForm._id = solution._id;
            this.solutionAddUpdForm.name = solution.name;
            this.solutionAddUpdForm.target = solution.target;
            this.solutionAddUpdForm.deviation = solution.deviation;
        },
        handleDeleteSolution(solution){
            // console.log(row);
            this.$confirm('此操作将永久删除相关记录, 您确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            this.solutionAddUpdForm._id = solution._id;
                            this.solutionAddUpdForm.name = solution.name;
                            this.solutionAddUpdForm.submitState = "Del";
                            this.solutionAddUpdForm.entryIdList = solution.entryIdList;
                            this.alterSolution();
                }).catch(() => {
        
                });
        },
        handleDeleteAllTasks(){
            this.$confirm('此操作将永久删除所有task记录, 您确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            this.solutionAddUpdForm.submitState = "DelAll";
                            this.alterTask();
                }).catch(() => {
                });
        },
        handleAddEntry(fatherId){
            this.entryAddUpdForm.pids = [];
            this.entryAddUpdForm.pid = [];
            this.entryAddUpdForm.tips = [];
            this.entryAddUpdForm.visible = true;
            this.entryAddUpdForm.title = "增加子任务"
            this.entryAddUpdForm.father = fatherId; // entry所属的解决方案
            this.entryAddUpdForm.submitState = "Add";
        },
        handleUpdEntry(index, row){
            this.entryAddUpdForm.visible = true;
            this.entryAddUpdForm.title = "修改子任务"
            this.entryAddUpdForm.submitState = "Upd";
            this.entryAddUpdForm._id = row._id;
            this.entryAddUpdForm.father = row.father;
            this.entryAddUpdForm.pid = row.pid;
            this.entryAddUpdForm.name = row.name;
            this.entryAddUpdForm.targetUrl = row.targetUrl;
            this.entryAddUpdForm.pids = row.pids;
            this.entryAddUpdForm.pid = row.pid;
            this.entryAddUpdForm.price = row.price;
            this.entryAddUpdForm.href = row.href;
            this.entryAddUpdForm.imgUrl = row.imgUrl;
            this.entryAddUpdForm.father = row.father;
            this.entryAddUpdForm.activate = row.activate;
        },
        handleDeleteEntry(index, row){
            this.$confirm('此操作将永久删除 '+ row._id +' entry记录, 您确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.entryAddUpdForm.submitState = "Del";
                    this.entryAddUpdForm._id = row._id;
                    this.entryAddUpdForm.father = row.father;
                    this.entryAddUpdForm.pid = row.pid;
                    this.alterEntry();
                }).catch(() => {
                });
        },
        handleDeleteAllEntries(){
            this.$confirm('此操作将永久删除所有entry记录, 您确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            // this.solutionAddUpdForm.submitState = "DelAll";
                            // this.alterTask();
                }).catch(() => {
                });
        },
        handleDeleteHistoryTask(index, row){
            this.solutionAddUpdForm._id = row._id;
            this.solutionAddUpdForm.submitState = "Del";
            this.alterHistoryTask();
        },
        // 导出href
        handleExportSolutionsHref(){
            var exportHref = "";
            for (let index = 0; index < this.solutionData.length; index++) {
                const solution = this.solutionData[index];
                exportHref += "======================";
                for (let j = 0; j < solution.entryList.length; j++) {
                    const entry = solution.entryList[j];
                    exportHref += entry.href+"\n";
                }
            }
            this.$alert(exportHref, "导出HREF", {
                confirmButtonText: "Accept",
                callback: action=>{}
            });
        },
        // 修改solution数据
        alterSolution(){
            // console.log(this.solutionAddUpdForm);
            var params = this.solutionAddUpdForm;
            var method = ""
            if (this.solutionAddUpdForm.submitState == "Add"){
                method = "addSolution";
            }
            else if(this.solutionAddUpdForm.submitState == "Upd"){
                method = "updateSolution";
            }
            else if(this.solutionAddUpdForm.submitState == "Del"){
                method = "removeSolution";
            }
            else if(this.solutionAddUpdForm.submitState == "DelAll"){
                method = "removeSolutionsAll";
            }
           
            this.axios.post("/api/v1/JDtask/managePresaleSolutions", {
                method:method,
                params:params,
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.initSolutionsData();
                        this.solutionAddUpdForm.visible = false;
                        this.solutionAddUpdForm.entryIdList = [];
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            )
        },
        alterEntry(){
            // console.log(this.solutionAddUpdForm);
            var method = ""
            if (this.entryAddUpdForm.submitState == "Add"){
                method = "addEntry";
                // 选中pid后 将其加入tips列表
                for (let index = 0; index < this.entryAddUpdForm["pids"].length; index++) {

                    this.entryAddUpdForm["pid"].push(this.entryAddUpdForm["pids"][index]["pid"]);
                    this.entryAddUpdForm["tips"].push(this.entryAddUpdForm["pids"][index]["tip"]);
                }
                
                // 增加历史任务
                // this.alterHistoryTask();
            }
            else if(this.entryAddUpdForm.submitState == "Upd"){
                method = "updateEntry";
                // 选中pid后 将其加入tips列表
                for (let index = 0; index < this.entryAddUpdForm["pids"].length; index++) {

                    this.entryAddUpdForm["pid"].push(this.entryAddUpdForm["pids"][index]["pid"]);
                    this.entryAddUpdForm["tips"].push(this.entryAddUpdForm["pids"][index]["tip"]);
                }
            }
            else if(this.entryAddUpdForm.submitState == "Del"){
                method = "removeEntry";
            }
            else if(this.entryAddUpdForm.submitState == "DelAll"){
                method = "removeEntriessAll";
            }


            this.axios.post("/api/v1/JDtask/managePresaleEntries", {
                    method:method,
                    params:this.entryAddUpdForm,
                }).then(
                    res=>{
                        // console.log(res);
                        if(res.data.code === 200){
                            this.initSolutionsData();
                            this.entryAddUpdForm.visible = false;
                            this.entryAddUpdForm.pids = [];
                            this.entryAddUpdForm.pid = [];
                            this.entryAddUpdForm.tips = [];
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: "success"
                            });
                        }else{
                            this.$alert(res.data, "错误")
                        }
                    }
                )
           
            
        },
        alterHistoryTask(){
            // console.log(this.solutionAddUpdForm);
            var params = {
                        _id: this.solutionAddUpdForm._id,
                        name: this.solutionAddUpdForm.name,
                        imgUrl: this.solutionAddUpdForm.imgUrl, //任务主图地址
                        task: this.solutionAddUpdForm.task,
                    }
            var method = ""
            if (this.solutionAddUpdForm.submitState == "Add"){
                method = "addTask";
            }
            else if(this.solutionAddUpdForm.submitState == "Upd"){
                method = "updateTask";
            }
            else if(this.solutionAddUpdForm.submitState == "Del"){
                method = "removeTask";
            }
            else if(this.solutionAddUpdForm.submitState == "DelAll"){
                method = "removeTasksAll";
            }
    
            this.axios.post("/api/v1/JDtask/manageHistoryTasks", {
                method:method,
                params:params,
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.initTasksHistoryData();
                        this.solutionAddUpdForm.visible = false;
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            )
        },

        handleActivateAllEntry(){
            
        },
        handleActiveEntry(index, row){
            this.entryAddUpdForm._id = row._id;
            this.activateEntry();
            row.activate = 1;
        },

        activateEntry(){
            this.axios.post("/api/v1/JDtask/managePresaleEntries", {
                    method: "activateEntry",
                    params: this.entryAddUpdForm,
                }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        // this.initSolutionsData();
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            )
        },

        handleDeactivateEntry(index, row){
            this.entryAddUpdForm._id = row._id;
            this.deactivateEntry();
            row.activate = 2;
        },

        deactivateEntry(){
            this.axios.post("/api/v1/JDtask/managePresaleEntries", {
                    method: "deactivateEntry",
                    params: this.entryAddUpdForm,
                }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        // this.initSolutionsData();
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.$alert(res.data, "错误")
                    }
                }
            )
        },

        parseTargetUrl(){
            this.entryAddUpdForm.pids = [];
            this.entryAddUpdForm.pid = [];
            this.entryAddUpdForm.tips = [];
            this.axios.post("/api/v1/JDtask/getParsePromoteUrl", {
                targetUrl: this.entryAddUpdForm.targetUrl,
            }).then(
                res=>{
                    // console.log(res);
                    this.entryAddUpdForm.name = res.data.data.title
                    this.pid_tip_map = res.data.data.pid_tip_map;
                    this.entryAddUpdForm.href = res.data.data.href;
                    this.entryAddUpdForm.imgUrl = res.data.data.imgUrl;
                    // console.log(this.pid_tip_map);
                }
            )
        },

        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property]
            // console.log(data);
            if(data == null) {
                return null
            }
            let dt = new Date(parseInt(data));
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
        },
    },
    created() {
        this.initSolutionsData();
        // this.initTasksHistoryData();
    },
}
</script>


<style  lang="scss">
.el-main {
  padding: 0px;
}
.main-col {
  padding: 20px;
}
.el-form-item{
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 0px;
   margin-bottom: 0px;
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>