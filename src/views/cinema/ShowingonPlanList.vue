<template>
    <div>
        <p>
            <b style="color:#409eff; ">{{ roomInfo.cinema_name }}</b>
            的
            <b style="color:#409eff;">
                {{ roomInfo.cinema_room_name }} ({{ roomInfo.cinema_room_type }})
            </b>
            的排片计划列表
        </p>
        <el-divider></el-divider>

        <el-table :data="plans">
            <el-table-column prop="title" label="电影名称"></el-table-column>
            <el-table-column prop="showingon_date" label="放映时间"></el-table-column>
            <el-table-column prop="showingon_time" label="场次"></el-table-column>
            <el-table-column prop="price" label="票价"></el-table-column>
            <el-table-column label="是否已发布">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <el-button size="small" type="danger" icon="el-icon-delete" circle></el-button>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import httpApi from '@/http'
export default {
    data() {
        return {
            plans: [], // 保存所有的计划
            roomInfo: {},  // 用于保存放映厅数据 
        }
    },

    methods: {
        changeStatus (id, status){
        console.log(`改变了id=${id} 的排片计划的状态:`+status)
        }
    },

    /** 页面挂载完毕后 */
    mounted() {
        let roomId = this.$route.params.roomId
        // 通过放映厅id, 查询排片计划列表
        let params = { room_id: roomId }
        httpApi.showingonPlanApi.queryByRoomId(params).then(res => {
            console.log('查询排片计划列表', res)
            this.plans = res.data.data
        })

        // 查询放映厅详情
        httpApi.cinemaRoomApi.queryById({ id: roomId }).then(res => {
            console.log('通过id查询放映厅', res)
            // 将查到的放映厅的信息存入this.roomInfo
            this.roomInfo = res.data.data

            // 为了面包屑导航可以点击 放映厅列表 
            // 点击后, 跳转到: /home/cinema-room/影院id
            let id = this.roomInfo.cinema_id
            this.$route.meta.crumb[2] = '放映厅列表:/home/cinema-room/' + id
        })
    }
}
</script>
  
<style lang="scss" scoped></style>