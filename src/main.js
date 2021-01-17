// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import router from './router/index.js'
import axios from 'axios';
import Vueaxios from 'vue-axios';


Vue.use(ElementUI);
Vue.prototype.axios = axios
Vue.use(Vueaxios, axios);

Vue.config.productionTip = false

var baseURLStr = window.location.protocol + "//" + window.location.hostname;
if (window.location.port != "") {
  baseURLStr = baseURLStr + ":" + window.location.port;
}
// baseURLStr = baseURLStr + "/evaluate/";
//axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? baseURLStr : baseURLStr
axios.defaults.baseURL = "http://127.0.0.1:5000"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h=>h(App)
});
