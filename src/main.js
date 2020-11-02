// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyLoad from 'vue-lazyload'
import router from './router' //不用写index.js也会自动加载这个文件
import infiniteScroll from 'vue-infinite-scroll'
import Vuex from 'vuex' // 导入成功后记得 Vue.use 去使用它
import { currency } from './util/currency'
// import {
//   router
// } from './router' // 暴露出的接口有名字，就要用解构赋值来接收

// import {
//   sum,
//   minus
// } from '../demo/util'
// import * as util from '../demo/util' //封装到util里，调用时 util.sum()

// console.log(sum(2, 3)); // 能调用 util里的函数
// console.log(minus(2, 3)); // 能调用 util里的函数

Vue.use(Vuex);
Vue.use(VueLazyLoad, {
  loading: "/static/loading-svg/loading-bars.svg"
})
Vue.config.productionTip = false
Vue.use(infiniteScroll);

// 定义全局过滤器
Vue.filter("currency", currency);

// 全局 store 对象
const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount;
    },
    initCartCount(state, cartCount) {
      state.cartCount = cartCount;
    }
  }
})

// 所有的组件都是挂载到这个vue实例上的
new Vue({
  el: '#app',
  router,
  store, // 注册了全局都可用
  components: {
    App
  },
  template: '<App/>'
})
