// 导入颜色选择器组件
// import colorPicker from './color-picker'
import TableHeaderButton from './TableHeaderButton'
import HttpRequest from './HttpRequest'
import InsiderSelect from './InsiderSelect'
import IconPicker from './IconPicker'

// 存储组件列表
const components = [
    // colorPicker,
    TableHeaderButton,
    HttpRequest,
    InsiderSelect,
    IconPicker
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
    // 判断是否可以安装
    if (install.installed) return
    install.installed = true
        // 遍历并注册全局组件
    components.map(component => {
        console.log('register:' + component.name);
        if (component.name == 'HttpRequest') {
            Object.defineProperty(Vue.prototype, '$HttpRequest', { value: HttpRequest })
        } else {
            Vue.component(component.name, component)
        }

    })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // 以下是具体的组件列表
    // colorPicker,
    TableHeaderButton,
    HttpRequest,
    InsiderSelect,
    IconPicker
}