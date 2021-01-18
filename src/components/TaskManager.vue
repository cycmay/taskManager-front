<template>
    <div id="taskmanager">
        <el-button type="primary" plain @click="handleAddtask()">新建任务</el-button>
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
                    <el-table-column label="ID" fixed
                        prop="_id"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row._id == null ? '' : scope.row._id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="任务名称" fixed
                        prop="name"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog 
            :title="taskAddUpdForm.title"
            :visible.sync="taskAddUpdForm.visible"
            width="990px"
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
                <el-table-column label="name" width="640"
                    prop="name"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="count" width="100"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.count == null ? '' : scope.row.count }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="tips" 
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.tips == null ? '' : scope.row.tips }}</span>
                    </template>
                </el-table-column>
            </el-table>

            <el-form label-position="left">
                <!-- 输入url 解析出pid-size map -->
                <el-form-item
                    label="任务名称"
                    label-width="100px">
                    <el-input
                        style="width:400px;"
                        v-model="taskAddUpdForm.name"
                        placeholder="请输入任务名称">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="taskAddUpdForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="addTask()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog 
            :title="entryAddUpdForm.title"
            :visible.sync="entryAddUpdForm.visible"
            width="890px"
        >
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
                        disabled>
                    </el-input>

                </el-form-item>
                <el-form-item
                    label="选择PID"
                    label-width="100px"
                    >
                    <el-checkbox-group 
                        v-model="task.pids">
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
                        v-model="task.count"
                        placeholder="输入数量"
                    >
                    </el-input>
                </el-form-item>

                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="entryAddUpdForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="addEntry()">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasksdata: [],
            pid_tip_map: [], // pid-tip的映射表 [{'pid': xxx, 'tip': xxx},{},...{}]
            taskAddUpdForm: {
                title: "",
                visible: false,
                id: null, // 任务id
                name: "", // 任务名称
                task: [], // 项目列表
                
            },
            // 子任务创建卡
            entryAddUpdForm:{
                title: "",
                visible: false,
                name: "", // 子任务名称 由url解析
                targetUrl: "", // 解析目标url为pid
            },
            task:{
                pids: [], // 包含tip的pids
                pid:[], // 纯pid列表
                name: "",
                count: 1,
                tips: [], // 加入tip提示 显示尺码等信息
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
                    console.log(res);
                    if(res.data.code === 200){
                        // this.buyitemsPage.totalCount = res.data.data.totalCount;
                        this.tasksdata = res.data.tasks;
                    }else{
                        this.alert(res.data, "错误")
                    }
                }
            )
        },
        handleAddtask(){
            this.taskAddUpdForm.visible = true;
            this.taskAddUpdForm.title = "新建任务"
        },
        handleAddEntry(){
            this.entryAddUpdForm.visible = true;
            this.entryAddUpdForm.title = "增加子任务"
        },
        handleClearEntry(){
            this.taskAddUpdForm.task = [];
        },
        addEntry(){
            // 选中pid后 将其加入tips列表
            for (let index = 0; index < this.task["pids"].length; index++) {

                this.task["pid"].push(this.task["pids"][index]["pid"]);
                this.task["tips"].push(this.task["pids"][index]["tip"]);
            }
            // 将entry加入task列表
            this.taskAddUpdForm.task.push(this.task);

            this.task = {
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
        addTask(){
            console.log(this.taskAddUpdForm.task);
            this.axios.post("/api/v1/JDtask/manageTasks", {
                method: "addTask",
                params: {
                    name: this.taskAddUpdForm.name,
                    task: this.taskAddUpdForm.task,
                }
            }).then(
                res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        // this.buyitemsPage.totalCount = res.data.data.totalCount;
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
        parseTargetUrl(){
            this.axios.post("/api/v1/JDtask/getParsePromoteUrl", {
                targetUrl: this.entryAddUpdForm.targetUrl
            }).then(
                res=>{
                    // console.log(res);
                    this.task.name = res.data.data.title;
                    this.entryAddUpdForm.name = res.data.data.title
                    this.pid_tip_map = res.data.data.pid_tip_map;
                    // console.log(this.pid_tip_map);
                }
            )
        },
    },
    created() {
        this.initTasksData();
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