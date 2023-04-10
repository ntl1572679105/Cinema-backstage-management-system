import myaxios from "../MyAxios";

import BASEURL from '@/http/BaseUrl'
const BMDURL = BASEURL.BMDURL

const cinemaApi = {

    /** 查询所有影院信息 */
    queryAll() {
        let url = BMDURL + "/cinemas"
        return myaxios.get(url)
    },

    /** 查询所有的影院标签 */
    queryTags() {
        let url = BMDURL + "/cinema/tags"
        return myaxios.get(url)
    },

    /**
     * 添加电影院
     * @param {Object} params 
     */
    add(params) {
        let url = BMDURL + "/cinema/add"
        return myaxios.post(url, params)
    }

}

export default cinemaApi;