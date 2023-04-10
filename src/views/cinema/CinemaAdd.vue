<template>
    <div>
        <!-- 准备一个表单, 收集用户输入的数据 -->
        <el-form style="width: 700px" ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="电影院名称" prop="cinema_name">
                <el-input v-model="form.cinema_name"></el-input>
            </el-form-item>
            <el-form-item label="选择位置">
                <div id="container" style="height: 200px; border: 1px solid #666"></div>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="省份" prop="province">
                <el-input v-model="form.province"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="city">
                <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="district">
                <el-input v-model="form.district"></el-input>
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
                <el-input v-model="form.longitude"></el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="form.latitude"></el-input>
            </el-form-item>
            <el-form-item label="选择标签" prop="tags">
                <el-select multiple v-model="form.tags" placeholder="请选择" style="width: 100%">
                    <el-option v-for="item in tags" :key="item.id" :label="item.tagname" :value="item.tagname"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import httpApi from "@/http";

export default {
    data() {
        return {
            tags: [], // 存储所有的影院标签
            form: {
                cinema_name: "",
                address: "",
                province: "",
                city: "",
                district: "",
                longitude: "",
                latitude: "",
                tags: "",
            },
            rules: {
                cinema_name: [{ required: true, message: "必填", trigger: "blur" }],
                address: [{ required: true, message: "必填", trigger: "blur" }],
                province: [{ required: true, message: "必填", trigger: "blur" }],
                city: [{ required: true, message: "必填", trigger: "blur" }],
                district: [{ required: true, message: "必填", trigger: "blur" }],
                longitude: [{ required: true, message: "必填", trigger: "blur" }],
                latitude: [{ required: true, message: "必填", trigger: "blur" }],
                tags: [{ required: true, message: "必填", trigger: "blur" }],
            },
        };
    },

    methods: {
        /** 提交表单 */
        submit() {
            this.form.tags = this.form.tags.join(",");
            console.log(this.form);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 验证通过
                    httpApi.cinemaApi.add(this.form).then((res) => {
                        console.log("添加影院", res);
                        if (res.data.code == 200) {
                            this.$router.push("/home/cinema-list");
                        }
                    });
                }
            });
        },

        /** 初始化地图 */
        initMap() {
            AMapLoader.load({
                key: "7bfbe3ab215345f405c23b5eed760ca8", // 申请好的Web端开发者Key
                version: "2.0", // 指定要加载的 JSAPI 的版本
                plugins: ["AMap.Geocoder"], // 需要使用的的插件列表
            }).then((AMap) => {
                this.map = new AMap.Map("container", {
                    //设置地图容器id
                    viewMode: "3D", //是否为3D地图模式
                    zoom: 11, //初始化地图级别
                    center: [112.22239458906915, 30.33831477932294], //初始化地图中心点位置
                });

                // 为地图对象绑定点击事件
                this.map.on("click", (ev) => {
                    console.log(ev.lnglat);
                    let lng = ev.lnglat.KL; // 经度
                    let lat = ev.lnglat.kT; // 纬度
                    // 通过经纬度  访问高德地图开放服务:逆地理编码
                    let geocoder = new AMap.Geocoder();
                    geocoder.getAddress([lng, lat], (status, result) => {
                        console.log(status, result);
                        // 完成表单的回填操作
                        let geo = result.regeocode;
                        this.form.address = geo.formattedAddress;
                        this.form.province = geo.addressComponent.province;
                        this.form.city = geo.addressComponent.city;
                        this.form.district = geo.addressComponent.district;
                        this.form.longitude = lng;
                        this.form.latitude = lat;
                    });
                });
            });
        },
    },

    mounted() {
        this.initMap(); // 初始化地图
        // 加载所有影院标签
        httpApi.cinemaApi.queryTags().then((res) => {
            console.log("加载所有影院标签", res);
            this.tags = res.data.data;
        });
    },
};
</script>
  
<style lang="scss" scoped></style>