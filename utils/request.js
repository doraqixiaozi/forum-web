import axios from 'axios'
// 创建axios实例
import {getToken, getId, getNickName} from '@/utils/auth'

const zuulUrl = 'http://127.0.0.1:9013';


const service = axios.create({
  baseURL: zuulUrl, // api的base_url
  timeout: 30000// 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  let token = getToken();
  let id = getId();
  let nickName = getNickName();
  if (token != null && token != '') {
    config.headers['Authorization'] = 'Bearer ' + token; // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // config.params = {'id': id, 'nickName': nickName};
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
export default service
