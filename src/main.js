// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import store from "./store"

Vue.config.productionTip = false
Vue.filter("price",function(v,d){
        return  "￥"+v
})
//保留1位小数
Vue.filter("round",function(v,d){
  return  v.toFixed(1);
})
//小数转化为百分数
Vue.filter("persent",function(v,d){
  return  (v*100).toFixed(1);
})
Vue.prototype.$event=new Vue();
Vue.prototype.$axios=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
