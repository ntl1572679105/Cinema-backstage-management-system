import myaxios from "../MyAxios";

import BASEURL from '@/http/BaseUrl'
const BMDURL = BASEURL.BMDURL

const movieApi={

    //修改电影信息
    update(params){
        let url=BMDURL+'/movie-info/update'
        return myaxios.post(url,params)
    },

    //通过id，查询电影详情
    queryById(params) {
        let url = BMDURL + "/movie-info/query"
        return myaxios.get(url, params)
    },

    //新增电影
    add(params){
        let url=BMDURL+'/movie-info/add'
        return myaxios.post(url,params)
    },

    /**
     * 查询所有电影类型
     * 
     */
    queryTypes(){
        return myaxios.get(BMDURL+'/movie-types')
    },

    /**
     * 通过页码、每页条目数据 分页查询电影
     * @params {Object} params {page:1,pagesize:3}
     */
    queryAll(params){
        let url=BMDURL+'/movie-infos'
        return myaxios.get(url,params)
    },

    /**
     * 模糊查询电影列表
     * @params {Object} params {name,page,pagesize}
     */
    queryAllByName(params) {
        let url = BMDURL + '/movie-infos/name'
        return myaxios.post(url, params)
    },

    /**
    * 通过id, 删除演员
    * @param {Object} params {id:11}
    */
    delete(params) {
        let url = BMDURL + "/movie-info/del"
        return myaxios.post(url, params)
    },





}

export default movieApi;