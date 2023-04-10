<template>
    <div>
        <!-- <b>百慕大影城(五棵松店)</b> &nbsp; &nbsp; -->
        <el-button @click="dialogFormVisible = true" type="primary">
            新增放映厅
        </el-button>

        <el-divider content-position="left">放映厅列表</el-divider>

        <!-- 表格 -->
        <el-table :data="rooms">
            <el-table-column label="放映厅名称" prop="room_name"></el-table-column>
            <el-table-column label="放映厅类型" prop="room_type"></el-table-column>
            <el-table-column label="放映厅座位数" width="200px">
                <template slot-scope="scope">
                    <span v-if="scope.row.room_size">{{ scope.row.room_size }} 个座位</span>
                    <span v-else>[暂未配置座位模板]</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="$router.push(`/home/plan-list/${scope.row.id}`)"
                        size="small" type="primary" icon="el-icon-view" circle></el-button>
                    <el-button
                        @click="$router.push(`/home/plan-add/${scope.row.id}`)"    
                        size="small" type="success" icon="el-icon-plus" circle></el-button>
                    <el-button 
                        @click="$router.push(`/home/seat-template/${scope.row.id}`)"
                        size="small" type="warning" icon="el-icon-menu" circle></el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增放映厅" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 90%;">
                <el-form-item label="放映厅名称" prop="room_name">
                    <el-input v-model="form.room_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="放映厅类型" prop="room_type">
                    <el-select style="width:100%" v-model="form.room_type" placeholder="请选择放映厅类型">
                        <el-option v-for="item in roomTypes" :key="item.id" :label="item.type_name"
                            :value="item.type_name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import httpApi from '@/http'
export default {
    data() {
        return {
            rooms: [], // 保存所有放映厅
            roomTypes: [],  // 保存所有的放映厅类型
            dialogFormVisible: false,  // 控制表单Dialog是否显示
            form: {
                movie_cinema_id: this.$route.params.id, // 影院ID
                room_name: '',  // 放映厅名称
                room_type: ''   // 放映厅类型
            },
            rules: {
                movie_cinema_id: [
                    { required: true, message: '必填项', trigger: 'blur' },
                ],
                room_name: [
                    { required: true, message: '必填项', trigger: 'blur' },
                ],
                room_type: [
                    { required: true, message: '必填项', trigger: 'blur' },
                ]
            }
        }
    },

    methods: {

        submit() { // 提交表单
            console.log(this.form)
            this.$refs.form.validate(valid => {
                if (valid) { // 验证通过   执行新增放映厅
                    httpApi.cinemaRoomApi.add(this.form).then(res => {
                        console.log('新增放映厅', res)
                        if (res.data.code == 200) {
                            this.$message({
                                message: '恭喜你, 新增放映厅成功',
                                type: 'success'
                            })
                            this.dialogFormVisible = false  // 隐藏弹窗
                            // 刷新列表
                            this.listRooms()
                        }
                    })
                }
            })
        },

        /** 加载所有的放映厅列表 */
        listRooms() {
            let params = { cinema_id: this.form.movie_cinema_id }
            httpApi.cinemaRoomApi.list(params).then(res => {
                console.log('加载所有放映厅', res)
                this.rooms = res.data.data
            })
        },

        initRoomTypes() {  // 初始化放映厅类型列表
            httpApi.cinemaRoomApi.queryAllTypes().then(res => {
                console.log('加载类型列表', res)
                this.roomTypes = res.data.data
            })
        }
    },

    /** 挂载完毕后执行 */
    mounted() {
        this.initRoomTypes()  // 初始化放映厅类型列
        this.listRooms()  // 列出所有放映厅表
    }
}
</script>
  
<style lang="scss" scoped></style>