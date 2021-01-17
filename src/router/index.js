import Vue from 'vue';

//配置路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//1.创建组件
import Home from '../components/Home.vue'
import buyitems from "../components/Buyitems.vue"
//2. 配置路由
const routes = [
    {
        path: '/home',
        component: Home,
        children:[
            {
                path: 'buyitems',
                component: buyitems,
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