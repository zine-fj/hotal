import axios from 'axios'
import { Toast } from 'vant';

import home from '@/api/homeAPI.js'
import order from '@/api/orderAPI.js'
import product from '@/api/productAPI.js'

// service 循环遍历输出不同的请求方法
const instance = axios.create({
  // baseURL: process.env.VUE_APP_URL,
  baseURL: '',
  timeout: 1000 * 5
})

const Http = {} // 包裹请求方法的容器

const allService = { ...home, ...order, ...product}
// 请求格式/参数统一
for (const key in allService) {
  const api = allService[key] // url, method
  // async 作用：避免陷入回调地狱
  Http[key] = async function (
    params, // 请求参数 get、delete: url; post、put、patch: data;
    isFormData = false, // 标识是否是 form-data请求
    config = {} // 配置参数
  ) {
    let newParams = {}
    // content-type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (const i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }

    // 不同请求的判断
    const methodsOne = ['put', 'post', 'patch']
    let response = {}
    if (methodsOne.includes(api.method)) {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else {
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }

    return response
  }
}

// 拦截器的添加
instance.interceptors.request.use(config => {
  // 在发送请求前做些什么
  // Toast.loading
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '加载中...',
  });
  return config
}, err => {
  // 在请求错误的时候做些什么（请求没到后端返回的错误）
  Toast.clear()
  Toast('请求错误，请稍后重试')
  Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功对响应数据做处理
  Toast.clear()
  return res // 和后台统一此处res.data...
}, err => {
  // 响应错误做些什么（请求达到后端后返回的错误）
  Toast('请求错误，请稍后重试')
  Promise.reject(err)
  Promise.reject(err)
})

export default Http