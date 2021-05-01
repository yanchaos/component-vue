// 导入组件
import TableHeaderButton from './src/TableHeaderButton.vue'

TableHeaderButton.install = function(Vue) {
    Vue.component(TableHeaderButton.name, TableHeaderButton)
}

export default TableHeaderButton