<template>
  <div>


    <!-- 搜索表单 -->
    <el-form 
      @submit.native.prevent
      :inline="true" class="demo-form-inline">
      <el-form-item label="导演姓名">
        <el-input @keyup.native.enter="search" v-model="name" placeholder="导演姓名关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">导演列表</el-divider>

    <person 
      v-for="item in directors" :key="item.id"
      :name="item.director_name" 
      :avatar="item.director_avatar"
      @delete="deletePerson(item.id)"></person>

  </div>
</template>

<script>
  import Person from '@/components/Person.vue'
  import myaxios from '@/http/MyAxios'

  export default {
    components: { Person },
    data() {
      return {
        name: "",   // 绑定姓名关键字
        directors: [], // 绑定导演列表
      }
    },
    methods: {

      /** 监听到Person点了叉子后, 执行该方法 */
      deletePerson(id){
        console.log('监听到了删除导演操作..')
        this.$confirm('该导演将永久除名, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送删除导演的请求: 
          let url = "http://localhost:3010/movie-director/del"
          let params = {id}
          myaxios.post(url, params).then(res=>{
            console.log('删除结果', res)
            this.search()
          })          
        })
      },

      /** 根据导演姓名关键字模糊查询列表 */
      listDirectorsByName(){
        let url = "http://localhost:3010/movie-directors/name"
        let params = {name: this.name.trim()}
        myaxios.post(url, params).then(res=>{
          console.log('模糊查询的结果', res)
          this.directors = res.data.data
        })
      },

      /** 搜索导演列表 */
      search(){
        if(this.name.trim()==''){  // 查询所有
          this.listDirectors()
        }else{ // 模糊查询
          this.listDirectorsByName()
        }
      }, 

      /** 加载导演列表 */
      listDirectors() {
        let url = 'http://localhost:3010/movie-directors'
        let params = {page:1, pagesize:100}
        myaxios.get(url, params).then(res=>{
          console.log('加载导演列表', res)
          this.directors = res.data.data
        })
      }
    },
    mounted(){
      this.listDirectors()  // 加载导演列表
    }
  }
</script>

<style lang="scss" scoped>

</style>