<template>
    <div>
    

        <!-- 新增电影表单 -->
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" style="width: 700px">
            <el-form-item label="封面图片" prop="cover">
                <el-upload class="avatar-uploader" :action="`${UPLOADURL}/upload`" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.cover" :src="form.cover" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="电影类别" prop="categoryId">
                <el-radio-group v-model="form.categoryId">
                    <el-radio label="1">热映</el-radio>
                    <el-radio label="2">待映</el-radio>
                    <el-radio label="3">经典</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电影名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入电影名称"></el-input>
            </el-form-item>
            <el-form-item label="电影类型" prop="type">
                <el-select v-model="form.type" multiple style="width: 100%" placeholder="请选择">
                    <el-option v-for="item in types" :key="item.id" :label="item.typename"
                        :value="item.typename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电影主演" prop="starActor">
                <el-select v-model="form.starActor" multiple filterable remote reserve-keyword :remote-method="remoteMethod"
                    :loading="loading" style="width: 100%" placeholder="请输入关键词">
                    <el-option v-for="item in actors" :key="item.id" :label="item.actor_name"
                        :value="item.actor_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上映时间" prop="showingon">
                <el-date-picker v-model="form.showingon" type="date" style="width: 100%" value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="电影评分" prop="score">
                <el-input v-model="form.score" placeholder="(10分为满分)"></el-input>
            </el-form-item>
            <el-form-item label="电影时长" prop="duration">
                <el-input v-model="form.duration" placeholder="请输入分钟数"></el-input>
            </el-form-item>
            <el-form-item label="电影简介" prop="description">
                <div style="border: 1px solid #ccc;">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                        :mode="mode" />
                    <Editor style="height: 220px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig"
                        :mode="mode" @onCreated="onCreated" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">立即创建</el-button>
                <el-button @click="$refs.form.resetFields()">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
  
<script>
import httpApi from '@/http'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: {},
            editorConfig: {
                placeholder: '请输入内容...',
                MENU_CONF: {
                    uploadImage: {
                        fieldName: 'file',   // 上传参数所使用的的字段名
                        server: this.UPLOADURL + '/upload',  // 上传目标路径
                        customInsert(res, insertFn) {
                            // 当上传成功后, 自动调用, 传入响应对象 res
                            let url = res.data  // 上传成功的图片 的访问地址
                            insertFn(url) // 自动把上传成功的图片, 显示在编辑器中
                        }
                    }
                }
            },
            mode: 'simple',


            loading: false,  // 用于描述演员列表的远程访问是否正在加载中
            actors: [],  // 存放所有的演员
            types: [], // 存放所有的电影类型 {id, typename}
            form: {
                cover: '', // 封面图片路径 
                categoryId: '1',
                title: '',
                type: '',
                starActor: '',
                showingon: '',
                score: '',
                description: '',
                duration: ''
            },
            rules: {
                cover: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                categoryId: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                title: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                starActor: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                showingon: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                score: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                duration: [
                    { required: true, message: '必填', trigger: 'blur' },
                ]
            }
        }
    },

    methods: {
        /** 当组件创建时, 初始化富文本编辑器 */
        onCreated(editor) {
            // 配置上传文件相关参数
            this.editor = Object.seal(editor)
        },

        /** 提交表单 */
        submit() {
            // 处理某些字段, 使之可以提交给服务器
            this.form.type = this.form.type.join('／')
            this.form.starActor = this.form.starActor.join('／')
            this.form.description = this.editor.getHtml()
            console.log(this.form)
            // 表单验证
            this.$refs.form.validate(valid => {
                if (valid) {
                    httpApi.movieApi.add(this.form).then(res => {
                        console.log('新增电影', res)
                        // 跳转到列表页面
                        this.$router.push('/home/movie-list')
                    })
                }
            })
        },

        /** 当select输入内容变化时, 执行该方法, 传入内容文本 */
        remoteMethod(keyword) {
            this.loading = true
            // 通过演员名称关键字, 搜索演员列表, 渲染到option中
            let params = { name: keyword }
            httpApi.actorApi.queryActorsByName(params).then(res => {
                this.loading = false
                console.log('模糊查询到的演员列表', res)
                this.actors = res.data.data
            })
        },

        /** 上传成功后执行 */
        handleAvatarSuccess(res, file) {
            console.log(res)
            this.form.cover = res.data
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
        },

        /** 初始化加载所有电影类型列表 */
        initMovieTypes() {
            httpApi.movieApi.queryTypes().then(res => {
                console.log('加载电影类型列表', res)
                this.types = res.data.data
            })
        }
    },

    /** 挂载完毕后执行 */
    mounted() {
        // 初始化所有电影类型
        this.initMovieTypes()
    }
}
</script>
  
<style lang="scss" scoped></style>
  
<style src="@wangeditor/editor/dist/css/style.css"></style>
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