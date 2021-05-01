
实例：
```vue
<template>
    <table-header-button :operate="buttonList" @create="create" @look="look"></table-header-button>
</template>
<script>
import '../../../examples/assets/iconfonts/iconfont.css'
export default {
  data() {
    return {
      buttonList:[{
        icon: "icon-icon-test53 btn-color-green", //按钮图标(iconfonts -- iconClass)
        remark: "微信", //按钮名称
        event: 'create',  //响应组件的事件名
        disabled: false,  //按钮点击状态（可点）
      },{
        icon: "icon-icon-test52", //按钮图标(iconfonts -- iconClass)
        remark: "gitHub", //按钮名称
        event: 'look',  //响应组件的事件名
        disabled: true, //按钮点击状态（不可点）
      }]
    };
  },
  methods: {
    create(value){
      alert('点击微信按钮:' + value)
    },
    look(value){
      alert('点击gitHub按钮:' + value)
    }
  }
};
</script>
<style scoped>
@font-face {
    font-family: "iconfont";
    src: url('.examples/assets/iconfonts/iconfont.eot');
    /* IE9*/
    src: url('.examples/assets/iconfonts/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('examples/assets/iconfonts/iconfont.woff') format('woff'), /* chrome, firefox */
    url('examples/assets/iconfonts/iconfont.woff2') format('woff2'), /* chrome, firefox */
    url('examples/assets/iconfonts/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('examples/assets/iconfonts/iconfont.svg#iconfont') format('svg');
    /* iOS 4.1- */
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.btn-color-green{
    color: green;
}
</style>
```