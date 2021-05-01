import Vue from 'vue';

import 'element-ui/lib/theme-chalk/index.css';
import '../css/index.scss';
import '../examples/assets/iconfonts/iconfont.css';
import App from './App.vue';
import request from '../packages/HttpRequest/index';
import ElemnetUI from 'element-ui'

//本地引用需要在安装组件时将request挂载到Vue实例上
request.install = function(Vue) {
    Object.defineProperty(Vue.prototype, '$HttpRequest', { value: request })
}
Vue.use(request)

Vue.use(ElemnetUI)

// const components = [
//     request
// ]
// components.map(component => {
//     Vue.use(component)
// })

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')