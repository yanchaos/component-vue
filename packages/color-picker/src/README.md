```vue
<template>
    <colorPicker v-model="color" v-on:change="headleChangeColor"></colorPicker>
</template>
<script>
export default {
  data() {
    return {
      color: "#ff0000",
    };
  },
  methods: {
    headleChangeColor(color) {
      alert(`颜色值改变事件：${color}`);
    }
  }
};
</script>
```