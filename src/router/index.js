import Vue from 'vue';

//配置路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//1.创建组件
import Home from '../components/Home.vue'
import buyitems from "../components/Buyitems.vue"
import taskmanager from "../components/TaskManager.vue"
import accountmanager from "../components/AccountManager.vue"
import productanalysis from "../components/ProductAnalysis.vue"
import vipproductanalysis from "../components/VIPProductAnalysis.vue"
//2. 配置路由
const routes = [
    {
        path: '/home',
        component: Home,
        children:[
            {
                path: 'buyitems',
                component: buyitems,
            },
            {
                path: 'taskmanager',
                component: taskmanager,
            },
            {
                path: 'accountmanager',
                component: accountmanager,
            },
            {
                path: 'productanalysis',
                component: productanalysis,
            },
            {
                path: 'vipproductanalysis',
                component: vipproductanalysis,
            }
        ]
    },
    
]
//3. 实例化vueRouter
const router = new VueRouter(
   { mode: 'history',
   routes}
)

export default router;