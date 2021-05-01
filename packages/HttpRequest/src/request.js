import axios from 'axios'
import { Loading, Message } from 'element-ui'
// import base from './base.js'

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = `${base.url}`;

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}

//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL: process.env.BASE_API,
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 3 * 1000
})

/**
 * 请求拦截
 */
service.interceptors.request.use(
    config => {
        startLoading()
        config.data = JSON.stringify(config.data);
        config.headers = {
                'Content-Type': 'application/json;charset=UTF-8'
            }
            //注意使用token的时候用本地localStorage等方法
        const token = localStorage.getItem('token'); //这里取token之前，先拿到token,存一下
        if (token) {
            config.params = { 'token': token } //如果要求携带在参数中
            config.headers.token = token; //如果要求携带在请求头中
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

/**
 * 响应拦截
 */
service.interceptors.response.use(
    response => {
        endLoading()
        return response
    },
    error => {
        endLoading();
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录'
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
        } else {
            //超时处理
            if (JSON.stringify(error).includes("timeout")) {
                Message.error("服务器响应超时，请稍后刷新页面。")
            }
            error.message = '连接到服务器失败';
        }
        Message.error(error.message);
        return Promise.reject(error);
    }
)

const HttpRequest = {
    name: 'HttpRequest',
    /**
     * get方法
     * @param {string} url 请求地址
     * @param {Object} params 请求参数
     */
    get(url, params) {
        const config = {
            method: 'get',
            url: url
        }
        if (params) config.params = params
        return service(config)
    },
    /**
     * post方法
     * @param {string} url 
     * @param {object} params 
     */
    post(url, params) {
        const config = {
            method: 'post',
            url: url
        }
        if (params) config.data = params
        return service(config)
    }
}
export default HttpRequest;