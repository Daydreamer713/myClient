<template>
  <div>
    <button v-on:click="Increase">+</button>
    <button @click="Decrease">-</button>
    <p>{{number}}</p>
  </div>
</template>

<script>
export default {
  props: ["number"], //从父组件传值到子组件,只能父到子
  data() {
    return {
      number: 0,
    };
  },
  methods: {
    Increase() {
      // this.number++;
      this.$emit("incre"); //通过 emit 触发父组件方法
    },
    Decrease() {
      // this.number--;
      this.$emit("decre");
    },
  },
};
</script>

<style scoped>
</style>
