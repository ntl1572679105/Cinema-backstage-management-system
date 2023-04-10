import myaxios from "../MyAxios";

import BASEURL from '@/http/BaseUrl'
const BMDURL = BASEURL.BMDURL

const directorApi = {

  /**
   * 通过id, 删除导演
   * @param {Object} params {directorName:xx, directorAvatar:xxx}
   */
  add(params) {
    let url = BMDURL + "/movie-director/add"
    return myaxios.post(url, params)
  },

  /**
   * 通过id, 删除导演
   * @param {Object} params {id:11}
   */
  delete(params) {
    let url = BMDURL + "/movie-director/del"
    return myaxios.post(url, params)
  },

  /**
   * 通过姓名关键字查询导演列表
   * @param {Object} params {name:'关键字'}
   * @returns Promise
   */
  queryDirectorsByName(params) {
    let url = BMDURL + "/movie-directors/name"
    return myaxios.post(url, params)
  },

  /** 查询所有的导演 */
  queryAllDirectors() {
    let url = BMDURL + "/movie-directors"
    let params = { page: 1, pagesize: 100 }
    return myaxios.get(url, params)
  }

}

export default directorApi;