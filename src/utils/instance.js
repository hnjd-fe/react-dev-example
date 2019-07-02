import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://www.easy-mock.com/mock/5c68fed5160b1240c2965b0e'
      : false, //设置默认api路径
  timeout: 5000, //设置超时时间
  headers: { 'X-Custom-Header': 'foobar' }
})

export default instance
