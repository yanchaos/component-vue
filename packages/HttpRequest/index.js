import HttpRequest from './src/request'
HttpRequest.install = function(Vue) {
    Vue.component(HttpRequest.name, HttpRequest)
}
export default HttpRequest