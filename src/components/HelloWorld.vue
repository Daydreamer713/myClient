<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Counter v-bind:number="number" v-on:incre="increase" v-on:decre="decrease"></Counter>
    <p>parrent:{{number}}</p>
  </div>
</template>

<script>
import Counter from "./Counter";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      number: 10,
    };
  },
  components: {
    Counter,
  },
  methods: {
    increase() {
      this.number++;
    },
    decrease() {
      this.number++;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
