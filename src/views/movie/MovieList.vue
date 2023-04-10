<template>
    <div>
    
        <!-- 搜索表单 -->
        <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item label="电影名称">
                <el-input v-model="name" @keyup.native.enter="search" placeholder="电影名称关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-divider content-position="left">电影列表</el-divider>

        <div v-if="movieData.result && movieData.result.length != 0">
            <el-table :data="movieData.result">
                <el-table-column label="封面" width="100px" align="center">
                    <template slot-scope="scope">
                        <img width="60px" :src="scope.row.cover" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="star_actor" label="主演"></el-table-column>
                <el-table-column prop="showingon" width="140px" label="上映时间"></el-table-column>
                <el-table-column label="时长" width="120px">
                    <template slot-scope="scope">
                        {{ scope.row.duration }} 分钟
                    </template>
                </el-table-column>
                <el-table-column prop="type" width="200px" label="所属类别"></el-table-column>
                <el-table-column label="操作" width="220px">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" icon="el-icon-user" circle></el-button>
                        <el-button size="small" type="info" icon="el-icon-picture" circle></el-button>
                        <el-button @click="$router.push(`/home/movie-update/${scope.row.id}`)"  size="small" type="warning" icon="el-icon-edit" circle></el-button>
                        <el-button @click="del(scope.row.id)" size="small" type="danger" icon="el-icon-delete"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 20px;" background layout="->, total, prev, pager, next, jumper"
                :total="movieData.total" :page-size="movieData.pagesize" :current-page="movieData.page"
                @current-change="changeCurrentPage($event)">
            </el-pagination>
        </div>
        <el-empty v-else description="暂无数据"></el-empty>

    </div>
</template>
  
<script>
import httpApi from '@/http'

export default {
    data() {
        return {
            movieData: {   // 保存电影列表查询结果
                page: 1,     // 当前页
                pagesize: 3, // 每页条目数
                total: 0,    // 总条目数
                result: []   // 电影查询结果   
            },
            name: '',  // 关键字 
            keyword: ''
        }
    },

    methods: {

        /** 删除电影 */
        del(id) {
            console.log('即将删除的电影ID:', id)
            this.$confirm('将永久删除该电影, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送http请求, 执行删除业务
                httpApi.movieApi.delete({ id }).then(res => {
                    console.log('删除业务结果', res)
                    if(this.movieData.result.length==1&&this.movieData.page>1){
                        // 更新列表  带着关键字 向当前页再发一次请求即可
                        this.changeCurrentPage(this.movieData.page-1)
                    }else{
                        this.changeCurrentPage(this.movieData.page)
                    }
                })
            })
        },

        /**根据关键字, 按照页码模糊查询电影列表 */
        listMoviesByName(page) {
            let params = { name: this.keyword, page, pagesize: 3 }
            httpApi.movieApi.queryAllByName(params).then(res => {
                console.log('模糊查询结果', res)
                this.movieData = res.data.data
            })
        },

        /** 点击查询按钮 / 敲回车 时执行 */
        search() {
            this.keyword = this.name
            if (this.keyword.trim()) { // 有关键字
                this.listMoviesByName(1)
            } else {  // 没有关键字, 则查询所有
                this.listMovies(1)
            }
        },

        /** 分页器当前页码改变时执行 */
        changeCurrentPage(page) {
            console.log(page)
            if (this.keyword.trim()) { // 有关键字  模糊查询分页
                this.listMoviesByName(page)
            } else {// 没有关键字 加载显示相应页码的数据
                this.listMovies(page)
            }
        },

        /** 加载电影列表   page参数为页码 */
        listMovies(page) {
            httpApi.movieApi.queryAll({ page, pagesize: 3 }).then(res => {
                console.log('电影列表数据', res)
                // 将res.data.data对象存入 this.movieData
                this.movieData = res.data.data
            })
        }
    },

    /** 页面挂载完毕后执行 */
    mounted() {
        this.listMovies(1)
    },
}
</script>
  
<style lang="scss" scoped></style>