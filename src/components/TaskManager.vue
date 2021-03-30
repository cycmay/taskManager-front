<template>
    <div id="taskmanager">
        <el-button type="primary" plain @click="handleAddTask()">新建任务</el-button>
        <el-button type="danger" plain @click="handleDeleteAllTasks()">删除所有任务</el-button>
        <el-row>
            <el-col class="main-col" :span="24">
                <el-table
                    :data="tasksdata"
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
                    <el-table-column label="任务名称"  width="700"
                        
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleUpdTask(scope.$index, scope.row)">详情</el-button>
                            <el-button size="mini" type="danger" @click="handleDeleteTask(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
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

        <!-- 创建任务卡 -->
        <el-dialog 
            :title="taskAddUpdForm.title"
            :visible.sync="taskAddUpdForm.visible"
        >
            <el-button type="primary" @click="handleAddEntry()">增加子任务</el-button>
            <el-button type="danger" @click="handleClearEntry()">清空子项目</el-button>
                        
            <el-table
                :data="taskAddUpdForm.task"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column label="name" width="300"
                    prop="name"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="img" width="160"
                    prop="imgUrl"
                    >
                    <template slot-scope="scope">
                        <img :src="scope.row.imgUrl" width="150" style="margin-right:5px">
                    </template>
                </el-table-column>
                <el-table-column label="count" width="100"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.count == null ? '' : scope.row.count }}</span>
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
            </el-table>

            <el-form label-position="left">
                <!-- 输入url 解析出pid-size map -->
                <el-form-item
                    label="任务名称"
                    label-width="100px">
                    <el-input
                        style="width:700px;"
                        v-model="taskAddUpdForm.name"
                        placeholder="请输入任务名称">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="taskAddUpdForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="alterTask()">确 定</el-button>
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
                                    v-model="entry.pids">
                                    <el-checkbox 
                                        v-for="data in pid_tip_map"
                                        :label="data"
                                        :key="data.tip">
                                        {{ data.tip }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                            <el-form-item
                                label="数量"
                                label-width="100px"
                            >
                                <el-input
                                    style="width:100px"
                                    v-model="entry.count"
                                    placeholder="输入数量"
                                >
                                </el-input>
                            </el-form-item>

                            
                        </el-form>
                    </el-main>
                    <el-footer style="padding:20px; text-align:right">
                        <el-button @click="entryAddUpdForm.visible = false">取 消</el-button>
                        <el-button type="primary" @click="addEntry()">确 定</el-button>
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
            tasksdata: [],
            tasksHistoryData: [],
            pid_tip_map: [], // pid-tip的映射表 [{'pid': xxx, 'tip': xxx},{},...{}]
            taskAddUpdForm: {
                title: "",
                visible: false,
                _id: null, // 任务id
                name: "", // 任务名称
                imgUrl: "", //任务主图地址
                task: [], // 项目列表
                submitState: "", // 提交方式
            },
            // 子任务创建卡
            entryAddUpdForm:{
                title: "",
                visible: false,
                name: "", // 子任务名称 由url解析
                targetUrl: "", // 解析目标url为pid
                href: "", // item地址
                imgUrl: "", // image地址
            },
            // 自任务数据
            entry:{
                pids: [], // 包含tip的pids
                pid:[], // 纯pid列表
                name: "",
                count: 1,
                tips: [], // 加入tip提示 显示尺码等信息
                href: "", // item地址
                imgUrl: "", // image地址
            }
        }
    },
    methods: {
        initTasksData(){
            this.axios.post("/api/v1/JDtask/manageTasks", {
                method: "listTasks",
                params: {
                }
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        // this.buyitemsPage.totalCount = res.data.data.totalCount;
                        this.tasksdata = res.data.tasks;
                    }else{
                        this.alert(res.data, "错误")
                    }
                }
            )
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
                        this.alert(res.data, "错误")
                    }
                }
            )
        },
        handleAddTask(){
            this.taskAddUpdForm.visible = true;
            this.taskAddUpdForm.title = "新建任务";
            this.taskAddUpdForm.submitState = "Add";
        },
        handleRecallTask(index, row){
            this.taskAddUpdForm.visible = true;
            this.taskAddUpdForm.title = "恢复任务";
            this.taskAddUpdForm.submitState = "Add";
            this.taskAddUpdForm.task = row.task;
            this.taskAddUpdForm.name = row.name;
        },
        handleUpdTask(index, row){
            this.taskAddUpdForm.visible = true;
            this.taskAddUpdForm.title = "可修改任务";
            this.taskAddUpdForm.submitState = "Upd";
            this.taskAddUpdForm._id = row._id;
            this.taskAddUpdForm.task = row.task;
            this.taskAddUpdForm.name = row.name;
        },
        handleDeleteTask(index, row){
            // console.log(row);
            this.$confirm('此操作将永久删除相关记录, 您确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            this.taskAddUpdForm._id = row._id;
                            this.taskAddUpdForm.name = row.name;
                            this.taskAddUpdForm.submitState = "Del";
                            this.alterTask();
                }).catch(() => {
        
                });
        },
        handleDeleteAllTasks(){
            this.$confirm('此操作将永久删除所有task记录, 您确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            this.taskAddUpdForm.submitState = "DelAll";
                            this.alterTask();
                }).catch(() => {
                });
        },
        handleAddEntry(){
            this.entryAddUpdForm.visible = true;
            this.entryAddUpdForm.title = "增加子任务"
        },
        handleClearEntry(){
            this.taskAddUpdForm.task = [];
        },
        handleDeleteHistoryTask(index, row){
            this.taskAddUpdForm._id = row._id;
            this.taskAddUpdForm.submitState = "Del";
            this.alterHistoryTask();
        },
        addEntry(){
            // 选中pid后 将其加入tips列表
            for (let index = 0; index < this.entry["pids"].length; index++) {

                this.entry["pid"].push(this.entry["pids"][index]["pid"]);
                this.entry["tips"].push(this.entry["pids"][index]["tip"]);
            }
            // task更新href imgUrl
            this.entry["href"] = this.entryAddUpdForm.href;
            this.entry["imgUrl"] = this.entryAddUpdForm.imgUrl;
            // 如果task列表为空 那么设置task主图为第一个加入的entry图址
            if(this.taskAddUpdForm.task.length==0){
                this.taskAddUpdForm.imgUrl = this.entryAddUpdForm.imgUrl;
            }
            // 将entry加入task列表
            this.taskAddUpdForm.task.push(this.entry);

            this.entry = {
                pids: [], // 包含tip的pids
                pid:[], // 纯pid列表
                name: "", 
                count: 1,
                tips: [], // 加入tip提示 显示尺码等信息
            };
            // 子任务创建卡
            this.entryAddUpdForm = {
                title: "",
                visible: false,
                name: "", // 子任务名称 由url解析
                targetUrl: "", // 解析目标url为pid
            };

            this.pid_tip_map = [];
        },
        alterTask(){
            // console.log(this.taskAddUpdForm);
            var params = {
                        _id: this.taskAddUpdForm._id,
                        name: this.taskAddUpdForm.name,
                        imgUrl: this.taskAddUpdForm.imgUrl, //任务主图地址
                        task: this.taskAddUpdForm.task,
                    }
            var method = ""
            if (this.taskAddUpdForm.submitState == "Add"){
                method = "addTask";
                // 增加历史任务
                this.alterHistoryTask();
            }
            else if(this.taskAddUpdForm.submitState == "Upd"){
                method = "updateTask";
            }
            else if(this.taskAddUpdForm.submitState == "Del"){
                method = "removeTask";
            }
            else if(this.taskAddUpdForm.submitState == "DelAll"){
                method = "removeTasksAll";
            }
           
            this.axios.post("/api/v1/JDtask/manageTasks", {
                method:method,
                params:params,
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.initTasksData();
                        this.taskAddUpdForm.visible = false;
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.alert(res.data, "错误")
                    }
                }
            )
        },
        alterHistoryTask(){
            // console.log(this.taskAddUpdForm);
            var params = {
                        _id: this.taskAddUpdForm._id,
                        name: this.taskAddUpdForm.name,
                        imgUrl: this.taskAddUpdForm.imgUrl, //任务主图地址
                        task: this.taskAddUpdForm.task,
                    }
            var method = ""
            if (this.taskAddUpdForm.submitState == "Add"){
                method = "addTask";
            }
            else if(this.taskAddUpdForm.submitState == "Upd"){
                method = "updateTask";
            }
            else if(this.taskAddUpdForm.submitState == "Del"){
                method = "removeTask";
            }
            else if(this.taskAddUpdForm.submitState == "DelAll"){
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
                        this.taskAddUpdForm.visible = false;
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }else{
                        this.alert(res.data, "错误")
                    }
                }
            )
        },
        
        parseTargetUrl(){
            this.axios.post("/api/v1/JDtask/getParsePromoteUrl", {
                targetUrl: this.entryAddUpdForm.targetUrl
            }).then(
                res=>{
                    // console.log(res);
                    this.entry.name = res.data.data.title;
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
        this.initTasksData();
        this.initTasksHistoryData();
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
</style>