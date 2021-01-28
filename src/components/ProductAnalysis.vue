<template>
    <div id="productanalysis">
        <el-row>
            <el-col
                :span="2">
                <span>
                    搜索vendorId
                </span>
                
            </el-col>
            <el-col
                :span="3">
                <el-select
                    v-model="selectProductFrom.shopVendorId"
                    placeholder="请选择shop id"
                    >
                    <el-option
                        v-for="item in shopsOptions"
                        :key="item.vendorId"
                        :label="item.shopname"
                        :value="item.vendorId">
                    </el-option>
                </el-select>
            </el-col>
            <el-col
                :span="2">
                <span>
                    最小利润率
                </span>
            </el-col>
            <el-col
                :span="3"
                >
                <el-input
                    v-model="selectProductFrom.minInterestRate"
                    placeholder="输入最小利润率"
                    >
                </el-input>
            </el-col>
            <el-col
                :span="2">
                <span>
                    最小得物销售数量
                </span>
                
            </el-col>
            <el-col
                :span="3"
                >
                <el-input
                    v-model="selectProductFrom.minDuSoldNum"
                    placeholder="输入最小得物销售数量"
                    >
                </el-input>
            </el-col>
            <el-button type="primary" plain @click="selectVendorId()">搜索</el-button>
        </el-row>
        <el-row>
            <el-col class="main-col" :span="24">
                <el-table 
                        :data="productsData" 
                        height="960"
                        border
                        stripe
                        style="width: 100%"
                    >

                    <el-table-column
                        label="序号"
                        type="index"
                        align="center"
                        >
                        <template slot-scope="scope">
                            {{ scope.$index + (productsPage.current - 1) * productsPage.showCount + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="productId"
                        prop="productId"
                        width="120"
                        >
                        <template slot-scope="scope">
                            <el-button size="mini"
                            @click="handleViewProductJD(scope.$index, scope.row)">{{ scope.row.productId == null ? '' : scope.row.productId }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="vendorId" 
                        prop="vendorId"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.vendorId == null ? '' : scope.row.vendorId }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="articleNumber" 
                        prop="articleNumber"
                        width="120"
                        >
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
                                            {{ formatDate(DuProductInfoData.updateTime) }}
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
                    <el-table-column label="img" width="60"
                        prop="imageUrl"
                        >
                        <template slot-scope="scope">
                            <img :src="scope.row.imageUrl" width="50" style="margin-right:5px">
                        </template>
                    </el-table-column>
                    <el-table-column label="title" 
                        prop="title"
                        width="480"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.title == null ? '' : scope.row.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="price" 
                        prop="price"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.price == null ? '' : scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="finalPrice" 
                        prop="finalPrice"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.finalPrice == null ? '' : scope.row.finalPrice }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="size" 
                        prop="size"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.size == null ? '' : scope.row.size }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="duPrice" 
                        prop="duPrice"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.duPrice == null ? '' : scope.row.duPrice }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="duSoldNum" 
                        prop="duSoldNum"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.duSoldNum == null ? '' : scope.row.duSoldNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="gap" 
                        prop="gap"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.gap == null ? '' : scope.row.gap }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="interest" 
                        prop="interest"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.interest == null ? '' : scope.row.interest }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="interestRate" 
                        prop="interestRate"
                        >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.interestRate == null ? '' : scope.row.interestRate }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pager" style="padding-top:10px; padding-right:10px; float: right;">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :hide-on-single-page="false"
                        :current-page="productsPage.current"
                        :page-sizes="[5, 10, 20, 30, 50, 100]"
                        :page-size="productsPage.showCount"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="productsPage.totalCount"
                    >
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>


</template>

<script>
export default {
    data() {
        return {
            productsData: [], // 分析的数据
            shopsOptions: [], // 京东店铺的数据
            // 查询产品的form
            selectProductFrom:{
                shopVendorId: "",
                minDuSoldNum: 200,
                minInterestRate: 0.2,
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
            // 分页数据管理
            productsPage: {
                showCount: 100,
                totalCount: 0,
                current: 1
            },
            productJDWeb:{
                visible: true
            },

        }
    },
    methods: {
        handleSizeChange(val) {
            this.productsPage.showCount = val;
            this.productsPage.current = 1;
            this.initProductsData();
        },
        handleCurrentChange(val) {
            this.productsPage.current = val;
            this.initProductsData();
        },
        selectVendorId(){
            this.initProductsData();
        },
        initProductsData(){
            this.axios.get("/api/v1/JDForecast/getForecastProducts", {
                params:{
                    currentPage: this.productsPage.current,
                    showCount: this.productsPage.showCount,
                    vendorId: this.selectProductFrom.shopVendorId,
                    minInterestRate: this.selectProductFrom.minInterestRate,
                    minDuSoldNum: this.selectProductFrom.minDuSoldNum
                }
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.productsPage.totalCount = res.data.data.totalCount;
                        this.productsData = res.data.data.products;
                    }else{
                        this.alert(res.data, "错误");
                    }
                }
            )
        },
        // 获取shops数据
        initShopsData(){
            this.axios.get("/api/v1/JDForecast/getForecastShops", {
                params:{
                    
                }
            }).then(
                res=>{
                    // console.log(res);
                    if(res.data.code === 200){
                        this.shopsOptions = res.data.data.shops;
                        // console.log(this.shopsOptions);
                    }else{
                        this.alert(res.data, "错误");
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

        // 打开product详情页面
        handleViewProductJD(index, row){
            window.open("https://item.jd.com/"+ row.productId +".html","", "height=900, width=1600");
        },

        // 格式化时间
        formatDate(data) {
            // console.log(data);
            if(data == null) {
                return null
            }
            data = parseInt(data)*1000;
            let dt = new Date(data);
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
        },
    },
    created:function(){
        this.initProductsData();
        this.initShopsData();
    },
}
</script>

<style>

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
