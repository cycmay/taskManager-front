<template>
    <div id="buyitems">
        <!-- <el-form :online="true" :modle="buyitemForm" class="demo-form-inline">
            <el-form-item lable="">
                <el-input
                    v-model=""
        </el-form>  -->
        <el-row>
            <el-button type="primary" plain @click="handleAddBuyitem()">添加条目</el-button>
            <el-col class="main-col" :span="24">
                <el-table 
                    :data="buyitemsData" 
                    height="960"
                    border 
                    stripe
                    style="width: 100%"
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        fixed="left"
                        align="center"
                        >
                        <template slot-scope="scope">
                            {{ scope.$index + (buyitemsPage.current - 1) * buyitemsPage.showCount + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="ID" width="60" fixed
                        prop="id"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.id == null ? '' : scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" width="480">
                        <template slot-scope="scope">
                            <img :src="scope.row.imageUrl" width='35'>
                            <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="货号" width="150">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.articleNumber == null ? '' : scope.row.articleNumber }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="尺码">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.size == null ? '' : sizeMap[scope.row.size] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="购买平台">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.buyTypeId == null ? '' : buyTypeMap[scope.row.buyTypeId] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="成本">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.buyCost == null ? '' : scope.row.buyCost }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出售平台">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.soldTypeId == null ? '' : soldTypeMap[scope.row.soldTypeId] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="期望价格">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.soldPriceExpect == null ? '' : scope.row.soldPriceExpect }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出售价格">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.soldPrice == null ? '' : scope.row.soldPrice }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="期望利润">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.profitExpect == null ? '' : scope.row.profitExpect }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="利润">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.profit == null ? '' : scope.row.profit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="期望利润率">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.interestRateExpect == null ? '' : scope.row.interestRateExpect }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="利润率">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.interestRate == null ? '' : scope.row.interestRate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="购买日期"
                        prop="buyTime"
                        :formatter="formatDate"
                        >
                        <!-- <template slot-scope="scope" style="dispaly:none">
                            <span style="margin-left: 10px"  value-format="yyyy-MM-dd">{{ scope.row.buyTime == null ? '' : scope.row.buyTime }}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="出售日期"
                        prop="soldTime"
                        :formatter="formatDate"
                        >
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.goodStatus == null ? '' : goodStatusMap[scope.row.goodStatus] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleUpdBuyitem(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDeleteBuyitem(scope.$index, scope.row)">删除</el-button>
                            <el-button size="mini" type="alert" @click="handleSoldBuyitem(scope.$index, scope.row)">售出</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pager" style="padding-top:10px; padding-right:10px; float: right;">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :hide-on-single-page="false"
                        :current-page="buyitemsPage.current"
                        :page-sizes="[5, 10, 20, 30, 50, 100]"
                        :page-size="buyitemsPage.showCount"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="buyitemsPage.totalCount"
                    >
                    </el-pagination>
                </div>
        </el-col>
        </el-row>

        <el-dialog 
            :title="buyitemAddUpdForm.title"
            :visible.sync="buyitemAddUpdForm.visible"
            width="690px"
        >
            <el-form label-position="left">
                <el-form-item
                    label="名称"
                    label-width="120px"
                >
                    <el-select
                        v-model="buyitemAddUpdForm.productId"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="selectNameQuery"
                        style="width: 400px;"
                        >
                        <el-option
                            v-for="item in nameOptions"
                            :key="item.productId"
                            :label="item.title"
                            :value="item.productId">
                            <img :src="item.logoUrl" width="50" style="margin-right:5px">
                            <span>[{{ item.articleNumber }}]{{ item.title }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="尺码"
                    label-width="120px">
                     <el-select
                        v-model="buyitemAddUpdForm.size"
                        placeholder="请选择尺码"
                        >
                        <el-option
                            v-for="item in sizeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="购买平台"
                    label-width="120px">
                    <el-select
                        v-model="buyitemAddUpdForm.buyTypeId"
                        placeholder="请选择购买平台"
                        >
                        <el-option
                            v-for="item in buyTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    
                </el-form-item>
                <el-form-item
                    label="购买价格"
                    label-width="120px">
                    <el-input
                        style="width:100px;"
                        v-model="buyitemAddUpdForm.buyCost"
                        placeholder="请输入购买价格">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="购买日期"
                    label-width="120px"
                    >
                    <el-date-picker
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        v-model="buyitemAddUpdForm.buyTime"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="buyTimePickerOptions">
                        </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="期望出售平台"
                    label-width="120px">
                    <el-select
                        v-model="buyitemAddUpdForm.soldTypeId"
                        placeholder="请选择出售平台"
                        >
                        <el-option
                            v-for="item in soldTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    
                </el-form-item>
                <el-form-item
                    label="期望出售价格"
                    label-width="120px">
                    <el-input
                        style="width:100px;"
                        v-model="buyitemAddUpdForm.soldPriceExpect"
                        placeholder="请输入期望价格">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="buyitemAddUpdForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="alterBuyitem()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog 
            :title="buyitemSoldForm.title"
            :visible.sync="buyitemSoldForm.visible"
            width="690px"
        >
            <el-form label-position="left">
                <el-form-item
                    label="名称"
                    label-width="120px"
                >  
                    <span>{{ buyitemAddUpdForm.name }}</span>
                </el-form-item>
               
                <el-form-item
                    label="出售平台"
                    label-width="120px">
                    <el-select
                        v-model="buyitemAddUpdForm.soldTypeId"
                        placeholder="请选择售出平台"
                        >
                        <el-option
                            v-for="item in soldTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    
                </el-form-item>
                <el-form-item
                    label="出售价格"
                    label-width="120px">
                    <el-input
                        style="width:100px;"
                        v-model="buyitemAddUpdForm.soldPrice"
                        placeholder="请输入购买价格">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="出售日期"
                    label-width="120px"
                    >
                    <el-date-picker
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        v-model="buyitemAddUpdForm.soldTime"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="buyTimePickerOptions">
                        </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="buyitemSoldForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="alterBuyitem()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            nameOptions: [],
            sizeOptions: [],
            sizeMap: {}, // size id-name 映射表
            buyTypeOptions: [],
            buyTypeMap: {}, // buyType id-name 映射表
            soldTypeOptions: [],
            soldTypeMap: {}, // soldType id-name 映射表
            goodStatusMap: {}, // good status id-name 映射表
            buyitemsPage: {
                showCount: 20,
                totalCount: 0,
                current: 1
            },
            buyitemsData:[],
            buyitemSoldForm: {
                visible: false,
                title: "售出buyitem"
            },
            buyitemAddUpdForm: {
                title: "",
                visible: false,
                id: null,
                productId: "", // 通过id查询详细信息
                name: "",
                articleNumber: "",
                size: "",
                buyTypeId: "",
                buyCost: 0.0,
                buyTime: (new Date()).getTime(),
                soldTime: (new Date()).getTime(),
                soldTypeId: "",
                soldPrice: 0.0,
                soldPriceExpect: 0.0,
                goodStatus: "",
                submitState: "",

            },
            buyTimePickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
        };
    },
    methods:{
        // buyTimeChange(val) {
        //     this.buyitemAddUpdForm.buyTime = val.getTime();
        // },
         //方法区
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
        selectNameQuery(query){
            if (query !== '') {
                this.axios.get("/api/v1/duproducts", {
                    params:{
                        keyword: query
                    }
                }).then(
                    res=>{
                        // console.log(res);
                        if(res.data.code === 200){
                           this.nameOptions = res.data.data.products;
                        }else{
                            this.alert(res.data, "错误")
                        }
                    }
                );
            } else {
                this.nameOptions;
            }
        },
        handleSizeChange(val) {
            this.buyitemsPage.showCount = val;
            this.buyitemsPage.current = 1;
            this.initBuyitemsData();
        },
        handleCurrentChange(val) {
            this.buyitemsPage.current = val;
            this.initBuyitemsData();
        },
        initBuyitemsData(){
            this.axios.get("/api/v1/getBuyitems", {
                params:{
                    currentPage: this.buyitemsPage.current,
                    showCount: this.buyitemsPage.showCount
                }
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.buyitemsPage.totalCount = res.data.data.totalCount;
                        this.buyitemsData = res.data.data.buyitems;
                    }else{
                        this.alert(res.data, "错误")
                    }
                }
            )
        },
        handleAddBuyitem(){
            this.buyitemAddUpdForm.title = "添加条目信息";
            this.buyitemAddUpdForm.visible = true;
            this.buyitemAddUpdForm.submitState = 'Add'
        },
        handleUpdBuyitem(index, row){
            this.buyitemAddUpdForm.title = "修改条目信息";
            this.buyitemAddUpdForm.visible = true;
            this.buyitemAddUpdForm.submitState = 'Upd';
            this.buyitemAddUpdForm.id = row.id;
            this.buyitemAddUpdForm.productId = row.productId;
            this.buyitemAddUpdForm.name = row.name;
            this.buyitemAddUpdForm.size = row.size;
            this.buyitemAddUpdForm.buyTypeId = row.buyTypeId;
            this.buyitemAddUpdForm.buyCost = row.buyCost;
            this.buyitemAddUpdForm.buyTime = row.buyTime;
            this.buyitemAddUpdForm.soldTypeId = row.soldTypeId;
            this.buyitemAddUpdForm.soldPriceExpect = row.soldPriceExpect;
        },
        handleDeleteBuyitem(index, row){
            this.$confirm('此操作将永久删除相关记录, 您确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            this.buyitemAddUpdForm.id = row.id;
                            this.buyitemAddUpdForm.submitState = "Del";
                            this.alterBuyitem();
                }).catch(() => {
        
                });
        },
        // 售出buyitem
        handleSoldBuyitem(index, row){
            this.buyitemSoldForm.visible = true;

            this.buyitemAddUpdForm.submitState = 'Upd';
            this.buyitemAddUpdForm.id = row.id;
            this.buyitemAddUpdForm.productId = row.productId;
            this.buyitemAddUpdForm.name = row.name;
            this.buyitemAddUpdForm.size = row.size;
            this.buyitemAddUpdForm.buyTypeId = row.buyTypeId;
            this.buyitemAddUpdForm.buyCost = row.buyCost;
            this.buyitemAddUpdForm.buyTime = row.buyTime;
            this.buyitemAddUpdForm.soldTypeId = row.soldTypeId;
            this.buyitemAddUpdForm.soldPriceExpect = row.soldPriceExpect;
            // 售出状态为4
            this.buyitemAddUpdForm.goodStatus = 4;
        },
        alterBuyitem(){
            // console.log(this.buyitemAddUpdForm);
            this.axios.post(
                "/api/v1/alterBuyitem",{
                    buyitem: this.buyitemAddUpdForm
                }             
            ).then(
                res=>{
                    if(res.data.code === 200){
                        this.initBuyitemsData();
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }
                    this.buyitemAddUpdForm.visible = false;
                    this.buyitemSoldForm.visible = false;
                }
            )
        },
        initConfigData(){
            this.axios.get('/api/v1/getBuyitemsSize', {}).then(
                res=>{
                    // console.log(res);
                    if(res.data.code===200){
                        this.sizeMap = res.data.data.sizeList;
                        for(var index in res.data.data.sizeList){
                            this.sizeOptions.push(
                                {
                                    "id": index,
                                    "name": res.data.data.sizeList[index]
                                }
                            )
                        }
                    }
                }
            );
            this.axios.get('/api/v1/getBuyitemsBuyTypeID', {}).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.buyTypeMap = res.data.data.buyTypeIdList;
                        for(var index in res.data.data.buyTypeIdList){
                            this.buyTypeOptions.push(
                                {
                                    "id": index,
                                    "name": res.data.data.buyTypeIdList[index]
                                }
                            )
                        }
                    }
                }
            );
            this.axios.get('/api/v1/getBuyitemsSoldTypeID', {}).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.soldTypeMap = res.data.data.soldTypeIdList;
                        for(var index in res.data.data.soldTypeIdList){
                            this.soldTypeOptions.push(
                                {
                                    "id": index,
                                    "name": res.data.data.soldTypeIdList[index]
                                }
                            )
                        }
                    }
                }
            );
            this.axios.get('/api/v1/getBuyitemsGoodStatusMap', {}).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.goodStatusMap = res.data.data.goodStatusMap;
                    }
                }
            );
        }
    },
    created: function(){
        this.initBuyitemsData();
        this.initConfigData();
    }
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