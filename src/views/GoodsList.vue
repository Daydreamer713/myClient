<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>商品</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a @click="sortGoods" href="javascript:void(0)" class="price">
            <span>价格</span>
            <span
              class="sort-arrow-up"
              v-bind:class="{ 'sort-arrow': !sortFlag }"
              >↑</span
            >
            <!-- <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg> -->
          </a>
          <a
            href="javascript:void(0)"
            class="filterby stopPop"
            @click="showFilterPop"
            >Filter by</a
          >
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div
            class="filter stopPop"
            id="filter"
            v-bind:class="{ 'filterby-show': filterBy }"
          >
            <dl class="filter-price">
              <dt>价格区间：</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  v-bind:class="{ cur: priceChecked == 'all' }"
                  @click="setPriceFilter('all')"
                  >全部</a
                >
              </dd>
              <dd v-for="(price, index) in priceFilter" :key="index">
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter(index)"
                  v-bind:class="{ cur: priceChecked == index }"
                  >{{ price.startPrice }} - {{ price.endPrice }}</a
                >
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item, index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#">
                      <!-- <img v-bind:src="'/static/'+item.productImg" alt="图片加载失败" />使用v-bind后，双引号之间为js表达式 -->
                      <img v-lazy="'/static/' + item.productImage" alt />
                      <!-- 使用v-bind后，双引号之间为js表达式 -->
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{ item.productName }}</div>
                    <div class="price">{{ item.salePrice }}</div>
                    <div class="btn-area">
                      <a
                        @click="addCart(item.productId)"
                        href="javascript:;"
                        class="btn btn--m"
                        >加入购物车</a
                      >
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="load-more"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="30"
              >
                <img
                  src="../../static/loading-svg/loading-spinning-bubbles.svg"
                  v-show="loading"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>

    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">请先登录哦！不然宝贝不知道要去哪 QAQ</p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="closeModal">关闭</a>
      </div>
    </modal>

    <modal v-bind:mdShow="mdCartShow" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xlink:href="#icon-status-ok" /></svg
        >宝贝成功加入购物车！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="closeModal">继续购物</a>
        <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import "@/assets/css/base.css";
import "@/assets/css/product.css";
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import NavBread from "@/components/NavBread";
import Modal from "./../components/Modal";
import axios from "axios";
export default {
  data() {
    return {
      goodsList: [],
      sortFlag: true,
      page: 1,
      pageSize: 4,
      busy: true, // 不可滚动加载
      loading: true,
      mdShow: false,
      mdCartShow: false,
      priceFilter: [
        {
          startPrice: "0.00",
          endPrice: "1000.00",
        },
        {
          startPrice: "1000.00",
          endPrice: "3000.00",
        },
        {
          startPrice: "3000.00",
          endPrice: "9000.00",
        },
      ],
      priceChecked: "all",
      filterBy: false,
      overLayFlag: false,
    };
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal,
  },
  mounted() {
    //初始化，加载商品列表
    this.getGoodsList();
  },
  methods: {
    getGoodsList(flag) {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked,
      };
      this.loading = true; // 接口请求前
      axios.get("/goods/list", { params }).then((response) => {
        let res = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 1500);
        if (res.status == "0") {
          if (flag) {
            // 有 true 说明是分页操作
            this.goodsList = this.goodsList.concat(res.result.list);
            if (res.result.count < 4) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            this.goodsList = res.result.list;
            this.busy = false;
          }
        } else {
          this.goodsList = [];
        }
      });
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    setPriceFilter(index) {
      this.closePop();
      this.page = 1;
      if (index == "all") {
        this.priceChecked = "all";
      } else {
        this.priceChecked = index;
      }
      this.getGoodsList();
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop() {
      this.filterBy = false;
      this.overLayFlag = false;
    },
    loadMore() {
      this.busy = true; //不继续滚动
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    addCart(id) {
      axios.post("/goods/addCart", { productId: id }).then((res) => {
        if (res.data.status == 0) {
          this.mdCartShow = true;
          this.$store.commit("updateCartCount",1);
        } else {
          this.mdShow = true;
        }
      });
    },
    closeModal() {
      this.mdShow = false;
      this.mdCartShow = false;
    },
  },
};
</script>

<style scoped>
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.sort-arrow {
  transform: rotate(180deg);
  transition: all 0.5s ease-in-out;
  display: inline-block;
  vertical-align: middle;
}
.sort-arrow-up {
  display: inline-block;
  transition: all 0.5s ease-in-out;
}
</style>
