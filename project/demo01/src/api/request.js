/*
    axios封装
*/ 
import axios from 'axios';
import qs from 'qs';

// 设置服务器基本路径
axios.defaults.baseURL = 'http://127.0.0.1:666';


//设置axios的请求拦截器，（在发送请求前，同意携带token）
axios.interceptors.request.use((config)=> {
    //获取token
    const token = window.localStorage.getItem('token');
    // 设置请求头，携带token
    config.headers.authorization = `Bearer ${token}` 
    return config;
})

export default {
    get (url, params={}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then(response => {
                    // 成功处理
                    resolve(response.data)
                })
                .catch(err => {
                    // 失败处理
                    reject(err)
                })
        })
    },
    post (url, params={}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    // 成功处理
                    resolve(response.data)
                })
                .catch(err => {
                    // 失败处理
                    reject(err)
                })
        })
    }
}