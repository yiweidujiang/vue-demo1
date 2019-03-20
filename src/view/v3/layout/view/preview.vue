<template>
  <div class="preview">
    <div class="layout">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item  v-if="typeId !== 'b'" :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item v-else :to="{ path: '/beike' }">备课</el-breadcrumb-item>
        <el-breadcrumb-item>预览</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="layout-l fl">
        <div class="title">
          当前位置:  <span class="pos"><strong>{{head.subjectName}}</strong> {{head.chapterName}}</span> <span class="con">{{head.title}}</span>
        </div>
        <div class="main1">
          <div v-if="mediaType==='video'">
            <div v-if="format!== 'mp4'" style="width: 100%;height: 500px;position: relative;padding: 0 40px;background-color: #ffffff;text-align: center;" >
              <h1 style="position: absolute;left: 30%;bottom: 5%;font-weight: 500;">当前文件格式不支持在线预览</h1>
              <img src="@/assets/err.jpg" style="width: auto;height: 100%" alt="">
            </div>
            <video v-else :src="url" controls style="width: 100%"></video>
          </div>
          <div  v-else-if="mediaType==='audio'" style="background-color: #ffffff">
            <div v-if="format!== 'mp3'" style="width: 100%;height: 500px;position: relative;padding: 0 40px;background-color: #ffffff;text-align: center;" >
              <h1 style="position: absolute;left: 30%;bottom: 5%;font-weight: 500;">当前文件格式不支持在线预览</h1>
              <img src="@/assets/err.jpg" style="width: auto;height: 100%" alt="">
            </div>
            <audio v-else :src="url" controls  ></audio>
          </div>
          <div  v-else-if="mediaType==='pic'" style="background-color: #ffffff">
            <img :src="url" style="width: 900px" >
          </div>
          <div v-else-if="mediaType==='pdf'" class="box">
          <v-previous :propsSrc="src"></v-previous>
          </div>
          <div class="download">
            <el-button size="mini" type="primary" round><i class="el-icon-download"></i> <a :href="url">下载</a></el-button>
            <el-button v-show="typeId !== 'b'" size="mini" type="success" round @click="setBeike"><i class="el-icon-star-off"></i> 备课</el-button>
          </div>
        </div>
      </div>
      <div class="layout-r fl">
        <div class="index-right">
          <v-recommendSource></v-recommendSource>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import RecommendSource from '../common/recommendSource'
  import {mapGetters} from 'vuex'
  import previewVue from '../common/preview.vue';
  export default {
    name: 'pdf-component',
    components: {
      'v-recommendSource': RecommendSource,
      'v-previous':previewVue
    },
     mounted () {
       this.typeId= this.$route.query.type
      this.$store.dispatch('getPreview', this.$route.params.id).then(res => {
        this.dataAll = res
        this.url = res.url
        this.format = res.format
        this.head.title = res.title
        this.head.subjectName = res.subjectName
        this.head.chapterName = res.chapterName
        this.src = res.convertFile
      }).catch(err => {

      })
    },
    data () {
      return {
        typeId:'',
        page: 1,
        numPages: 0,
        loadProgress:0,
        pdfdata: '',
        errors: [],
        scale: 'page-width',
        show: false,
        format: '',
        url: '',
        dataAll: {},
        src:'',
        head: {
          title: '',
          subjectName: '',
          chapterName: ''
        }
      }
    },
    computed: {
      ...mapGetters(['coverFile', 'userId']),
      mediaType () {
        let arrVideo = ['mp4', 'asf', 'avi', 'dat', 'f4v', 'flv', 'mkv', 'mov', 'mpeg', 'mpg', 'rm', 'rmvb', 'wmv', 'mts', 'ram']
        let arrAudio = ['mp3', 'wav', 'aac', 'm4a', 'wma', 'midi', 'cd']
        let arrPdf = ['doc', 'docx', 'ppt', 'pptx', 'pps', 'txt', 'xlsx', 'xls', 'csv', 'pdf']
        let arrPic = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'swf', 'fla']
        if (arrVideo.indexOf(this.format) >= 0) {
          return 'video'
        } else if (arrAudio.indexOf(this.format) >= 0) {
          return 'audio'
        } else if (arrPdf.indexOf(this.format) >= 0) {
          return 'pdf'
        } else if (arrPic.indexOf(this.format) >= 0) {
          return 'pic'
        } else {
          return 'other'
        }
      }
    },
    watch: {
      page: function (p) {
        if( window.pageYOffset <= this.findPos(document.getElementById(p)) || (document.getElementById(p+1) && window.pageYOffset >= this.findPos(document.getElementById(p+1)) )) {
          // window.scrollTo(0,this.findPos(document.getElementById(p)));
          document.getElementById(p).scrollIntoView()
        }
      }
    },
    methods: {
      // 点击备课按钮
      setBeike () {
        this.dataAll.userId = this.userId
        this.$store.dispatch('cmsSetBeike', this.dataAll).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        })
      },
    }
  }
</script>
<style scoped>

</style>
