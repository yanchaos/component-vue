<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <color-picker
      v-model="color"
      v-on:change="headleChangeColor"
    ></color-picker>
    <table-header-button
      :operate="buttonList"
      @create="create"
      @look="look"
    ></table-header-button>
    <icon-picker v-model="class_name"></icon-picker>
    <!-- <insider-select @getInsiderList="userChange" :tableUrl="tableUrl" :tableReqParams="tableReqParams"></insider-select> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TableHeaderButton from "../packages/TableHeaderButton";
import colorPicker from "../packages/color-picker";
import IconPicker from "../packages/IconPicker";
// import InsiderSelect from "../packages/InsiderSelect"

export default {
  name: "App",
  data() {
    return {
      tableUrl: "api/user/list",
      class_name:"",
      tableReqParams: {
        roleId: "",
      },
      tableData: [
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚",
          sex: "MALE",
          userName: "A0020",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "张三",
          sex: "MALE",
          userName: "A0021",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚2",
          sex: "MALE",
          userName: "A0022",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚3",
          sex: "MALE",
          userName: "A0023",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚4",
          sex: "MALE",
          userName: "A0024",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚5",
          sex: "MALE",
          userName: "A0025",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚6",
          sex: "MALE",
          userName: "A0026",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚9",
          sex: "MALE",
          userName: "A0029",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚7",
          sex: "MALE",
          userName: "A0027",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "陈诚8",
          sex: "MALE",
          userName: "A0028",
        },
      ],
      color: "#ff0000",
      buttonList: [
        {
          icon: "icon-icon-test53 btn-green",
          remark: "微信",
          event: "create",
          disabled: false,
        },
        {
          icon: "icon-icon-test52",
          remark: "gitHub",
          event: "look",
          disabled: false,
        },
      ],
      userInfo: null,
    };
  },
  components: {
    HelloWorld,
    "table-header-button": TableHeaderButton,
    "color-picker": colorPicker,
    "icon-picker": IconPicker,
    // InsiderSelect
  },

  methods: {
    userChange: function (data) {
      this.userInfo = data;
      console.log(this.userInfo);
    },
    create(value) {
      console.log(value);
    },
    look(value) {
      console.log(value);
    },
    loadData() {
      this.tableData = [
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "张三",
          sex: "MALE",
          userName: "A0020",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "李四",
          sex: "MALE",
          userName: "A0020",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "王麻子",
          sex: "MALE",
          userName: "A0020",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "王麻子",
          sex: "MALE",
          userName: "A0020",
        },
        {
          email: "123@163.com",
          orgId: "330000001108",
          phone: "15929929075",
          realName: "王麻子",
          sex: "MALE",
          userName: "A0020",
        },
      ];
    },
    headleChangeColor(color) {
      console.log(`颜色值改变事件：${color}`);
      console.log(color);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn-green {
  color: green;
}
.use-select-box {
  width: 25%;
}
</style>
