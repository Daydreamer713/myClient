import Vue from 'vue'
import Router from 'vue-router'
import Title from '@/demo/Title.vue' //上下两种写法均可
import Image from '@/demo/Image' //上下两种写法均可

import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history', // 默认路由模式是hash，指定history路由模式能去掉url后面的#号
  routes: [{
    // path: '/goods/:goodsId', 动态路由
    path: '/', //goods 里有子路由，就要在 goods 的 vue 里用router view
    name: 'GoodsList',
    components: {
      default: GoodsList, //命名视图
      title: Title,
      img: Image,
    }
  }, {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  }, {
    path: '/address',
    name: Address,
    component: Address
  },
  {
    path: '/orderConfirm',
    name: OrderConfirm,
    component: OrderConfirm
  },
  {
    path: '/orderSuccess',
    name: OrderSuccess,
    component: OrderSuccess
  },
  ]
})
// export let router = new Router({
//   routes: [{
//     path: '/goods',
//     name: 'GoodsList',
//     component: GoodsList
//   }]
// })
