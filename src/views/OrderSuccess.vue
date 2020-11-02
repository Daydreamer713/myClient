<template>
  <div>
    <nav-header></nav-header>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="/static/ok-2.png" alt="" />
        </div>
        <div class="order-create-main">
          <h3>恭 喜 您! <br />订 单 提 交 成 功!</h3>
          <p>
            <span>订单编号：{{ orderId }}</span>
            <span>总金额：{{ orderTotal | currency("￥") }}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">返回商品列表</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import axios from "axios";
export default {
  data() {
    return {
      orderId: "",
      orderTotal: 0,
    };
  },
  components: {
    NavHeader,
    NavFooter,
  },
  mounted() {
    let orderId = this.$route.query.orderId;
    if (!orderId) {
      return;
    }
    axios
      .get("/users/orderDetail", {
        params: {
          orderId: orderId,
        },
      })
      .then((resp) => {
        let res = resp.data;
        if (res.status == 0) {
          this.orderId = res.result.orderId;
          console.log(`${this.orderId}`);
          this.orderTotal = res.result.orderTotal;
        }
      });
  },
};
</script>
