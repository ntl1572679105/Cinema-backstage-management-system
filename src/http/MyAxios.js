import axios from 'axios'
import qs from 'qs'
const instance = axios.create()

const myaxios = {
  /**
   * 发送get请求
   * @param {string} url  请求资源路径
   * @param {object} params  请求参数对象
   */
  get(url, params) {
    return instance({
      url,
      method: 'GET',
      params,
    })
  },

  /**
   * 发送post请求
   * @param {string} url 
   * @param {object} params 
   */
  post(url, params) {
    return instance({
      url,
      method: 'POST',
      data: qs.stringify(params)
    })
  }
}

export default myaxios;

