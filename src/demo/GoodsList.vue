<template>
  <div>
    <p>this is goodslist</p>
    <span>{{$route.params.goodsId}}</span>
    <!-- 子路由要写绝对地址 -->
    <router-link to="/goods/title">商品标题</router-link>
    <router-link to="/goods/img">商品图片</router-link>

    <!-- <router-link to="/cart">购物车</router-link> -->
    <!-- v-bind 绑定以后，里面的obj对象会进行运算，编译，最终生成想要的地址,params:index.js里的路由参数 -->
    <router-link v-bind:to="{name:'cart',params:{cartId:123}}">跳转到购物车</router-link>
    <button @click="jump">到购物车-路由传参</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello",
    };
  },
  methods: {
    jump() {
      // this.$router.go(-2); router 是封装了的 history API
      this.$router.push({ path: "/cart?goodsId=123" });
    },
  },
};
</script>

<style>
</style>
