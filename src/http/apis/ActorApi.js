import myaxios from "../MyAxios";

import BASEURL from '@/http/BaseUrl'
const BMDURL = BASEURL.BMDURL

const actorApi = {

  /**
   * 通过电影ID, 查询演员列表
   * @param {Object} params  {movie_id: 1}
   */
  queryByMovieId(params) {
    let url = BMDURL + "/movie-actors/movieid"
    return myaxios.get(url, params)
  },

  /**
   * 通过id, 添加演员
   * @param {Object} params {actorName:xx, actorAvatar:xxx}
   */
  add(params) {
    let url = BMDURL + "/movie-actor/add"
    return myaxios.post(url, params)
  },

  /**
   * 通过id, 删除演员
   * @param {Object} params {id:11}
   */
  delete(params) {
    let url = BMDURL + "/movie-actor/del"
    return myaxios.post(url, params)
  },

  /**
   * 通过姓名关键字查询演员列表
   * @param {Object} params {name:'关键字'}
   * @returns Promise
   */
  queryActorsByName(params) {
    let url = BMDURL + "/movie-actors/name"
    return myaxios.post(url, params)
  },

  /** 查询所有的演员 */
  queryAllActors() {
    let url = BMDURL + "/movie-actors"
    let params = { page: 1, pagesize: 100 }
    return myaxios.get(url, params)
  }

}

export default actorApi;