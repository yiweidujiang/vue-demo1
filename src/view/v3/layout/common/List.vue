<template>
  <div class="source-list">
    <div style="height: 50px;background-color: #ffffff;position:relative;margin-bottom: 10px;">
      <el-button type="primary" @click="dialogVisible = true" style="margin-top: 5px;float: right;margin-right: 20px;">上传我的资源</el-button>
    </div>
    <div class="fl" style="width: 100%">
      <div v-if="list.length > 0" class="ul-list" style="width: 100%;">
        <ul class="ul">
          <li v-for=" (item , index) in list" :key="index">
            <div class="content">
              <router-link :to="{path:'/preview/'+item._id,query:{type:'b'}}" tag="div" style="cursor: pointer;" :class="['icon',item.format]">
              </router-link>
              <div class="item-con">
                <h2 style="cursor: pointer;"><router-link :to="{path:'/preview/'+item._id,query:{type:'b'}}" tag="span" >{{item.title}}</router-link></h2>
                <el-rate :value="Number(item.shareLevel)"  disabled></el-rate>
                <p>附详细解答过程帮助学生更好的理解</p>
              </div>
              <div class="operator" style="position:absolute; right: 0;top:50%;margin-top: -28px;">
                <el-button type="danger" size="small" @click="deleteList(item)">取消</el-button>
              </div>
              <div class="item-bottom clearfix">
                <div class="fl">
                  <span>大小: {{parseFloat(Number(item.size)/1024).toFixed(2)}}M</span>
                  <span>上传时间: {{item.createTime |timeReset }}</span>
                </div>
                <div class="fr item-b-l">
                  <span><router-link :to="{path:'/preview/'+item._id,query:{type:'b'}}" >在线预览</router-link></span>
                  <span><a :href="item.url">下载</a></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            class="pagebox"
            background
            @current-change="handleCurrentChange"
            @current-page="currentPage"
            :page-size="10"
            prev-text="上一页"
            next-text="下一页"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div v-else class="ul-list" style="background-color: #ffffff;text-align: center;padding:60px 0;width: 920px">
        <img src="@/assets/download.png" alt="">
      </div>
      <div class="recommend"></div>
      <div class="upload">
        <el-dialog
          title="上传我的资源"
          :visible.sync="dialogVisible"
          :beforeClose="handleClose"
          width="30%">
          <el-form label-width="100px" ref="uploadForm" :model="formResult" :rules="rules">
            <el-form-item label="课本信息">
              <el-input v-model="bookName" disabled></el-input>
            </el-form-item>
            <el-form-item label="资源关联附件">
              <el-switch
                v-model="formResult.value2"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="资源标题" prop="title">
              <el-input v-model="formResult.title" :disabled="formResult.value2" placeholder="请输入资源标题"></el-input>
            </el-form-item>
            <el-form-item label="资源描述" prop="describe">
              <el-input v-model="formResult.describe" type="textarea" resize="none" placeholder="请输入资源描述"></el-input>
            </el-form-item>
            <el-form-item label="资源类别" prop="typeId">
                <el-select placeholder="选择资源类型" v-model="formResult.typeId">
                  <el-option v-for="(item, index) in  typeList" :key="index"
                             :label="item.typeName"
                             :value="item._id"
                  ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传文件" prop="file">
              <el-input style="display: none"  type="hidden" v-model="formResult.file"></el-input>
              <el-upload
                ref="upload"
                :limit="1"
                list-type="picture"
                class="upload-demo"
                action="http://192.168.18.115:3003/v1/file/upload"
                :data="{folderName: userId+'/'+ new Date().toLocaleDateString()}"
                :on-success="handleSuccess"
                :on-error="handleError"
                :file-list="fileList"
                :auto-upload="true">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传1个</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button @click="canCle">取 消</el-button>
              <el-button type="primary" @click="submitUpload('uploadForm')">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "List",
  data () {
    return {
      list: [],
      typeList: [],
      total: 0,
      page: 1,
      dialogVisible: false,
      fileList: [],
      fileInfo: {},
      limit: 10,
      show: true,
      formResult: {
        title: '',
        describe: '',
        file: '',
        type: '',
        value2: false,
        typeId: ''

      },
      rules: {
        title: [
          {required: true, message: '资源标题不能为空', trigger: 'change'}
        ],
        describe: [
          {required: false, message: '资源描述不能为空', trigger: 'change'},
          {max: 100, message: '最多100个字符', trigger: 'change'}
        ],
        file: [
          {required: true, message: '文件不能为空', trigger: 'change'}
        ],
        typeId: [
          {required: true, message: '资源类型不能为空', trigger: 'change'}
        ],
      }
    }
  },
  mounted () {
    this.getSourceList();
    this.getList()
  },
  filters: {
    timeReset (val) {
      let date = new Date(Number(val))
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  computed: {
    ...mapGetters(['topModelId', 'bookId', 'chapterId', 'bookName', 'typeId', 'userId'])
  },
  methods: {
    // 删除 备课资源
    deleteList(val){
      this.$store.dispatch('cmsDeleteBeike',{userId: this.userId,resourceId: val._id}).then(res => {
        if(res.code=== 1){
          this.$message({
            type:'success',
            message: res.data
          })
          this.getSourceList()
        }else{
          this.$message({
            type:'error',
            message: res.data
          })
        }
      }).catch(err => {
        this.$message.error(err.data)
      })
    },
    // 资源关联
    getList () {
      this.$store.dispatch('getSelectBarA', {topModelId: this.topModelId}).then(res => {
        this.typeList = res.resources.data

      })
    },
    // 上传文件成功
    handleSuccess (response, file, fileList) {
      this.fileInfo = response.resources[0]
      if (this.formResult.value2){
        this.formResult.title = response.resources[0].originalName;
      }
      this.formResult.file = response.resources[0].suffix;
    },
    // 确定
    submitUpload (formName) {
      let result = {
        'url': this.fileInfo.url,
        'size': this.fileInfo.size,
        'originalName': this.fileInfo.originalName,
        'suffix': this.fileInfo.suffix,
        'topModelId': this.topModelId,
        'title': this.formResult.title,
        'langchao_userId': String(this.$store.state.modeA.userId),
        'convertFile': this.fileInfo.convertFile,
        'thumbnail': this.fileInfo.thumbnail,
        'format': this.fileInfo.suffix,
        'typeId': this.formResult.typeId,
        'chapterId': this.chapterIdB,
        'bookId': this.bookIdB,
        'describe': this.formResult.describe,
      }
      let data = {
        cmsTeachingResFileInfo: {
          bookId: this.bookIdB,
          bookName: this.bookName,
          resourceid: '',
          typeId: this.formResult.typeId,
          userId: this.$store.state.modeA.userId,
          source: 2,
          status: 1
        },
        cmsTeachingResList: {
          bookId: this.bookIdB,
          chapterId: this.chapterIdB,
          topModelId: this.topModelId,
          userId: this.userId,
          status: 1
        }
      }
      this.$refs[formName].validate((res) => {
        if (res) {
          // success
          this.$store.dispatch('uploadCenter', result).then(res => {
            data.cmsTeachingResFileInfo.resourceid = res.resources._id
            data.cmsTeachingResFileInfo.typeId = res.resources.typeId
            var  $this = this
            this.$store.dispatch('cmsUploadFile', data).then(res => {
              this.getSourceList(0, '');
              $this.clearFile();
              this.$alert('上传成功', {
                confirmButtonText: '确定',
                callback: action => {

                  this.show = false
                  this.dialogVisible = false
                  $this.resetForm('uploadForm')
                  $this.clearFile();
                }
              })
            })
          }).catch(err => {
            this.$message.error('添加资源失败')
          })
        } else {
          // err
          this.$message.error('添加资源失败')
        }
      })
    },
    // 取消
    canCle () {
      this.dialogVisible = false
      this.show = false
      this.resetForm('uploadForm')
      this.clearFile()
    },
    // 关闭
    handleClose (done) {
      done()
      this.show = false
      this.resetForm('uploadForm')
      this.clearFile()
    },
    handleError (err, file, fileList) {
      this.$message.error('上传失败')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clearFile () {
      this.$refs.upload.clearFiles();
    },
    getSourceList (page, typeId) {
      this.$store.dispatch('cmsBeikeSource', { topModelId: this.topModelId, bookId: this.bookId, chapterId: this.chapterId, page: page }).then(res => {
        if (!res.data.rows) {
          this.list = []
        } else {
          this.list = res.data.rows.resources
        }
      })
    },
    currentPage (val) {
      this.page = val
      this.getSourceList(val, this.typeId)
    },
    handleCurrentChange (val) {
      this.page = val
      this.getSourceList(val, this.typeId)
    }
  },
  watch: {
    chapterId: function () {
      this.getSourceList()
    },
    $route: function (to, from) {
      this.$store.commit('SET_COVERFILE_URL', to.params.id)
    }
  }
}

</script>

<style scoped>

</style>
