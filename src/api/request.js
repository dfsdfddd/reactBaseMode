import axios from 'axios'
import {
  Toast,Notify 
} from 'vant';

const instance = axios.create({
  withCredentials:true,
  // crossdomain: true,
  baseURL: process.env.VUE_APP_APIROOT,
  timeout: 50000, // 请求超时时间
  headers:{
    'Content-Type':'application/json',
  }
})

// ajax请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// ajax结果返回拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.message = '请求错误'; break
      case 401: error.message = '未授权，请登录'; break
      case 403: error.message = '拒绝访问'; break
      case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
      case 408: error.message = '请求超时'; break
      case 500: error.message = '服务器内部错误'; break
      case 501: error.message = '服务未实现'; break
      case 502: error.message = '网关错误'; break
      case 503: error.message = '服务不可用'; break
      case 504: error.message = '网关超时'; break
      case 505: error.message = 'HTTP版本不受支持'; break
      default: break
    }
  }
  errorLog(error)
  return Promise.reject(error)
})

// 记录和显示错误
function errorLog (error) {
  // 打印到控制台 todo
  // if (process.env.NODE_ENV === 'development') {
  //   util.log.danger('>>>>>> Error >>>>>>')
  //   console.log(error)
  // }
  // 显示提示
  Notify({
    type: 'danger',
    message: error.message,
  })
}
export default instance
