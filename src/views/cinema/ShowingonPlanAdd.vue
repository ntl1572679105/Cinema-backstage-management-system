<template>
    <div>
        <p>
            为
            <b style="color: #409eff">{{ roomInfo.cinema_name }}</b>
            的
            <b style="color: #409eff">
                {{ roomInfo.cinema_room_name }} ({{ roomInfo.cinema_room_type }})
            </b>
            添加排片计划
        </p>
        <el-divider></el-divider>

        <!-- 准备一个表单 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 700px">
            <el-form-item label="选择电影" prop="movie_id">
                <el-select ref="el-select" filterable remote reserve-keyword :remote-method="remoteMethod"
                    :loading="loading" placeholder="请选择电影" style="width: 100%" v-model="form.movie_id">
                    <el-option v-for="item in movies" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="放映日期" prop="showingon_date">
                <el-col :span="11">
                    <el-date-picker v-model="form.showingon_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                        style="width: 100%">
                    </el-date-picker>
                </el-col>
                <el-col style="text-align: center" class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-select v-model="form.showingon_time" placeholder="选择时间" style="width: 100%" :picker-options="{
                        start: '06:00',
                        end: '23:59',
                        step: '00:15',
                    }"></el-time-select>
                </el-col>
            </el-form-item>
            <el-form-item label="票价" prop="price">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="立即发布" prop="status">
                <el-switch active-value="1" inactive-value="0" v-model="form.status"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" type="primary">立即新增该计划</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
import httpApi from "@/http";
export default {
    data() {
        return {
            movies: [], // 存放所有电影数据
            loading: false,
            roomInfo: {}, // 用于保存放映厅数据
            form: {
                cinema_id: "",
                cinema_room_id: "",
                movie_id: "",
                showingon_date: "",
                showingon_time: "",
                status: "1",
                price: "",
            },
            rules: {
                movie_id: [{ required: true, message: "必填", trigger: "blur" }],
                showingon_date: [
                    { required: true, message: "必填", trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            if (this.form.showingon_time == "") {
                                callback(new Error("未选择场次时间"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                status: [{ required: true, message: "必填", trigger: "blur" }],
                price: [{ required: true, message: "必填", trigger: "blur" }],
            },
        };
    },

    methods: {
        submit() {
            console.log(this.form);
            console.log(this.$refs.selector);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    httpApi.showingonPlanApi.add(this.form).then((res) => {
                        console.log("新增计划", res);
                        if (res.data.code == 200) {
                            // TODO 右侧弹出通知, 通知添加成功的计划详情
                            this.$notify({
                                title: "排片计划保存成功",
                                type: "success",
                                dangerouslyUseHTMLString: true,
                                message: `
                                <p><b>电影名称:</b>《${this.$refs["el-select"].selectedLabel}》</p>
                                <p><b>电影院:</b> 
                                    ${this.roomInfo.cinema_name}  
                                </p>
                                <p><b>放映厅:</b>  
                                    ${this.roomInfo.cinema_room_name}
                                </p>
                                <p><b>场次:</b>
                                    ${this.form.showingon_date}  
                                    ${this.form.showingon_time} 场
                                </p>
                    `,
                            });
                            // 重置表单
                            this.$refs.form.resetFields();
                            this.form.showingon_time = "";
                        }
                    });
                }
            });
        },

        /** 通过该方法实现远程搜索 */
        remoteMethod(keyword) {
            let params = { name: keyword, page: 1, pagesize: 20 };
            this.loading = true;
            httpApi.movieApi.queryAllByName(params).then((res) => {
                console.log("模糊查询结果", res);
                this.loading = false;
                this.movies = res.data.data.result;
            });
        },
    },

    /** 页面挂载完毕后 */
    mounted() {
        let roomId = this.$route.params.roomId;
        httpApi.cinemaRoomApi.queryById({ id: roomId }).then((res) => {
            console.log("通过id查询放映厅", res);
            // 将查到的放映厅的信息存入this.roomInfo
            this.roomInfo = res.data.data;

            // 将放映厅的 cinema_id, cinema_room_id 属性存入表单
            this.form.cinema_id = this.roomInfo.cinema_id;
            this.form.cinema_room_id = roomId;

            // 为了面包屑导航可以点击 放映厅列表
            // 点击后, 跳转到: /home/cinema-room/影院id
            let id = this.roomInfo.cinema_id;
            this.$route.meta.crumb[2] = "放映厅列表:/home/cinema-room/" + id;
        });
    },
};
</script>
  
<style lang="scss" scoped></style>