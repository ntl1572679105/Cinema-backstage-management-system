<template>
  <div>


    <!-- 搜索表单 -->
    <el-form 
      @submit.native.prevent
      :inline="true" class="demo-form-inline">
      <el-form-item label="演员姓名">
        <el-input @keyup.native.enter="search" v-model="name" placeholder="演员姓名关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">演员列表</el-divider>

    <person 
      v-for="item in actors" :key="item.id"
      :name="item.actor_name" 
      :avatar="item.actor_avatar"
      @delete="deletePerson(item.id, $event)"></person>

  </div>
</template>

<script>
  import Person from '@/components/Person.vue'
  import myaxios from '@/http/MyAxios'
  import httpApi from '@/http/index'
  
  export default {
    components: { Person },
    data() {
      return {
        name: "",   // 绑定姓名关键字
        actors: [], // 绑定演员列表
      }
    },
    methods: {
      
      /** 监听到Person点了叉子后, 执行该方法 */
      deletePerson(id, params){
        console.log('监听到了删除演员操作..', params)
        this.$confirm('该演员将永久除名, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送删除演员的请求: 
          let url = "http://localhost:3010/movie-actor/del"
          let params = {id}
          myaxios.post(url, params).then(res=>{
            console.log('删除结果', res)
            this.search()
          })          
        })
      },

      /** 根据演员姓名关键字模糊查询列表 */
      listActorsByName(){
        let params = { name: this.name.trim() }
        httpApi.actorApi.queryActorsByName(params).then(res=>{
          this.actors = res.data.data
        })
      },

      /** 搜索演员列表 */
      search(){
        if(this.name.trim()==''){  // 查询所有
          this.listActors()
        }else{ // 模糊查询
          this.listActorsByName()
        }
      }, 

      /** 加载演员列表 */
      listActors() {
        httpApi.actorApi.queryAllActors().then(res=>{
          this.actors = res.data.data
        })
      }
    },
    mounted(){
      this.listActors()  // 加载演员列表
    }
  }
</script>

<style lang="scss" scoped>

</style>