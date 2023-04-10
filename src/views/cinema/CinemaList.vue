<template>
    <div>
        <div class="map" id="container"></div>
        <el-divider content-position="left">电影院列表</el-divider>

        <!-- 表格 -->
        <el-table :data="cinemas">
            <el-table-column prop="cinema_name" label="影院名称">
            </el-table-column>
            <el-table-column prop="address" label="影院地址">
            </el-table-column>
            <el-table-column label="影院位置" width="240px">
                <template slot-scope="scope">
                    {{ scope.row.province }} &nbsp;
                    {{ scope.row.city }} &nbsp;
                    {{ scope.row.district }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220px">
                <template slot-scope="scope">
                    <el-button @click="map.setZoomAndCenter(15,
                        [scope.row.longitude, scope.row.latitude],
                        false, 300)" size="small" type="success" icon="el-icon-position" circle></el-button>
                    <el-button @click="$router.push(`/home/cinema-room/${scope.row.id}`)" size="small" type="success"
                        icon="el-icon-office-building" circle></el-button>
                    <el-button size="small" type="warning" icon="el-icon-edit" circle></el-button>
                    <el-button @click="del(scope.row.id)" size="small" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
  
<script>
import httpApi from '@/http'
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
    data() {
        return {
            cinemas: [], //存储所有影院
        }
    },

    methods: {

        //删除影院
        del(id){
            console.log('即将删除的影院',id)
        },

        initMap() {
            AMapLoader.load({
                key: "7bfbe3ab215345f405c23b5eed760ca8",             // 申请好的Web端开发者Key
                version: "2.0",      // 指定要加载的 JSAPI 的版本
                plugins: ['AMap.Geocoder'],       // 需要使用的的插件列表
            }).then((AMap) => {
                this.AMap = AMap
                this.map = new AMap.Map("container", {  //设置地图容器id
                    viewMode: "3D",    //是否为3D地图模式
                    zoom: 11,           //初始化地图级别
                    center: [116.502725, 39.916636], //初始化地图中心点位置
                });
                // 加载列表数据
                this.listCinemas()
            })
        },

        /** 加载影院列表 */
        listCinemas() {
            httpApi.cinemaApi.queryAll().then(res => {
                console.log('查询所有电影院', res)
                this.cinemas = res.data.data
                // 为每一个电影院构造一个Marker对象, 添加到地图中
                this.cinemas.forEach(item => {
                    let lngLat = [item.longitude, item.latitude]
                    // 构造Marker对象, 添加到地图中
                    let marker = new this.AMap.Marker({
                        position: lngLat,  // 标记的位置
                        title: item.cinema_name  // 点击标记的提示文本
                    })
                    this.map.add(marker)
                })
            })
        }
    },

    /** 组件挂载完毕后 */
    mounted() {
        this.initMap()

    }
}
</script>
  
<style lang="scss" scoped>
.map {
    height: 260px;
    border: 1px solid #666;
}
</style>