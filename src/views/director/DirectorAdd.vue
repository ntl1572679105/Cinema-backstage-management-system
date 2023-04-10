<template>
  <div>

    <!-- 表单 -->
    <el-form 
      style="width: 500px" 
      ref="form"
      :rules="rules"
      :model="form" label-width="100px">
      <el-form-item label="导演姓名" prop="directorName">
        <el-input v-model="form.directorName"/>
      </el-form-item>
      <el-form-item label="导演头像" prop="directorAvatar">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9000/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.directorAvatar" :src="form.directorAvatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import myaxios from '@/http/MyAxios'

  export default {
    data() {
      return {
        form: {
          directorName: '', 
          directorAvatar: ''
        },
        rules: {
          directorName: [
            {required:true, message:'该字段必填', trigger: 'blur'}
          ], 
          directorAvatar: [
            {required:true, message:'该字段必填', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {

      /** 提交表单 */
      submit(){
        this.$refs.form.validate(valid=>{
          if(valid){
            console.log('验证通过')
            // 发送请求, 执行新增业务
            let url = "http://localhost:3010/movie-director/add"
            myaxios.post(url, this.form).then(res=>{
              console.log('新增导演结果', res)
              if(res.data.code==200){
                this.$message({
                  message: '导演新增成功',
                  type: 'success'
                })
                // 重置表单
                this.$refs.form.resetFields()
              }else{
                this.$message.error('新增失败, 请稍后重试')
              }
            })
          }else{
            console.log('验证失败')
          }
        })
      },
      
      /** 上传成功后执行 */
      handleAvatarSuccess(res, file) {
        console.log(res)
        this.form.directorAvatar = res.data
      },

      /** 上传文件的格式 / 大小验证 */
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    display: block;
  }
</style>
