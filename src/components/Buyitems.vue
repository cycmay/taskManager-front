<template>
    <div id="buyitems">
        <!-- <el-form :online="true" :modle="buyitemForm" class="demo-form-inline">
            <el-form-item lable="">
                <el-input
                    v-model=""
        </el-form>  -->
        <el-row
            >
            <el-col :span="8">
                <el-form 
                    :label-position="labelPosition" 
                    label-width="100px" 
                    :model="buyitemOverview"
                    >
                    <el-form-item label="待收货">
                        <el-input v-model="buyitemOverview.to_be_received"></el-input>
                    </el-form-item>
                    <el-form-item label="待出售">
                        <el-input v-model="buyitemOverview.to_be_sold"></el-input>
                    </el-form-item>
                    <el-form-item label="正在出售">
                        <el-input v-model="buyitemOverview.on_sale"></el-input>
                    </el-form-item>
                    <el-form-item label="已出售">
                        <el-input v-model="buyitemOverview.has_been_sold"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <el-form 
                    :label-position="labelPosition" 
                    label-width="100px" 
                    :model="buyitemOverview"
                    >
                    <el-form-item label="实际盈利">
                        <el-input v-model="buyitemOverview.profit"></el-input>
                    </el-form-item>
                    <el-form-item label="实际成本">
                        <el-input v-model="buyitemOverview.total_buy_cost"></el-input>
                    </el-form-item>
                    <el-form-item label="实际总成本">
                        <el-input v-model="buyitemOverview.total_cost"></el-input>
                    </el-form-item>
                    <el-form-item label="总销售额">
                        <el-input v-model="buyitemOverview.sold_total"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <el-form 
                    :label-position="labelPosition" 
                    label-width="100px" 
                    :model="buyitemOverview"
                    >
                    <el-form-item label="利率比">
                        <el-input v-model="buyitemOverview.ceil"></el-input>
                    </el-form-item>
                    <el-form-item label="预计盈利">
                        <el-input v-model="buyitemOverview.profit_expect"></el-input>
                    </el-form-item>
                    <el-form-item label="预计成本">
                        <el-input v-model="buyitemOverview.cost_future"></el-input>
                    </el-form-item>
                    <el-form-item label="预计利率比">
                        <el-input v-model="buyitemOverview.ceil_future"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            
        </el-row>
        <el-row>
            <el-tabs type="border-card" @tab-click="handleGoodStatusTab">
                <el-tab-pane label="已购买未收货" name="1"></el-tab-pane>
                <el-tab-pane label="已收货未出售" name="2"></el-tab-pane>
                <el-tab-pane label="正在出售" name="3"></el-tab-pane>
                <el-tab-pane label="已售出" name="4"></el-tab-pane>
            </el-tabs>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-input  v-model="buyitemsQueryKeywords" width=200></el-input>
                <el-button type="primary" plain @click="handleQueryKeywords()">关键字搜索</el-button>
                <el-button type="primary" plain @click="handleAddBuyitem()">添加条目</el-button>
                <el-button type="primary" plain @click="flashBuyitemDuInfo()">刷新得物信息</el-button>
            </el-col>
            
            <el-col class="main-col" :span="24">
                <el-table 
                    :data="buyitemsData" 
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
                    <el-table-column label="名称"
                        width="320"
                        fixed="left"
                        >
                        <template slot-scope="scope">
                            <img :src="scope.row.imageUrl" width='80'>
                            <span style="margin-left: 10px">{{ scope.row.name == null ? '' : scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="货号" width="150">
                         <template slot-scope="scope"
                            >
                            <el-popover
                                placement="right"
                                width="500"
                                trigger="click"
                                class="bg-purple-light"
                                >
                                <el-row
                                    >
                                    <el-col
                                        :span="6"
                                        >
                                        Title
                                    </el-col>
                                    <el-col
                                        :span="16"
                                        v-text="DuProductInfoData.title"
                                        >
                                    </el-col>
                                </el-row>
                                <el-row
                                    :gutter="20"
                                    >
                                    <el-col
                                        :span="6"
                                        >
                                        SoldNum
                                    </el-col>
                                    <el-col
                                        :span="6"
                                        v-text="DuProductInfoData.soldNum"
                                        >
                                    </el-col>
                                </el-row>
                                <el-row
                                    :gutter="20"
                                    >
                                    <el-col
                                        :span="6"
                                        >
                                        SellDate
                                    </el-col>
                                    <el-col
                                        :span="6"
                                        v-text="DuProductInfoData.sellDate"
                                        >
                                    </el-col>
                                </el-row>
                                <el-row
                                    >
                                    <el-col
                                        :span="6"
                                        >
                                        UpdateTime
                                    </el-col>
                                    <el-col
                                        :span="6"
                                        >
                                        <span>
                                            {{ formatDate_func(DuProductInfoData.updateTime) }}
                                        </span>
                                        
                                    </el-col>
                                </el-row>
                                <el-row
                                    v-for="data in DuProductInfoData.priceList"
                                    :key="data.size"
                                >
                                    
                                    <el-row type="flex" class="row-bg"
                                        
                                    >
                                        <el-col :span="2">{{ data.size }}</el-col>
                                        <el-col :span="8"
                                            v-for="item in data.tradeChannelInfoList"
                                            :key="item.tradeDesc"
                                            >
                                            <div>
                                                <span width="150" v-text="item.tradeDesc" ></span>
                                                <span width="100" v-text="item.price/100"></span>
                                            </div>
                                        </el-col>
                                        
                                    </el-row>
                                </el-row>
                                
                                <el-button slot="reference" @click="getArticleNumberDuProductData(scope.row.articleNumber)">{{ scope.row.articleNumber == null ? '' : scope.row.articleNumber }}</el-button>
                            </el-popover>
                        
                            <!-- <span style="margin-left: 10px">{{ scope.row.articleNumber == null ? '' : scope.row.articleNumber }}</span> -->
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
                    <el-table-column label="浮动">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">
                                <i v-if="scope.row.floating>0"
                                    class="el-icon-top"
                                    style="color:red;"></i>
                                <i v-else
                                    class="el-icon-bottom"
                                    style="color:green;"></i>
                                {{ scope.row.floating == null ? '' : scope.row.floating }}</span>
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
                    <el-table-column label="操作" width="240"
                        fixed="right">
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
                <el-form-item
                    label="项目状态"
                    label-width="120px">
                    <el-select
                        v-model="buyitemAddUpdForm.goodStatus"
                        placeholder="请选择项目状态"
                        >
                        <el-option
                            v-for="item in goodStatusOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
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
                    <span>{{ buyitemSoldForm.name }}</span>
                </el-form-item>
               
                <el-form-item
                    label="出售平台"
                    label-width="120px">
                    <el-select
                        v-model="buyitemSoldForm.soldTypeId"
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
                        v-model="buyitemSoldForm.soldPrice"
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
                        v-model="buyitemSoldForm.soldTime"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="buyTimePickerOptions">
                        </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="buyitemSoldForm.visible = false">没意思</el-button>
                <el-button type="primary" @click="soldBuyitem()">就这样</el-button>
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
            goodStatusOptions: [],
            goodStatusMap: {}, // good status id-name 映射表
            buyitemsPage: {
                showCount: 20,
                totalCount: 0,
                current: 1
            },
            // buyitems 查询 goodstatus参数
            buyitemsQueryGoodStatus: null,
            // buyitems 查询 keywords关键字
            buyitemsQueryKeywords: null,
            buyitemsData:[],
            buyitemSoldForm: {
                visible: false,
                title: "售出buyitem",
                id: null,
                name: "",
                buyCost: 0.0,
                soldTime: (new Date()).getTime(),
                soldTypeId: "",
                soldPrice: 0.0,
                goodStatus: "",
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
            labelPosition: 'right',
            buyitemOverview: {
                // 待收货
                to_be_received: '',
                // 待出售
                to_be_sold: '',
                // 正在出售
                on_sale: '',
                // 已出售
                has_been_sold: '',
                // 实际盈利 选取已经售出的商品
                profit: '',
                // 实际成本 选取已经售出的商品
                total_buy_cost: '',
                // 总花费
                total_cost: '',
                // 总销售额
                sold_total: '',
                //  利率比
                ceil: '',
                // 预计盈利
                profit_expect: '',
                // 预计成本
                cost_future: '',
                // 预计利率比
                ceil_future: '',
            },
            // 得物的数据
            DuProductInfoData: {
                articleNumber: "",
                authPrice: "", // 发售价格
                logoUrl: "", // logoUrl
                priceList: [], // price数据
                sellDate: "", // 发售日期
                soldNum: 0, // 已售数量
                title: "", // 得物产品title
                updateTime: new Date(), // 数据更新日期
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
        // 格式化时间
        formatDate_func(data) {
            // console.log(data);
            if(data == null) {
                return null
            }
            data = parseInt(data)*1000;
            let dt = new Date(data);
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
        },
        // select框远程查询
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
            console.log(this.buyitemsQueryKeywords);
            console.log(this.buyitemsQueryGoodStatus);
            this.axios.get("/api/v1/getBuyitems", {
                params:{
                    currentPage: this.buyitemsPage.current,
                    showCount: this.buyitemsPage.showCount,
                    goodStatus: this.buyitemsQueryGoodStatus,
                    keywords: this.buyitemsQueryKeywords,
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
        // 获取articleNumber在得物的信息
        getArticleNumberDuProductData(articleNumber){
            this.axios.get("/api/v1/duproducts", {
                    params:{
                        keyword: articleNumber
                    }
                }).then(
                    res=>{
                        // console.log(res);
                        if(res.data.code === 200){
                            if(res.data.data.products.length>0){
                                this.DuProductInfoData = res.data.data.products[0];
                            }
                            else{
                                this.DuProductInfoData = {}
                            }
                        }else{
                            this.alert(res.data, "错误")
                        }
                        // console.log(this.DuProductInfoData);
                    }
                );
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
            this.buyitemAddUpdForm.goodStatus = row.goodStatus;
            // console.log(this.buyitemAddUpdForm);
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
            this.buyitemSoldForm.id = row.id;
            this.buyitemSoldForm.name = row.name;
            this.buyitemSoldForm.buyTypeId = row.buyTypeId;
            this.buyitemSoldForm.buyCost = row.buyCost;
            this.buyitemSoldForm.soldTypeId = row.soldTypeId;
            this.buyitemSoldForm.soldPrice = row.soldPrice;
            // 售出状态为4
            this.buyitemSoldForm.goodStatus = 4;
            console.log(this.buyitemSoldForm);
        },
        soldBuyitem(){
             this.axios.post(
                "/api/v1/soldBuyitem",{
                    buyitem: this.buyitemSoldForm
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
                    this.buyitemSoldForm.visible = false;
                }
            )
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
                }
            )
        },
        // 获取overview数据
        initBuyitemsOverviewData(){
            this.axios.get('/api/v1/getBuyitemsOverview', {}).then(
                res=>{
                    // console.log(res);
                    if(res.data.code===200){
                        this.buyitemOverview = res.data.data;
                    }
                }
            );
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
                        for(var index in res.data.data.goodStatusMap){
                            this.goodStatusOptions.push({
                                "id": index,
                                "name": res.data.data.goodStatusMap[index]
                            })
                        }
                    }
                }
            );
        },
        handleGoodStatusTab(tab, event){
            this.buyitemsQueryGoodStatus = parseInt(tab.index)+1; 
            this.initBuyitemsData();
        },
        handleQueryKeywords(){
            this.initBuyitemsData();
        },
        // 点击更新得物的buyitem信息
        flashBuyitemDuInfo(){
            this.axios.post(
                "/api/v1/flashBuyitemsDuInfo",{
                }             
            ).then(
                res=>{
                    if(res.data.code === 200){
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                    }
                }
            )
        },
    },
    created: function(){
        this.initBuyitemsData(null);
        this.initConfigData();
        this.initBuyitemsOverviewData();
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

.el-popover {
     background: #409EFF;
     border-radius: 5px;
     border-color: #d3dce6;
     border-width: medium;
     color: #fff;
     font-size:medium;
     padding: 25px;
}

.el-row {
    margin-bottom: 10px;
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
    background: #909399;
  }
.grid-content {
border-radius: 4px;
min-height: 36px;
}
/* .row-bg {
padding: 10px 0;
color: #f9fafc;
} */
</style>
